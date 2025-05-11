import axios from 'axios';
import React, { useState } from 'react'

const OTP = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, serErr] = useState("")


    const handleOtp = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/sendotp",{email})
            setMsg("OTP sent Your mail Address");
            setStep(2);
        } catch (error) {
            setMsg(err.response?.data?.message || "Failed to send OTP");
        }

    }


    const handleVerify = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/verifyotp",{email,otp})
            if (response.data.success) {
                setMsg("OTP Verified. Now you can reset your password.");
                setStep(3);
            } else {
                setMsg("Invalid OTP");
            }
        } catch (error) {
            setMsg(err.response?.data?.message || "OTP Verification failed");
        }

    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setMsg("Passwords do not match");
          return;
        }
      
        try {
          const response = await axios.post("http://localhost:5000/resetpassword", {
            email,
            password,
          });
          if (response.data.success) {
            setMsg("Password reset successful. You can now log in.");
            window.location.href='/login';
          } else {
            setMsg("Password reset failed");
          }
        } catch (error) {
          setMsg(error.response?.data?.message || "Error resetting password");
        }
      };
      

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
        <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="mb-3 text-center text-primary fw-bold">Forgot Password</h4>
        {msg && <div className="alert alert-info">{msg}</div>}

        {step === 1 && (
            <form onSubmit={handleOtp}>
                <div className="mb-3">
                    <input type='email'
                    className='form-control'
                    placeholder='Enter  your email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                     />
                </div>
                <button type="submit" className="btn btn-primary w-100">Send OTP</button>
            </form>
        )}
        {step === 2 && (
            <form onSubmit={handleVerify}>
                <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Verify</button>
            </form>
        ) }
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">Reset Password</button>
          </form>
        )}
        </div>

    </div>
  )
}

export default OTP