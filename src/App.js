import logo from './logo.svg';
import HomePage from './HomePage';
import { Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage';
import { useState } from 'react';

function App() {

  const userList = [
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
  ];

  const [currentUser,setCurrentUser] = useState(null);

  return (
    <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/login" element={<LoginPage handleUser={setCurrentUser} userList={userList} />} />
    </Routes>
  )
}

export default App;
