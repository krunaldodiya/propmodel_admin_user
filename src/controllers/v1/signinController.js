/**********************************
 * Desc: Handle signin-related requests.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import controllerWrapper from "../../middleware/controllerHandler.js";
import signinService from "../../services/signinService.js";

const signin = controllerWrapper(async (req, res) => {
  try {
    const requestParams = req.body;
    const result = await signinService.signin(requestParams);
    return res.success("signin_successful", result, 200);
  } catch (error) {
    // If error has status and code, use them directly
    if (error.status && error.code) {
      return res.error(error.code, [], error.status);
    }
    // Default error for unexpected cases
    return res.error("signin_failed", [], 500);
  }
});

export default {
  signin,
};
