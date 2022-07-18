import React from 'react';
import HeaderConnected from '../components/HeaderConnected';
import Profil from '../components/Profile'
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);

const Profile = () => {

    if (!parseToken) {
        window.location.href = "/connexion";
      };

    return (
        <div>
            <header className='connectedHeader'>
                <HeaderConnected />
            </header>
            <h1>Profil d'utilisateur</h1>
            <Profil />
        </div>
    );
};

export default Profile;
