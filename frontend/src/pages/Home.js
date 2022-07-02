import React from 'react';
import HeaderConnected from '../components/HeaderConnected';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';


const Home = () => {
    return(
        <div className="home">
            <header className='connectedHeader'>
                <HeaderConnected />
            </header>
            <h1>Bienvenue (nom user) !</h1>
            <div id='post'>
                <div className='createpost'>
                    <CreatePost />
                </div>
                <Post />
            </div>
        </div>
    );
};

export default Home;