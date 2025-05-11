import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
   

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log(email);
      console.log(password);
      
      try {
          const response = await axios.post("http://localhost:5000/login",  {email, password} );
          console.log(response);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          //localStorage.setItem("userId", JSON.stringify(response.data.user.id));
        console.log(response.data.token);

        console.log(response.data.user);
        console.log(response.data.user.id);
        const userId = response.data.user.id;
          alert("Login successful!");
          navigate(`/home/${userId}`); // Redirect to dashboard or home
      } catch (error) {
          setError(error.response?.data?.message || "Login failed");
      }
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: "350px" }}>
        <h2 className="text-center text-primary fw-bold mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input type="email" className="form-control" name='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3 text-end">
            <a href="/otp" className="text-decoration-none text-primary small">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center text-muted mt-3">
          Don't have an account? <a href="/register" className="text-primary">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
