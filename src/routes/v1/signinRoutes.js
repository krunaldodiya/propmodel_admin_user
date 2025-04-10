/**********************************
 * Desc: Define routes for signin module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import express from "express";

// import controller
import signinController from "../../controllers/v1/signinController.js";
import { requestHandler } from "../../middleware/requestHandler.js";
import signinSchema from "../../requests/signinRequest.js";

const router = express.Router();

router.post(
  "/admin/signin",
  requestHandler(signinSchema),
  signinController.signin
);

export default router;
