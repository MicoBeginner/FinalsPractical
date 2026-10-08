import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });
  }, []);

  const addStudent = async () => {
    await axios.post("http://localhost:5000/students", {
      name,
      course,
      age
    });

    const response = await axios.get("http://localhost:5000/students");
    setStudents(response.data);
  };

  

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const updateStudent = async () => {
    await axios.put(`http://localhost:5000/students/${editingId}`, {
      name,
      course,
      age
    });

    const response = await axios.get("http://localhost:5000/students");
    setStudents(response.data);
    setEditingId(null);
    setName("");
    setCourse("");
    setAge("");
  };
  return (
    <div>
      <h1>Student Management System</h1>
      <h2>Students</h2>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <input
        type="text"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={editingId ? updateStudent : addStudent}>
        {editingId ? "Update Student" : "Add Student"}
      </button>
      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => editStudent(student)}>EDIT</button>
        </div>
      ))}
    </div>
  );
}
export default App;