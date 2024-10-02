import app from "./app.js";
import dotenv from "dotenv";

//dotEnv config
dotenv.config();

//env variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running in port ", PORT);
});
