import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// dot env config
dotenv.config();

// rest object
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// route
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hello World</h1>");
});

// port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(`Server is running on port: ${colors.bgRed(PORT)}`);
});
