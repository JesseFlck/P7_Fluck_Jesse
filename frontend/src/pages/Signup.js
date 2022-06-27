import React from 'react';
import HeaderDisconnected from '../components/HeaderDisconnected';

/*fetch('http://localhost:3001/api/auth/')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })*/

const Signup = () => {
    return (
        <div>
            <header className='disconnectedHeader'>
                <HeaderDisconnected />
            </header>
            <div>
                <div className='postBody'>
                    <form className='formsignup'>
                        <label>Adresse mail* :<input type="text" name="mail" /></label>
                        <label>Mot de passe* :<input type="text" name="password" /></label>
                        <label>Nom* :<input type="text" name="lastname" /></label>
                        <label>Prénom* :<input type="text" name="firstname" /></label>
                        <input type="submit" value="S'inscrire" className='boutonform'/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
