import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [message, setMessage] = useState();
    const navigate = useNavigate();
      const [input, setInput] = useState({
          fname:'',
          email:'',
          address:'',
          password:''
      });


      const handleAdd = async(e) => {
              e.preventDefault()
              console.log("Sending Data:", input)
              try {
                const response = await axios.post("http://localhost:5000/register", input);
                console.log(response);
                console.log("Response:", response.data);
                if(response.status == 201){
                  setMessage("Registered Successfully !");
                  setTimeout(() =>{
                    navigate('/login')
                  }, 2000)
      
                }
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
            }
      
           }


  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h2 className="text-center text-primary fw-bold mb-4">Register</h2>
        <p className="text-center  p-2 text-success mb-4">{message}</p>
        <form onSubmit={handleAdd}>
          <div className="mb-3">
            <input type="text" className="form-control" name="fname" placeholder="Full Name" onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" name="email" placeholder="Email" onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="address" placeholder="Address" onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center text-muted mt-3">
          Already have an account? <a href="/login" className="text-primary">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
