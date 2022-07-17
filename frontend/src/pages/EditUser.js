import "../styles/index.scss";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useParams, useLocation } from "react-router-dom"
import HeaderConnected from '../components/HeaderConnected';
import { useForm } from "react-hook-form"
import React, { useState } from 'react';
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);


const EditUser = () => {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()


    const onSubmit = (data) => {
        const formdata = new FormData()
        formdata.append("imageUrl", data.imageUrl[0])
        formdata.append("firstName", data.firstName)
        formdata.append("lastName", data.lastName)
        formdata.append("email", data.email)
        formdata.append("password", data.password)
        axios.put(`http://localhost:3001/api/auth/update/` + parseToken.userId, formdata, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        }) 
            .then((res) => {
                navigate("/profil");
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
            <h1>Modifier son profil</h1>
                <div className='postBody'>
                    <form onSubmit={handleSubmit(onSubmit)} className='editprofile'>
                            <label htmlFor='imageUrl'>Photo de profil :<br/>
                            <input {...register('imageUrl')} aria-label="Ajouter une image" type="file" /></label>
                            <br /><br />
                            <label htmlFor="firstName">Prénom* :<br />
                                <input {...register('firstName')} type="text" autoFocus id="firstName" required /></label>
                                <div className='firstName error'></div>
                            <br /><br />
                            <label htmlFor="lastName">Nom* :<br />
                                <input {...register('lastName')} type="text" autoFocus id="lastName" required /></label>
                                <div className='lastName error'></div>
                            <br /><br />
                            <label htmlFor="email">Adresse mail* :<br />
                                <input {...register('email')} type="text" autoFocus id="email" required /></label>
                                <div className='email error'></div>
                            <br /><br />
                            <label htmlFor="password">Mot de passe* :<br />
                                <input {...register('password')} type="text" autoFocus id="password" required /></label>
                                <div className='password error'></div>
                            <br /><br />
                            <div className="btneditprofile">
                                <input type="submit" value="Valider" className='boutonform'/>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;