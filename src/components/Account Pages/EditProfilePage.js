import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './EditProfilePage.css';

function EditProfilePage({handleUser})
{
    const location = useLocation();
    const { currentUser } = location.state || {};
    const { prevPath } = location.state || {};

    //Submitted types: "none","success","passwordFailed","emailFailed"

    const [userEdited,setUserEdited] = useState(currentUser);

    const [submitted,setSubmitted] = useState("none");

    // const [profilePicture,setProfilePicture] = useState("");

    // const [firstNameValue,setFirstNameValue] = useState("");
    // const [lastNameValue,setLastNameValue] = useState("");

    // const [emailValue,setEmailValue] = useState("");

    // const [passwordValue,setPasswordValue] = useState("");
    const [confirmPasswordValue,setConfirmPasswordValue] = useState("");

    const [passwordEdit,setPasswordEdit] = useState(false);

    const [requiredFields,setRequiredFields] = useState(document.querySelectorAll(".edit-profile-form-input"));

    const navigate = useNavigate();

    function handleUserEdit(event)
    {
        setUserEdited({
            ...userEdited,
            [event.target.name]: event.target.value
        })
    }

    function handleProfilePicture(event)
    {
        toBase64(event.target.files[0]);
    }

    function toBase64(file)
    {
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result);
            setUserEdited({...userEdited,image:reader.result})
        }
    }

    function handlePasswordValue(event)
    {
        setUserEdited({...userEdited,password: event.target.value});
        if(currentUser.password!==event.target.value)
        {
            if(!passwordEdit)
            {
                setPasswordEdit(true);
            }
        }
        else
        {
            if(passwordEdit)
            {
                setPasswordEdit(false);
            }
        }
    }

    function handleConfirmPasswordValue(event)
    {
        setConfirmPasswordValue(event.target.value);
    }

    function inputEmpty(inputs)
    {
        console.log(inputs.length)
        for(let i = 0; i < inputs.length; i++)
        {
            if(inputs[i].value==="") return true;
        }
        return false; 
    }

    function updateProfile(e)
    {
        e.preventDefault();

        if(passwordEdit)
        {
            if(userEdited.password!==confirmPasswordValue)
            {
                setSubmitted("passwordFailed");
                return;
            }
        }


        setSubmitted("success");

        let updateduser = {
            ...userEdited,
            id: currentUser.id,
        };
        
        
        const axios = require('axios');

        axios.put('http://localhost:8000/users/'+currentUser.id,
            updateduser
        )
        .then(resp =>{
            console.log("Updated your profile");
        }).catch(error => {
            console.log(error);
        });

        //To update state and trigger re-render
        handleUser(updateduser);

        navigate(prevPath);
        return


    }

    function setPageOnMount()
    {
       if(currentUser)
       {
           console.log("yes");
           
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

    useEffect(()=>{
        setPageOnMount();
    },[])

    useEffect(()=>{
        setRequiredFields(document.querySelectorAll(".edit-profile-form-input"));
    },[passwordEdit])


    return (
        <div className="edit-profile-page">
            <div className="edit-profile-page-container">
                <div className="edit-profile-form-container">
                    <h1 className="edit-profile-form-title">Edit Profile</h1>
                    <form className="edit-profile-form" onSubmit={updateProfile}>
                        <div className="edit-profile-form-section-group">
                            <div className="edit-profile-form-section">
                                {
                                    userEdited && <img className="edit-profile-picture-display" src={userEdited.image} />
                                }
                                <input className="" type="file" name="image" onChange={handleProfilePicture}/>
                            </div>
                            <div className="edit-profile-form-section">
                                <h2 className="edit-profile-form-section-label">First Name:</h2>
                                <input className="edit-profile-form-input" type="text" name="firstName" value={userEdited.firstName} onChange={handleUserEdit} required />
                            </div>
                            <div className="edit-profile-form-section">
                                <h2 className="edit-profile-form-section-label">Last Name:</h2>
                                <input className="edit-profile-form-input" type="text" name="lastName" value={userEdited.lastName} onChange={handleUserEdit} required />
                            </div>

                            <div className="edit-profile-form-section">
                                <h2 className="edit-profile-form-section-label">Email:</h2>
                                <input className="edit-profile-form-input" type="email" name="email" value={userEdited.email} onChange={handleUserEdit} required />
                            </div>

                            
                            <div className="edit-profile-form-section">
                                <h2 className="edit-profile-form-section-label">Password:</h2>
                                <input className="edit-profile-form-input" type="text" name="password" value={userEdited.password} onChange={handlePasswordValue} required/>
                            </div>

                            {
                                passwordEdit &&
                                
                                            <div className="edit-profile-form-section">
                                                <h2 className="edit-profile-form-section-label">Confirm Password:</h2>
                                                <input className="edit-profile-form-input" type="password" value={confirmPasswordValue} onChange={handleConfirmPasswordValue} required/>
                                            </div>
                            }
                        </div>
                        
                        {
                            submitted==="emailFailed" ? <div className="edit-profile-form-warning">Email already registered</div> :
                            submitted==="passwordFailed" && <div className="edit-profile-form-warning">Passwords does not match</div>
                            
                        }
                        <div className="edit-profile-options-container">
                        </div>
                        <input className="edit-profile-form-submit" value="Save Changes" type="submit" disabled={inputEmpty(requiredFields)}/>
                        
                    </form>
                </div>
                <div className="home-button-container">
                    <Link to={prevPath} className="home-button">Go Back</Link>
                </div>
            </div>
        </div>
    )   
}

export default EditProfilePage;