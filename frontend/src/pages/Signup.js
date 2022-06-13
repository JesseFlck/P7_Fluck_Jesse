import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Signup = () => {
    return (
        <div>
            <header>
                <Logo />
                <Navigation />
            </header>
            <body>
                <form className='formsignup'>
                    <label>Adresse mail* :<input type="text" name="mail" /></label>
                    <label>Mot de passe* :<input type="text" name="password" /></label>
                    <label>Nom* :<input type="text" name="lastname" /></label>
                    <label>Prénom* :<input type="text" name="firstname" /></label>
                    <input type="submit" value="S'inscrire" className='boutonform'/>
                </form>
            </body>
        </div>
    );
};

export default Signup;