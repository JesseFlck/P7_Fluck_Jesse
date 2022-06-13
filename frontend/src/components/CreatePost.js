//import React, { useEffect, useState } from 'react';
//import axios from 'axios';

/*const Memberlist = () => {
    //const [data, setData] = useState([]);


    useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=name;population;region;capital;flag')
        .then((res) => setData (res.data))


    //console.log(data)
    }, [])


    return (
        <div className='memberList'>
            <ul className='memberCard'>
                {data.map((country) => (
                   <li>{country.name}</li>
                ))}
            </ul>
        </div>
        )
    

    return (
        <div className='memberList'>
            <div className='memberCard'>
                <h3>Prénom Nom</h3>
                <img src="https://zupimages.net/up/22/22/e3uh.jpg" alt="profil" />
                <input type="submit" value="Voir le profil" className='boutonform'/>
            </div>
        </div>
    );
};

export default Memberlist;*/

import React from 'react';

const CreatePost = () => {
    return (
        <body>
                <form className='formpost'>
                    <label>Contenu :<input type="text" name="content" /></label>
                    <label>Image (jpg, png, jpeg, gif) :<input type="text" name="image" /></label>
                    <input type="submit" value="S'inscrire" className='boutonform'/>
                </form>
        </body>
    );
};

export default CreatePost;