import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Profile = () => {
    return (
        <div>
            <header>
                <Logo />
                <Navigation />
            </header>
            <h1>Profil d'utilisateur</h1>
        </div>
    );
};

export default Profile;
