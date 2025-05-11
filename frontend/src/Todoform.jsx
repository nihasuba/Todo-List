import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

const Todoform = () => {
    const [task,setTask] = useState([]);
    //const userId = localStorage.getItem('userId')
    const user = JSON.parse(localStorage.getItem('user')); // Ensure _id is a string like '681992c3e8dd37d4b89a736d'

    
    //console.log(userId);
    console.log("userId being sent:", user.id); 

    const handleAdd = async(e) => {
      e.preventDefault()
      const newTodo = {
        userId: user.id, 
        task: task,
      };
      console.log("Sending data:", newTodo);
      try {
        const response =  await axios.post('http://localhost:5000/add',newTodo);
        console.log(response)
        console.log(response.data)
        if(response.status==201){
          location.reload();
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }

    const handleLogout = () =>{
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
  return (
    <div className="container">
      {/* Header */}
      <div className="d-flex justify-content-end align-items-end mb-4 pb-2">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      <div className='d-flex mb-4 justify-content-center align-items-center '>
        <h2 className=''>Todo List</h2>
      </div>

      {/* Task Form */}
      <div className="create_form d-flex justify-content-center">
        <input
          type="text"
          className="form-control me-2"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
        />
        <button className="btn btn-primary" type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  )
}

export default Todoform

