/**********************************
 * Desc: Provide services for signin module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import bcrypt from "bcryptjs";
import { knex, createToken } from "propmodel_api_core";
import { encryptUUID } from "../utils/encryption.js";

// Error types
const ERRORS = {
  USER_NOT_FOUND: {
    message: "user_not_found",
    status: 404,
    code: "user_not_found",
  },
  INVALID_PASSWORD: {
    message: "invalid_password",
    status: 401,
    code: "invalid_password",
  },
  USER_NOT_ACTIVATED: {
    message: "user_not_activated",
    status: 403,
    code: "user_not_activated",
  },
  TOKEN_GENERATION_FAILED: {
    message: "token_generation_failed",
    status: 500,
    code: "token_generation_failed",
  },
};

/**
 * Authenticates user login credentials and generates JWT token
 * @param {Object} params - Request data containing login credentials
 *                         {email: string, password: string}
 * @returns {Promise<Object>} Authentication result containing:
 *                          {uuid: string, email: string, token: string, referral_link: string}
 * @throws {Object} Error object with message, status, and code
 */
const signin = async (params = {}) => {
  const { email, password } = params;

  const user = await knex("users").where({ email }).first();

  if (!user) {
    throw ERRORS.USER_NOT_FOUND;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw ERRORS.INVALID_PASSWORD;
  }

  // Check if user is activated
  if (user.status === 0) {
    throw ERRORS.USER_NOT_ACTIVATED;
  }

  // Create a token for the user
  const reqParams = { uuid: user.uuid, email: user.email };
  const jwtToken = createToken(reqParams);

  if (!jwtToken.success) {
    throw {
      ...ERRORS.TOKEN_GENERATION_FAILED,
      message: "token_generation_failed",
    };
  }

  // Generate referral link
  const encUUID = encryptUUID(user.uuid);
  const referral_link = "http://" + encUUID;

  return {
    uuid: user.uuid,
    email: user.email,
    token: jwtToken.token,
    referral_link: referral_link,
  };
};

export default {
  signin,
};
