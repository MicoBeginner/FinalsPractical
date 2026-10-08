const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number
});

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/students", async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      course: req.body.course,
      age: req.body.age
    });

    const savedStudent = await student.save();

    res.json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;