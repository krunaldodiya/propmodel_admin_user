
import purchaseScheme from "../requests/purchaseStoreRequest.js";
import accountCredentialSchema from "../requests/accountCredentialRequest.js";
import payoutSchema from "../requests/payoutRequest.js";

/**
 * Generic request validation handler
 * @param {Object} schema - Joi schema to validate against
 * @param {string} property - Request property to validate (body, query, params)
 */
const requestHandler = (schema, property = "body") => {
    return async (req, res, next) => {
      try {
        req[property] = await schema.validateAsync(req[property], {
          abortEarly: false,
          stripUnknown: true,
        });
        next();
      } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
         }); 
      }
    };
};

export  { 
    requestHandler,
    purchaseScheme,
    accountCredentialSchema,
    payoutSchema
};