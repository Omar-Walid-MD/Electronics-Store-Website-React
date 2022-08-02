import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({handleUser,userList})
{
    //Submitted types: "none","success","passwordFailed","emailFailed"
    const [submitted,setSubmitted] = useState("none");

    const [emailValue,setEmailValue] = useState("");
    const [passwordValue,setPasswordValue] = useState("");

    const navigate = useNavigate();

    function handleEmailValue(event)
    {
        setEmailValue(event.target.value);
        // console.log("Email: " + emailValue);
    }

    function handlePasswordValue(event)
    {
        setPasswordValue(event.target.value);
        // console.log("Password: " + passwordValue);
    }

    function inputEmpty()
    {
        return (emailValue === "" || passwordValue === "")
    }

    function logIn(e)
    {
        e.preventDefault();
        
        for(let i = 0; i < userList.length; i++)
        {
            if(userList[i].email===emailValue)
            {
                if(userList[i].password===passwordValue)
                {

                    let loggedUser = {...userList[i], loggedIn: true};
                    console.log("Successfully logged in");
                    setSubmitted("success");

                    const axios = require('axios');

                    axios.put('http://localhost:8000/currentUser/0',
                        loggedUser
                    )
                    .then(resp =>{
                        console.log(resp.data);
                    }).catch(error => {
                        console.log(error);
                    });


                    handleUser(loggedUser);
                    navigate("/");
                    return;
                }
                else
                {
                    console.log("Password Incorrect");
                    setSubmitted("passwordFailed");
                    return;
                }
            }
        }
        console.log("Email not registered");
        setSubmitted("emailFailed");
    }


    return (
        <div className="login-page">
            <div className="login-page-container">
                <div className="login-form-container">
                    <h1 className="login-form-title">Log in</h1>
                    <form className="login-form" onSubmit={logIn}>
                        <div className="login-form-section-group">
                            <div className="login-form-section">
                                <h2>Email:</h2>
                                <input className="login-form-input" type="email" value={emailValue} onChange={handleEmailValue} />
                            </div>
                            
                            <div className="login-form-section">
                                <h2>Password:</h2>
                                <input className="login-form-input" type="password" value={passwordValue} onChange={handlePasswordValue} />
                            </div>
                        </div>
                        
                        {
                            submitted==="emailFailed" ? <div className="login-form-warning">Email not registered</div> :
                            submitted==="passwordFailed" && <div className="login-form-warning">Password Incorrect</div>
                            
                        }
                        <div className="login-options-container">
                            <div>
                                <input id="remember-me-checkbox" type="checkbox" />
                                <label htmlFor="remember-me-checkbox">Remember Me</label>
                            </div>

                            <a className="forgot-password-link">Forgot Password?</a>
                        </div>
                        <input className="login-form-submit" type="submit" disabled={inputEmpty()}/>
                        
                    </form>
                </div>
                <div className="home-button-container">
                    <Link to={"/"} className="home-button">Back to Home</Link>
                </div>
            </div>
            

        </div>
    )
}

export default LoginPage;