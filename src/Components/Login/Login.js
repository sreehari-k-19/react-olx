import './Login.css';
import Logo from '../../olx-logo.png';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from "../../Store/Context";
import {useNavigate} from 'react-router-dom'
function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {

  }, [])
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      navigate('/')
    }).catch((err) => {
      alert(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <br />
          <br />
          <button>Login</button>
        </form>
        <div className="d-flex">
        <span onClick={() => navigate('/signup')} className="m-auto">Signup</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
