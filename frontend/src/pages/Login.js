import './login.css'
import {auth, provider} from '../firebase-config';
import { useNavigate } from "react-router-dom";
import {useEffect, useState } from 'react'
import {signInWithPopup } from 'firebase/auth';

const Login = ({ isAuth, setIsAuth }) => {

  let navigate = useNavigate();

  // If user is already logged in, redirect to Home
  useEffect(() => {
    if (isAuth) {
      navigate("/profile");
    } 
  }, []);

  // Sign in with Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/profile");
    });
  };

  return (
    <div id="loginPage">
      <div className="content">
        <h1>Social Scan</h1>
        <button id="loginButton" onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  )
}

export default Login;