import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

const HeaderConnected = () => {
    /*const logoutUser = () => dispatch => {
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
    
    const Sidebar = ({auth: {isAuthenticated},logoutUser}) => {
}*/

    
    return (
        <div className="connectedHeader">
            <div className='logo'>
                <img src="./images/logo.png" alt="Logo Groupomania" />
            </div>
            <div className='navigation'>
                <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}> 
                    Accueil
                </NavLink>
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