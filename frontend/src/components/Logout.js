import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";

const Logout = () => {
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    }
    
    const logout = async () => {
        await axios({
            method: 'get',
            url: `http://localhost:3001/api/auth/logout`,
            withCredentials: true
        })
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err));

        window.location = "/connexion";
    }
    return (
        <li onClick={logout}>
            Déconnexion
        </li>
    );

};

export default Logout;