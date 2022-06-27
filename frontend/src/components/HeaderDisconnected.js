import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderDisconnected = () => {
    return (
        <div className="disconnectedHeader">
            <div className='logo'>
                <img src="./images/logo.png" alt="Logo Groupomania" />
            </div>
            <div className='navigation'>
                <NavLink exact to="/inscription" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    Créer un compte
                </NavLink>
                <NavLink exact to="/connexion" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    Se connecter
                </NavLink>
            </div>
        </div>
    );
};

export default HeaderDisconnected;