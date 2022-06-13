import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <NavLink exact to="/" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}> 
                Accueil
            </NavLink>
            <NavLink exact to="/nouveau" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                Créer un post
            </NavLink>
            <NavLink exact to="/profil" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                Mon profil
            </NavLink>
            <NavLink exact to="/inscription" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                Créer un compte
            </NavLink>
            <NavLink exact to="/connexion" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                Se connecter
            </NavLink>
        </div>
    );
};

export default Navigation;