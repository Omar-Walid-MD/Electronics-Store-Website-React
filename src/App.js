import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function App() {

  const [userList,setUserList] = useState(null);

  const [currentUser,setCurrentUser] = useState(null);

  useEffect(()=>{
    fetch('http://localhost:8000/users')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
      console.log(data);
      setUserList(data);
    })

    fetch('http://localhost:8000/currentUser/0')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
      console.log(data);
      setCurrentUser(data);
    })
  },[]);

  return (
    <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} handleUser={setCurrentUser} />} />
        <Route path="/login" element={<LoginPage handleUser={setCurrentUser} userList={userList} />} />
        <Route path="/register" element={<RegisterPage handleUser={setCurrentUser} userList={userList} handleUserList={setUserList} />} />
    </Routes>
  )
}

export default App;
