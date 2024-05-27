const express = require("express");
const dbConnection = require("./dbConnect/dbConnection");
const app = express();
const routes = require("./routes/routes.js");

// router konfiguration
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Project is running");
});

// port konfiguration
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
  dbConnection();
});
