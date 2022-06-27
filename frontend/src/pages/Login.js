import React from 'react';
import HeaderDisconnected from '../components/HeaderDisconnected';

/*fetch('http://localhost:3001/api/auth')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
        console.log(res.json)
    })*/


const Login = () => {
    return (
        <div>
            <header className='disconnectedHeader'>
                <HeaderDisconnected />
            </header>
            <div>
                <div className='postBody'>
                    <form className='formlogin'>
                        <label>Adresse mail* :<input type="text" name="mail" /></label>
                        <label>Mot de passe* :<input type="text" name="password" /></label>
                        <input type="submit" value="Se connecter" className='boutonform'/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;