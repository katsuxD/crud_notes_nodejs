const express = require("express");
const router = express.Router();
const note = require("../models/note");

router.get("/list", async function (req, res) {
  var notes = await note.find();
  res.json(notes);
});

router.get("/list/:userid", async function (req, res) {
  var notes = await note.find({ userid: req.params.userid });
  res.json(notes);
});

router.post("/add", async function (req, res) {
  const newNote = new note({
    id: req.body.id,
    userid: req.body.userid,
    tittle: req.body.tittle,
    content: req.body.content,
  });
  await newNote.save();
  const response = {
    message: `new note created with id : ${req.body.id}!`,
  };
  res.json(response);
});

router.put("/update", async function (req, res) {
  var updateNote = await note.findOneAndUpdate(
    { id: req.body.id },
    { title: req.body.title, content: req.body.content },
    { new: true }
  );
  const response = {
    message: `note has been updated with id : ${req.body.id}!`,
    note: updateNote,
  };
  res.json(response);
});

router.delete("/delete", async function (req, res) {
  var deleteNote = await note.deleteOne({ id: req.body.id });
  const response = {
    message: `note has been deleted with id : ${req.body.id}!`,
    note: deleteNote,
  };
  res.json(response);
});

module.exports = router;
