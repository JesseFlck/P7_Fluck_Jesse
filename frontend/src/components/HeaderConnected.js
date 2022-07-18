import React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import axios from "axios"
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);




const HeaderConnected = () => {    

    const [userOnline, setUserOnline] = useState({});
            axios.get("http://localhost:3001/api/auth/user/" + parseToken.userId, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${parseToken.token}`
                }
            })
            .then(({ data }) => {
                return(
                setUserOnline(data)
                )
            })


    return (
        <div className="connectedHeader">
            <div className='logo'>
                <img src="./images/logo.png" alt="Logo Groupomania" />
            </div>
            <div className='navigation'>
                <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}> 
                    Accueil
                </NavLink>
                {userOnline.isAdmin? <NavLink to="/membres" className={({isActive}) => "nav-link" + (isActive ? " activated" : "")}>
                    Membres
                </NavLink> : null}
                <NavLink to="/profil" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    Mon profil
                </NavLink>
                <NavLink to="/connexion" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    <Logout />
                </NavLink>
            </div>
        </div>
    );
};

export default HeaderConnected;