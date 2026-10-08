import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from "axios";

const API_URL = "/api/students";

function App() {
  const [students, setStudents] =useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(()=>{
    axios.get(API_URL)
    .then((response)=>{
      setStudents(response.data);
    });
  },[]);

  const deleteStudent = async (id) =>{
  await axios.delete(`${API_URL}/${id}`);

  const response = await axios.get(API_URL);
   setStudents(response.data);
  };

  const addStudent = async ()=> {
    await axios.post(API_URL,{
        name:name,
        course: course,
        age: age
        
      }
    );
    const response = await axios.get(API_URL);
    setStudents(response.data);
    setName("");
    setCourse("");
    setAge("");
  };

      const editStudent = (student) =>{
        setEditingId(student._id);
        setName(student.name);
        setCourse(student.course);
        setAge(student.age);
      };

  const updateStudent= async () =>{
    await axios.put(`${API_URL}/${editingId}`,{
      name,
      course,
      age,
    });

    const response = await axios.get(API_URL);
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
      <input type="text" placeholder='name' value = {name} onChange= {(e) =>setName (e.target.value)}/>

      <input type="text" placeholder= 'course'value ={course} onChange = {(e) =>setCourse (e.target.value)}/>

      <input type="text" placeholder='age' value = {age} onChange ={(e)=>setAge (e.target.value)} />

<button onClick={editingId ? updateStudent : addStudent}>
  {editingId ? "Update Student" : "Add Student"}
</button>

      
      
      {students.map((student)=>(
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course:{student.course}</p>
          <p>Age:{student.age}</p>
          
          <button onClick={()=> editStudent(student)}>EDIT</button>
          <button onClick={()=> deleteStudent(student._id)}>Delete </button>
          </div>

          
      )
    )}

      </div>
  
      
  );
}

export default App