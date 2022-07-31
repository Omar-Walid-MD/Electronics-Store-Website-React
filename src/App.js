import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { EasybaseProvider, useEasybase } from "easybase-react";
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function App() {

  const [userList,setUserList] = useState([
    {
      firstName: "Omar",
      lastName: "Diab",
      email: "omar.madinah49@yahoo.com",
      password: "omar123",
    },
    {
      firstName: "Walid",
      lastName: "Diab",
      email: "walid.madinah49@yahoo.com",
      password: "walid123",
    },
    {
      firstName: "Mohammed",
      lastName: "Diab",
      email: "mohammed.madinah49@yahoo.com",
      password: "mido123",
    },
  ]);

  const [currentUser,setCurrentUser] = useState(null);

  return (
    <EasybaseProvider>
      <Routes>
          <Route path="/" element={<HomePage currentUser={currentUser} />} />
          <Route path="/login" element={<LoginPage handleUser={setCurrentUser} userList={userList} />} />
          <Route path="/register" element={<RegisterPage handleUser={setCurrentUser} userList={userList} handleUserList={setUserList} />} />
      </Routes>
    </EasybaseProvider>
  )
}

export default App;
