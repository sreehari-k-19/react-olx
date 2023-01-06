import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { AuthContext, FirebaseContext } from "./Store/Context";
import Post from "./Store/PostContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
  });
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route element={<Home />} path="/"></Route>
            <Route element={<View />} path="/view"></Route>
            <Route element={<Signup />} path="/signup"></Route>
            <Route element={<Login />} path="/login"></Route>
            <Route element={<Create />} path="/create"></Route>
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
