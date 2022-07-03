/*import React from 'react';


//import { createElement, useEffect, useState } from 'react';
//import { timePassed } from "../utils/utils";

//import { all } from "../../../backend/app";


/*fetch('http://localhost:3001/api/auth')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
        console.log(res.json.data)
    })


     const init = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    
    const user = fetch(
        `http://localhost:3001/api/auth`, init
        ).then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
                
                // do fetch requests in parallel
                // using the Promise.all() method
                const allData = Promise.all([user]);
                
                // attach then() handler to the allData Promise
                allData.then((res) => console.log(res));

                
                
                
                const Profil = () => {
                    return(
                    <article className='profile'>
                          <div className='headerProfile'>
                                <div className='userImg'><img src='{user.imageUrl}' alt='profile pic'/></div>
                                <div className='userName'>
                                        jeanmich
                                </div>
                                <div className='profileCorpse'>
                                    <p>blabla</p>
                                </div>
                                <div className='footerProfile'>
                                    <div className='postsNumbers'>
                                        5 posts
                                    </div>
                                    <div className='commNumbers'>
                                        13 commentaires
                                    </div>
                                </div>
                                    
                          </div>          
                    </article>//`
                );
            }
        
        export default Profil;*/

        import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Profile(){
	const api = 'http://localhost:3001/api/auth';
	const [user, setUser] = useState();

	useEffect(() => {
		axios.get(api)
			.then(res => {
				setUser(res.data)
		})
	}, [api])

	if(user){
		return (
			<div>
				<h1>{user.firstName}</h1>
			</div>
		)
	}

	return (
		<div></div>
	)
	
}

export default Profile;