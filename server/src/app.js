import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

//create express app
const app = express();

//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//helmet (security)
app.use(helmet());

//parse json request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sanitize request data
app.use(mongoSanitize());

//enable cookies parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(fileUpload({ useTempFiles: true }));

//cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

//route does not exist
app.use((req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

//error handling
app.use(async (err, req, res, next) => {
  if (err instanceof createHttpError.HttpError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
});

app.get("/test", (req, res) => {
  res.json({ message: "test route is working" });
});

//api v1 routes
app.use("/api/v1", routes);

export default app;
