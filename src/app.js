import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

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

app.get("/test", (req, res) => {
  res.json({ message: "test route is working" });
});

export default app;
