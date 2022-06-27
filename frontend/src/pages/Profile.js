import React from 'react';
import HeaderConnected from '../components/HeaderConnected';

const Profile = () => {
    return (
        <div>
            <header className='connectedHeader'>
                <HeaderConnected />
            </header>
            <h1>Profil d'utilisateur</h1>
        </div>
    );
};

export default Profile;