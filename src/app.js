import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import errorHandling from "./middleware/errorHandler.js";
import responseHandler from "./middleware/response.js";
import { validateEnv } from "propmodel_api_core";
import requiredEnvVars from "./config/envVariable.js";

import testRoutes from "./routes/v1/testRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Validate environment variables
validateEnv(requiredEnvVars);

// Create Express app instance
const app = express();

// Use Helmet middleware to enhance security by setting various HTTP headers
// This helps protect the app from well-known web vulnerabilities
app.use(helmet());
app.use(cors());

// Body Parser Middleware
// Parse incoming request bodies in JSON format and URL-encoded data
// This allows us to access request body data via req.body in our routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach response helper methods directly to the response object
// This middleware adds custom response formatting methods like success(), error(), etc.
app.use(responseHandler);

// Load all routes in routes/v1
app.use("/api/v1", testRoutes);

// Error handling middleware
// This middleware catches any errors thrown in the application
// and sends a formatted error response to the client
app.use(errorHandling);

export default app;
