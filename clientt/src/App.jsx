import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {

    axios.get(`${API_URL}/students`)
      .then((response) => {
        setStudents(response.data);
      });

    }, []);
    const addStudent = async () => {
      await axios.post(`${API_URL}/students`,{
        name: name,
        course: course,
        age: age,
      });
  
    const response = await axios.get(`${API_URL}/students`);
    setStudents(response.data);
    setName("");
    setCourse("");
    setAge("");
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/students/${id}`);
    const response = await axios.get(
      `${API_URL}/students`
    );
    setStudents(response.data);
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const updateStudent = async () => {
    await axios.put(
      `${API_URL}/students/${editingId}`,
      {
        name: name,
        course: course,
        age: age,
      }
    );

    const response = await axios.get(
      `${API_URL}/students`
    );
    setStudents(response.data);
    setEditingId(null);
    setName("");
    setCourse("");
    setAge("");
  };
  return (
    <div>

      <h1>Student Management System</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(event) =>
          setCourse(event.target.value)
        }

      />
      <input
        placeholder="Age"
        value={age}
        onChange={(event) =>
          setAge(event.target.value)
        }
      />

      {editingId === null ? (
        <button onClick={addStudent}>
          Add Student
        </button>
      ) : (
        <button onClick={updateStudent}>
          Update Student </button>
      )}
      <h2>Students</h2>
      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => editStudent(student)}>
            Edit
          </button>
          <button onClick={() => deleteStudent(student._id)}>Delete
          </button>
        </div>
      ))}
    </div>
  );
}
export default App;