import HeaderDisconnected from '../components/HeaderDisconnected';
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => { 
        e.preventDefault();
        const emailPasswordError = document.querySelector('.password.error');

        const data = {
            email,
            password  
        };

        const promise = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        fetch(`http://localhost:3001/api/auth/login`, promise)

            .then((res) => {
                console.log(res)
                    window.location = "/";
                
            })

            .catch((err) => {

                if (err.message.includes("Request failed with status code 400")) {
                    emailPasswordError.innerHTML = "mot de passe incorrect";

                }

                if (err.message.includes("Request failed with status code 429")) {
                    emailPasswordError.innerHTML = "trop de tentatives de connexion, compte bloqué pour 5 minutes";
                }
            })

    }

    return (

        <div>
            <header className='disconnectedHeader'>
                <HeaderDisconnected />
            </header>
            <div>
                <div className='postBody'>
                    <form action="" onSubmit={handleLogin} className='formlogin'>
                        <label htmlFor="email">Adresse mail* :<input type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} /></label>
                        <label htmlFor="password">Mot de passe* :<input type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password} /></label>
                <div className="password email error"></div>
                        <input type="submit" value="Se connecter" className='boutonform'/>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;