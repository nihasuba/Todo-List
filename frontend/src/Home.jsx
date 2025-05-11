import React, { useEffect, useState } from 'react'
import Todoform from './Todoform'
import axios from 'axios';
import './App.css'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

const Home = () => {
    const [todo,setTodo] = useState([]);

    const token = localStorage.getItem('token')
    //const userId = localStorage.getItem('userId')
    //console.log(userId)
    const user = JSON.parse(localStorage.getItem('user')); 
    const fetch = async() =>{
        try {
            const response = await axios.get(`http://localhost:5000/list/${user.id}`);
            console.log(response);
            console.log(response.data);
            if(response.status==201){
                //location.reload()
                setTodo(response.data);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
         fetch();
     }, [user.id])

    const handleEdit = async(id) => {
        try {
            const response = await  axios.put(`http://localhost:5000/update/${id}`);
            if(response.status==201){
                location.reload()
            }
        } catch (error) {
            console.log(error.message)
        }
       
        
    }
    
    const handleDelete = async(id) => {
        try {
            const response = await  axios.delete(`http://localhost:5000/delete/${id}`)
            if(response.status==201){
                location.reload()
            }
        } catch (error) {
            console.log(error.message)
        }
        axios.delete(`http://localhost:5000/delete/${id}`)
        
    }
    console.log(todo._id)

  return (
    <div className='home'>
        
        <Todoform />
        {
            todo.length === 0 ?
            <div><h3>No Record</h3></div>
            :
            todo.map(todos =>(
                
                <div className='todo_output' key={todos._id}>
                    <div className='checkbox' onClick={() => handleEdit(todos._id)} >
                        {todos.done ?
                            <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill> :
                            <BsCircleFill className='icon'/>}
                       
                        <p className={todos.done ? "line-through" : ""}>{todos.task}</p>
                    </div>
                    <div className='checkbox' onClick={() => handleDelete(todos._id)} >
                        <BsFillTrashFill className="icon" />
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Home