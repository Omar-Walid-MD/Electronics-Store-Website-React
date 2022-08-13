import { useState, useEffect } from 'react';
import { Routes, Route} from "react-router-dom";
import HomePage from './components/Home Page/HomePage';
import LoginPage from './components/Account Pages/LoginPage';
import RegisterPage from './components/Account Pages/RegisterPage';
import AddProductPage from './components/Product Database Management Pages/AddProductPage';
import ProductListPage from './components/Product Database Management Pages/ProductListPage';
import EditProductPage from './components/Product Database Management Pages/EditProductPage';
import ShoppingPage from './components/Shopping Page/ShoppingPage';
import EditProfilePage from './components/Account Pages/EditProfilePage';
import ProductPage from './components/Product Page/ProductPage';




function App() {

  const [userList,setUserList] = useState(null);

  const [currentUser,setCurrentUser] = useState(null);

  const [productList,setProductList] = useState(null);

  function handleCurrentUser()
  {
    fetch('http://localhost:8000/currentUser/0')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
      //console.log(data);
      const userId = data.userId;

      if(userId===0)
      {
        setCurrentUser(data);
      }
      else
      {
        fetch('http://localhost:8000/users/'+userId)
        .then(res => {
          return res.json()
        })
        .then((data)=>{
          //console.log("Current user: ");
          //console.log(data);
          setCurrentUser(data);
          
        })
      }

      
    })

  }

  useEffect(()=>{
    fetch('http://localhost:8000/users')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
      console.log(data);
      setUserList(data);
    })

    handleCurrentUser();

    fetch('http://localhost:8000/products')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
    //   console.log(data);
      setProductList(data);
    })

    
  },[]);

  useEffect(()=>{
    



},[]);

  return (
    
    <Routes>
      <Route path="/" element={<HomePage currentUser={currentUser} handleUser={setCurrentUser} productList={productList} />} />
      <Route path="/login" element={<LoginPage handleUser={setCurrentUser} userList={userList} />} />
      <Route path="/register" element={<RegisterPage handleUser={setCurrentUser} userList={userList} handleUserList={setUserList} />} />
      <Route path="/shop" element={<ShoppingPage currentUser={currentUser} handleUser={setCurrentUser} productList={productList} />}/>
      <Route path="/product" element={<ProductPage currentUser={currentUser} handleUser={setCurrentUser} productList={productList} />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/edit-product" element={<EditProductPage />} />
      <Route path="/edit-profile" element={<EditProfilePage handleUser={setCurrentUser} />} />
    </Routes>
  )
}

export default App;
