import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Login = () => {
    return (
        <div>
            <header>
                <Logo />
                <Navigation />
            </header>
            <body>
                <form className='formlogin'>
                    <label>Adresse mail* :<input type="text" name="mail" /></label>
                    <label>Mot de passe* :<input type="text" name="password" /></label>
                    <input type="submit" value="Se connecter" className='boutonform'/>
                </form>
            </body>
        </div>
    );
};

export default Login;