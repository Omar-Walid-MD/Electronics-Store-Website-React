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
import CartPage from './components/Account Pages/CartPage';
import CheckoutPage from "./components/Account Pages/CheckoutPage";
import PurchaseHistory from './components/Account Pages/PurchaseHistoryPage';

function App()
{

  const [userList,setUserList] = useState(null);

  const [currentUser,setCurrentUser] = useState(null);

  const [productList,setProductList] = useState(null);

  const [purchaseList,setPurchaseList] = useState(null);

  const [branchList,setBranchList] = useState(null);


  useEffect(()=>{
    fetch('http://localhost:8000/users')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
      console.log(data);
      setUserList(data);
    })

    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))

    fetch('http://localhost:8000/products')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
    //   console.log(data);
      setProductList(data);
    })

    fetch('http://localhost:8000/branches')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
    //   console.log(data);
      setBranchList(data);
    })

    fetch('http://localhost:8000/purchases')
    .then(res => {
      return res.json()
    })
    .then((data)=>{
    //   console.log(data);
      setPurchaseList(data);
    })
    

    
  },[]);




  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  return (
    
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<HomePage currentUser={currentUser} handleUser={setCurrentUser} productList={productList} branchList={branchList} />} />
      <Route path="/shop" element={<ShoppingPage currentUser={currentUser} handleUser={setCurrentUser} productList={productList} />}/>
      <Route path="/product/:id" element={<ProductPage currentUser={currentUser} handleUser={setCurrentUser} productList={productList} branchList={branchList} />} />
      <Route path="/checkout" element={<CheckoutPage currentUser={currentUser} handleUser={setCurrentUser} />} />
      {/* Account Pages */}
      <Route path="/login" element={<LoginPage handleUser={setCurrentUser} userList={userList} />} />
      <Route path="/register" element={<RegisterPage handleUser={setCurrentUser} userList={userList} handleUserList={setUserList} />} />
      <Route path="/edit-profile" element={<EditProfilePage handleUser={setCurrentUser} />} />
      <Route path="/cart" element={<CartPage currentUser={currentUser} handleUser={setCurrentUser} productList={productList} />} />
      <Route path="/purchase-history" element={<PurchaseHistory currentUser={currentUser} handleUser={setCurrentUser} purchaseList={purchaseList} productList={productList} />} />

      {/* Product Database Pages */}
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/edit-product" element={<EditProductPage />} />
    </Routes>
  )
}

export default App;
