import React from 'react';
import { NavLink } from 'react-router-dom';

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
                <NavLink exact to="/" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}> 
                    Accueil
                </NavLink>
                <NavLink exact to="/profil" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    Mon profil
                </NavLink>
                <NavLink exact to="/inscription" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                    Se déconnecter
                </NavLink>
            </div>
        </div>
    );
};

export default HeaderConnected;