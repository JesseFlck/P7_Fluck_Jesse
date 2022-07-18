import "../styles/index.scss";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import HeaderConnected from '../components/HeaderConnected';
import { useForm } from "react-hook-form"
import React, { useState } from 'react';
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);


const EditPost = () => {

    if (!parseToken) {
        window.location.href = "/connexion";
      };

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()
    const location = useLocation()
    const { element } = location.state


    const onSubmit = (data) => {
        const formdata = new FormData()
        formdata.append("imageUrl", data.imageUrl[0])
        formdata.append("title", data.title)
        formdata.append("content", data.content)
        axios.put("http://localhost:3001/api/posts/" + element._id, formdata, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        }) 
            .then((res) => {
                navigate("/");
            })
            .catch((error) => {
                setError(error.response.data.error)
            })
    }

    return (

        <div>
            <header className='connectedHeader'>
                <HeaderConnected />
            </header>
            <div>
            <h1>Modifier son post</h1>
                <div className='postBody' key={`post-${element._id}`}>
                    <form onSubmit={handleSubmit(onSubmit)} className='editpost'>
                            <label htmlFor="title">Titre :<br />
                                <input {...register('title')} defaultValue={element.title} type="text" autoFocus maxLength={255} id="title" /></label>
                            <br /><br />
                            <label htmlFor="content">Contenu :<br />
                                <textarea {...register('content')} defaultValue={element.content} type="text" id="content" /></label>
                            <br /><br />
                            <input {...register('imageUrl')} aria-label="Ajouter une image" type="file" />
                            <br /><br />
                            <div className="btneditpost">
                                <input type="submit" value="Modifier" className='boutonform'/>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPost;