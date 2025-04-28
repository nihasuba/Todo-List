import React, { useState } from 'react'
import axios from 'axios'

const Todoform = () => {
    const [task,setTask] = useState([]);
    const handleAdd = async(e) => {
      e.preventDefault()
      try {
        const response =  await axios.post('http://localhost:5000/add',{task:task});
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

