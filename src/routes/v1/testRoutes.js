/**********************************
 * Desc: Define routes for test module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import express from "express";

// import controller
import verifyToken from "../../middleware/verifyToken.js";
import testController from "../../controllers/v1/testController.js";

const router = express.Router();

router.get("/test", verifyToken, testController.hello);

export default router;
