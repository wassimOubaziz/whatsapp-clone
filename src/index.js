import app from "./app.js";
import dotenv from "dotenv";
import logger from "./configs/logger.config.js";

//dotEnv config
dotenv.config();

//env variables
const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    logger.info(`server is running in port ${PORT}`);
  });
} catch (error) {
  logger.error(`${error.message}`);
}
