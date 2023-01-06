import "./Signup.css";
import Logo from "../../olx-logo.png";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../Store/Context";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, phone, password, firebase);
    let result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(result);
    await result.user.updateProfile({ displayName: username });
    await firebase.firestore().collection("users").add({
      id: result.user.uid,
      username: username,
      phone: phone,
    });
    navigate("/login");
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <button>Signup</button>
        </form>
        <div className="d-flex">
        <span onClick={() => navigate('/login')} className="m-auto">Login</span>
        </div>
      </div>
    </div>
  );
}
