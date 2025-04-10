/**********************************
 * Desc: Provide services for signin module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import bcrypt from "bcryptjs";
import { knex, createToken } from "propmodel_api_core";
import { encryptUUID } from "../utils/encryption.js";

/**
 * Authenticates user login credentials and generates JWT token
 * @param {Object} params - Request data containing login credentials
 *                         {email: string, password: string}
 * @returns {Promise<Object>} Authentication result containing:
 *                          {uuid: string, email: string, token: string, referral_link: string} if successful
 *                          {is_email: false} if email not found
 *                          {is_password: false} if password invalid
 *                          {is_activated: false} if user not activated
 * @throws {Error} If login process fails
 */
const signin = async (params = {}) => {
  try {
    const { email, password } = params;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      return { is_email: false };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { is_password: false };
    }

    // Check if user is activated
    if (user.status === 0) {
      return { is_activated: false };
    }

    // Create a token for the user
    const reqParams = { uuid: user.uuid, email: user.email };
    const jwtToken = createToken(reqParams);

    if (jwtToken.success) {
      // Generate referral link
      const encUUID = encryptUUID(user.uuid);
      const referral_link = "http://" + encUUID;

      return {
        uuid: user.uuid,
        email: user.email,
        token: jwtToken.token,
        referral_link: referral_link,
      };
    } else {
      throw new Error(jwtToken.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Signin failed");
  }
};

export default {
  signin,
};
