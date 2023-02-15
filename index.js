// import all the necessary packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// we are using port 8000
const port = 8000;

// we will create these todoRoutes in the future
const todoRoutes = require("./routes/Todo");
// const userRoutes = require("./routes/Auth");

const app = express();

// DB connection   .connect("mongodb://127.0.0.1:27017/todoapp", {

mongoose
  .connect("mongodb://mongo:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  });

// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON format
app.use(bodyParser.json());

// include the todoRoutes
app.use("/api", todoRoutes);
// app.use("/api", userRoutes);
app.get("/", (req,res)=>{res.send("Hello world")});
// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
// docker run -it -p 9001:8000 -v $(pwd):/app docker-node
