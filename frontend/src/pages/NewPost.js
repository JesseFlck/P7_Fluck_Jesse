import React from 'react';
import Logo from '../components/Logo';
import CreatePost from '../components/CreatePost';
import Navigation from '../components/Navigation';

const NewPost = () => {
    return (
        <div>
            <header>
                <Logo />
                <Navigation />
            </header>
            <body>
                <h1>Nouveau post</h1>
                <CreatePost />
            </body>
        </div>
    );
};

export default NewPost;