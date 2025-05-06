import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

const Todoform = () => {
    const [task,setTask] = useState([]);
    const userId = localStorage.getItem('userId')
    const user = JSON.parse(localStorage.getItem('user')); // Ensure _id is a string like '681992c3e8dd37d4b89a736d'

    
    console.log(userId);
    console.log("userId being sent:", user.id); 

    const handleAdd = async(e) => {
      e.preventDefault()
      const newTodo = {
        userId: user.id, // Make sure user._id is correct and not wrapped in extra quotes
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

  return (
    <div className='create_form'>
        <input type ="text"onChange={(e) =>setTask(e.target.value)} placeholder="Enter your task"/>
        <button type='button' onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Todoform

