import axios from 'axios';
import { useState } from "react";
import React from 'react';
import HeaderConnected from '../components/HeaderConnected';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);


//const userid = localStorage.getItem(parseToken.userId)
//console.log(userid)



//console.log(GetUser.data)


const Home = () => {
    const [user, setUser] = useState({});
        axios.get("http://localhost:3001/api/auth/user/" + parseToken.userId)
        .then(({ data }) => {
            return(
            setUser(data)
            )
        })

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