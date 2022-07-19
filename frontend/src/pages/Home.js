import axios from 'axios';
import { useState, useContext } from "react";
import React from 'react';
import HeaderConnected from '../components/HeaderConnected';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
//import UserContext from '../store/user-contexte';
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);


const Home = () => {

    if (!parseToken) {
        window.location.href = "/connexion";
      };

      //useeffect
    const [user, setUser] = useState({});
        axios.get("http://localhost:3001/api/auth/user/" + parseToken.userId, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
        .then(({ data }) => {
            return(
            setUser(data)
            )
        })


    // user = useContext(UserContext)

    return(
        <div className="home">
            <header className='connectedHeader'>
                <HeaderConnected />
            </header>
            <h1>Bienvenue {user.firstName} !</h1>
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