import React from 'react';
import HeaderConnected from '../components/HeaderConnected';
import Profil from '../components/Profile'

const Profile = () => {
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
