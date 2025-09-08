import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

import { API_URL } from "../App.jsx";

function SignUp() { 
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSigningUp(true); 

    if (password !== confirmPassword) {
      setTimeout(()=>{
        setError("Passwords do not match");
        setIsSigningUp(false);
      },[2000]);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, { name, email, password });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred"); 
      setMessage("");
    } finally{
      setIsSigningUp(false);
    }
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form className="signupform" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
          disabled={isSigningUp}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
          disabled={isSigningUp}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          disabled={isSigningUp}
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required
          disabled={isSigningUp}
        />
        <button type="submit">
          {isSigningUp ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <div className="signinpage">
        <p>Already have an account?</p>
        <button onClick={() => navigate("/signin")}>Sign In</button>
      </div>
      
      <div className="signupmessage">
          {message && (
            <div style={{ color: 'green', marginTop: '40px' }}>
              Signup successful! Please SignIn to access your account.
            </div>
          )}
          {error && <p className="errorsignup">{error}</p>}
      </div>
    </div>
  );
}

export default SignUp;
