const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const farmerRouter = require("./route/farmers");
const userRouter = require("./route/user");

const PORT = 3000 || process.env.PORT;

// For testing purposes
app.get("/", (req, res) => {
  res.send("Welcome to our API page.");
});

app.use("/api/farmers", farmerRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
