import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import logger from "./configs/logger.config.js";
import { mongo } from "mongoose";

//dotEnv config
dotenv.config();

//env variables
const PORT = process.env.PORT || 5000;

mongoose.connection.on("error", (error) => {
  logger.error(`${error.message}`);
  process.exit(1);
});

//mongodb connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  logger.info("MongoDB connected");
});

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}

let server;
try {
  server = app.listen(PORT, () => {
    logger.info(`server is running in port ${PORT}`);
    console.log("process id:", process.pid);
  });
} catch (error) {
  logger.error(`${error.message}`);
}

//handle server errors

const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Closing server");
    server.exit(1);
  }
});
