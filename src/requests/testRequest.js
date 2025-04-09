/**********************************
 * Desc: Define validation schema for test module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import Joi from "joi";
import { knex } from "propmodel_api_core";

const purchaseScheme = Joi.object({
  stage: Joi.string()
    .valid("trial", "single", "double", "instant")
    .required()
    .messages({
      "string.base": "Evalution stage should be a type of text",
      "string.empty": "Evalution stage cannot be empty",
      "string.min": "Evalution stage should have a minimum length of {#limit}",
      "any.required": "Evalution stage is required",
      "any.only":
        "Evalution stage must be either trial or single or double or instant",
    }),
  acc_type: Joi.string().valid("standard", "aggressive").required().messages({
    "string.base": "Type must be a string",
    "string.empty": "Type cannot be empty",
    "any.only": "Type must be either standard or aggressive",
    "any.required": "Type is required",
  }),
  account_balance: Joi.number()
    .positive()
    .precision(2)
    .required()
    .external(async (value, helpers) => {
      const result = await knex
        .select("uuid")
        .from("programs")
        .whereRaw(`prices ->> ? IS NOT NULL`, [String(value)])
        .first();
      if (!result) {
        throw new Error("Please select proper account balance.");
      }
      return value;
    })
    .messages({
      "number.base": "Account balance must be a number",
      "number.positive": "Account balance must be a positive number",
      "number.precision": "Account balance must have at most 2 decimal places",
      "any.required": "Account balance is required",
    }),
  payment_method: Joi.string()
    .valid(
      "STRIPE",
      "TODO",
      "PAYPAL",
      "COINBASE",
      "AWARD",
      "PAYTIKO",
      "CONFIRMO",
      "KORAPAY",
      "TAZAPAY",
      "ECOMPAY",
      "FREE_TRAIL"
    )
    .required()
    .messages({
      "string.base": "Payment method must be a string",
      "string.empty": "Payment method cannot be empty",
      "any.only":
        "Payment method must be either STRIPE or TODO or PAYPAL or COINBASE or AWARD or PAYTIKO or CONFIRMO or KORAPAY or TAZAPAY or ECOMPAY or FREE_TRAIL",
      "any.required": "Payment method is required",
    }),
  user_data: Joi.object({
    first_name: Joi.string().required().messages({
      "string.empty": "First name cannot be empty",
      "any.required": "First name is required",
    }),
    last_name: Joi.string().required().messages({
      "string.empty": "Last name cannot be empty",
      "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    phone: Joi.string().required().messages({
      "string.empty": "Phone number cannot be empty",
      "any.required": "Phone number is required",
    }),
    address: Joi.string().required().messages({
      "string.empty": "Address cannot be empty",
      "any.required": "Address is required",
    }),
    city: Joi.string().required().messages({
      "string.empty": "City cannot be empty",
      "any.required": "City is required",
    }),
    zip_code: Joi.string().required().messages({
      "string.empty": "ZIP code cannot be empty",
      "any.required": "ZIP code is required",
    }),
    state: Joi.string().required().messages({
      "string.empty": "State cannot be empty",
      "any.required": "State is required",
    }),
    country: Joi.string().length(2).required().messages({
      "string.empty": "Country code cannot be empty",
      "string.length": "Country code must be 2 characters long",
      "any.required": "Country code is required",
    }),
  })
    .required()
    .messages({
      "object.base": "User data must be an object",
      "any.required": "User data is required",
      "object.with": "User data must contain a single key-value pair",
    }),
  discount_code: Joi.string()
    .allow("")
    .optional()
    .external(async (value, helpers) => {
      if (!value) return value;

      const result = await knex
        .select("status", "current_usages_count", "max_usages_count")
        .from("discount_codes")
        .where("code", value)
        .first();

      // Check if the discount code exists and is active
      if (!result) {
        throw new Error("Invalid discount code");
      }
      //  Check if the discount code is active
      if (!result.status) {
        throw new Error("This discount code is no longer active");
      }
      // Check if the discount code has reached its maximum usage limit
      if (result.current_usages_count >= result.max_usages_count) {
        throw new Error(
          "This discount code has reached its maximum usage limit"
        );
      }
      return value;
    })
    .messages({
      "string.base": "Discount code must be a string",
    }),
});

export default purchaseScheme;
