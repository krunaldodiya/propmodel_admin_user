/**********************************
 * Desc: Handle signin-related requests.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import controllerWrapper from "../../middleware/controllerHandler.js";
import signinService from "../../services/signinService.js";

const signin = controllerWrapper(async (req, res) => {
  const requestParams = req.body;
  const result = await signinService.signin(requestParams);

  if (!result) {
    return res.success("record_not_found", [], 404);
  }

  return res.success("signin_successful", result, 200);
});

export default {
  signin,
};
