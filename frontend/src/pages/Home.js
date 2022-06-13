import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Posts from '../components/Posts';

const Home = () => {
    return(
        <div className="home">
            <header>
                <Logo />
                <Navigation />
            </header>
            <h1>Accueil</h1>
            <body>
                <Posts />
            </body>
        </div>
    );
};

export default Home;
