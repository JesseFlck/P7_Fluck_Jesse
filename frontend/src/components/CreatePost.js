import React from 'react';
import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);

const CreatePost = () => {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()


    const onSubmit = (data) => {
        const formdata = new FormData()
        formdata.append('userId', parseToken.userId);
        formdata.append("imageUrl", data.imageUrl[0])
        formdata.append("title", data.title)
        formdata.append("content", data.content)

        axios.post("http://localhost:3001/api/posts/new", formdata, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
            .then((res) => {
                //if(res.ok){
                    window.location.reload("/");
                //}
            })
            .catch((error) => {
                setError(error.response.data.error)
            })
    }

    useEffect(() => {
        if (!window.localStorage.token) {
            navigate('/')
        }
    }, [])

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



    return (
        <div>
            <div className='postBody' key={parseToken.userId}>
                <div className='posterImg'><img src={user.imageUrl} alt='profile pic'/></div>
                <form onSubmit={handleSubmit(onSubmit)} className='formpost'>
                    <label htmlFor='title'><input {...register('title')} type="text" name="title" placeholder="Titre du sujet"/></label>
                    <label htmlFor='content'><textarea {...register('content')} type="text" name="content" placeholder="Ecrire un nouveau message"/></label>
                    <label htmlFor='imageUrl'>Image (jpg, png, jpeg, gif) :<input {...register('imageUrl')} type="file" name="imageUrl" /></label>
                    <input type="submit" value="Envoyer" className='boutonform'/>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;