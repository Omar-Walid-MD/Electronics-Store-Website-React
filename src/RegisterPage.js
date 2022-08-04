import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage({handleUser,userList,handleUserList})
{
    //Submitted types: "none","success","passwordFailed","emailFailed"
    const [submitted,setSubmitted] = useState("none");

    const [firstNameValue,setFirstNameValue] = useState("");
    const [lastNameValue,setLastNameValue] = useState("");

    const [emailValue,setEmailValue] = useState("");
    const [passwordValue,setPasswordValue] = useState("");
    const [confirmPasswordValue,setConfirmPasswordValue] = useState("");

    const requiredValues = [firstNameValue,lastNameValue,emailValue,passwordValue,confirmPasswordValue];

    const navigate = useNavigate();

    function handleFirstNameValue(event)
    {
        setFirstNameValue(event.target.value);
    }
    function handleLastNameValue(event)
    {
        setLastNameValue(event.target.value);
    }
    function handleEmailValue(event)
    {
        setEmailValue(event.target.value);
    }

    function handlePasswordValue(event)
    {
        setPasswordValue(event.target.value);
    }

    function handleConfirmPasswordValue(event)
    {
        setConfirmPasswordValue(event.target.value);
    }

    function inputEmpty()
    {
        for(let i = 0; i < requiredValues.length; i++)
        {
            if(requiredValues[i]==="") return true;
        }
        return false; 
    }

    function register(e)
    {
        e.preventDefault();
        
        for(let i = 0; i < userList.length; i++)
        {
            if(userList[i].email===emailValue)
            {
                setSubmitted("emailFailed");
                return;
            }
        }
        if(passwordValue===confirmPasswordValue)
        {
            setSubmitted("success");

            let newUser = {
                id: makeId(10),
                firstName: firstNameValue,
                lastName: lastNameValue,
                email: emailValue,
                password: passwordValue,
            };
            
            fetch('http://localhost:8000/users',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            }).then(()=>{console.log("New User Added.")})
            
            handleUserList(prevList => [...prevList,newUser]);
            handleUser(newUser);
            navigate("/");
            return
        }
        else
        {
            setSubmitted("passwordFailed");
            return;
        }

    }

    function makeId(length) {
        let result = "";
        let chars = "123456789";
        for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 9)];
        }
        return result;
      }


    return (
        <div className="register-page">
            <div className="register-page-container">
                <div className="register-form-container">
                    <h1 className="register-form-title">Register</h1>
                    <form className="register-form" onSubmit={register}>
                        <div className="register-form-section-group">
                            <div className="register-form-section">
                                <h2 className="register-form-section-label">First Name:</h2>
                                <input className="register-form-input" type="text" value={firstNameValue} onChange={handleFirstNameValue} />
                            </div>
                            <div className="register-form-section">
                                <h2 className="register-form-section-label">Last Name:</h2>
                                <input className="register-form-input" type="text" value={lastNameValue} onChange={handleLastNameValue} />
                            </div>

                            <div className="register-form-section">
                                <h2 className="register-form-section-label">Email:</h2>
                                <input className="register-form-input" type="email" value={emailValue} onChange={handleEmailValue} />
                            </div>
                            
                            <div className="register-form-section">
                                <h2 className="register-form-section-label">Password:</h2>
                                <input className="register-form-input" type="password" value={passwordValue} onChange={handlePasswordValue} />
                            </div>

                            <div className="register-form-section">
                                <h2 className="register-form-section-label">Confirm Password:</h2>
                                <input className="register-form-input" type="password" value={confirmPasswordValue} onChange={handleConfirmPasswordValue} />
                            </div>
                        </div>
                        
                        {
                            submitted==="emailFailed" ? <div className="register-form-warning">Email already registered</div> :
                            submitted==="passwordFailed" && <div className="register-form-warning">Passwords does not match</div>
                            
                        }
                        <div className="register-options-container">
                            <Link to="/login" className="forgot-password-link">Have an account?</Link>
                        </div>
                        <input className="register-form-submit" type="submit" disabled={inputEmpty()}/>
                        
                    </form>
                </div>
                <div className="home-button-container">
                    <Link to={"/"} className="home-button">Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;