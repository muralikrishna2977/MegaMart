import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

import { API_URL } from "../App.jsx";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSigningIn(true); 

    try {
      const response = await axios.post(`${API_URL}/signin`, { email, password });
      
      if (response.data.message === "Login successful") {
        const userData = {
          user_id: response.data.userid,
          name: response.data.name,
          email: response.data.email,
          token: response.data.token,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        navigate("/", { state: { user: userData } });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred");
      setTimeout(()=>{
        setError("");
      }, 5000);
    } finally{
      setIsSigningIn(false);
    }
  }

  return (
    <div className="signin">
      <h2>Sign In</h2>
      <form className="signinform" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="emailid"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={isSigningIn}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={isSigningIn}
        />
        <button className="signInSubmit" type="submit">
          {isSigningIn ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="signnuppage">
        <p>Don't have an account?</p>
        <button className="signUpInSignIn" onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <div className="signnuppage" style={{gap: '30px'}}>
        <p>Continue as a guest?</p>
        <button className="signUpInSignIn" onClick={() => navigate("/")}>Continue</button>
      </div>
      <div className="signinmessage">
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

    </div>
  );
}

export default SignIn;
