const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const note = require("./models/note");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://khanh:khanh@cluster0.bxtypfa.mongodb.net/")
  .then(function () {
    app.get("/", function (req, res) {
      res.json({ message: "API is working!" });
    });

    const noteRouter = require("./routes/routes");
    app.use("/notes", noteRouter);
  });

const PORT = process.env.PORT || 3000;

app.listen("3000", () => {
  console.log(`Server is running at Port: ${PORT}`);
});
