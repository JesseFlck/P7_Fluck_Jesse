import "../styles/index.scss";
import { useNavigate } from "react-router-dom"
import HeaderConnected from '../components/HeaderConnected';
import React, { useState } from 'react';
const passwordValidator = require('password-validator');
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);

const EditUser = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstNameError = document.querySelector('.firstName.error');
        const lastNameError = document.querySelector('.lastName.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordRegex = new passwordValidator();
        passwordRegex
            .is().min(6)                                    // Minimum 6 caractères
            .is().max(30)                                   // Maximum 30 caractères
            .has().uppercase()                              // Doit contenir au moins une majuscule
            .has().lowercase()                              // Doit contenir au moins une minuscule
            .has().digits(2)                                // Doit avoir au moins 2 chiffres
            .has().not().spaces()                           // Ne doit pas avoir d'espaces
            .is().not().oneOf(['Passw0rd', 'Password123', 'azerty1234']); // Liste de mots de passes interdits
        const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
        const nameRegex = new RegExp(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/);
        const firstnameRegex = new RegExp(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/);
        
        //firstnameError.innerHTML = "";
        if (!firstnameRegex.test(firstName)) {
            firstNameError.innerHTML = "Veuillez respecter le bon format"
        }
        //nameError.innerHTML = "";
        if (!nameRegex.test(lastName)) {
            lastNameError.innerHTML = "Veuillez respecter le bon format"
        }
        //emailError.innerHTML = "";
        if (!emailRegex.test(email)) {
            emailError.innerHTML = "e-mail incorrect"
        }
        //passwordError.innerHTML = "";
        if (!passwordRegex.validate(password)) {
            passwordError.innerHTML = "le mot de passe doit contenir une majuscule, une minuscule et au moins 6 caracteres"
        }
        console.log('test')


        if ((emailRegex.test(email) === true) && (nameRegex.test(lastName) === true) && (firstnameRegex.test(firstName) === true) && (passwordRegex.validate(password) === true)) {
            console.log('test2')
            const data = {
                imageUrl,
                firstName,
                lastName,
                email,
                password  
            };

                const promise = {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${parseToken.token}`
                    }
                }
                console.log(promise)
                if(!imageUrl){
                    fetch(`http://localhost:3001/api/auth/update/` + parseToken.userId, promise)
            
                    .then((res) => {
                        console.log((res))
                        navigate("/profil");
                    })
                    .catch((err) => console.log(err.message))
                }else{
                    fetch(`http://localhost:3001/api/auth/update/${parseToken.userId}/${imageUrl}`, promise)
        
                .then((res) => {
                    console.log((res))
                    navigate("/profil");
                })
                
                    .catch((err) => console.log(err.message))
                }
        }
    };




    return (


        <div>
            <header className='connectedHeader'>
                <HeaderConnected />
            </header>
            <div>
            <h1>Modifier son profil</h1>
                <div className='postBody'>
                    <form action="" onSubmit={handleSubmit} className='editprofile'>
                        <label htmlFor='imageUrl'>Photo de profil :<br />
                            <input type="file" name="imageUrl" id="imageUrl" onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} /></label>
                        <br />
                        <label htmlFor='firstName'>Prénom* :<input type="text" name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} /></label>
                        <div className='firstName error'></div>
                        <br />
                        <label htmlFor='lastName'>Nom* :<input type="text" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} /></label>
                        <div className='lastName error'></div>
                        <br />
                        <label htmlFor='email'>Adresse mail* :<input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} /></label>
                        <div className='email error'></div>
                        <div className='mail error'></div>
                        <br />
                        <label htmlFor='password'>Mot de passe* :<input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} /></label>
                        <div className='password error'></div>
                        <br />
                        <div className="btneditprofile">
                            <input type="submit" value="Valider" className='boutonform'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;