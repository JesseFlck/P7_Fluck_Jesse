import HeaderDisconnected from '../components/HeaderDisconnected';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    /*let data = {
      email,
      password,
    };*/
    axios({
      method: "POST",
      url: 'http://localhost:3001/api/auth/login',
      data: {
        email: email,
        password: password,
      },
    })
    .then((res) => {
      localStorage.token = JSON.stringify(res.data);
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <header className="disconnectedHeader">
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