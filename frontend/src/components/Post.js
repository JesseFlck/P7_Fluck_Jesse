import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'
//import { DayJS } from 'dayjs';
import dateFormat from "dateformat"
//import timePassed from '../utils/utils'
//import { useForm } from "react-hook-form"
import '../styles/index.scss'
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);


// Affiche l'ensemble des posts, la possibilité d'ajouter ou retirer un like
// et si l'utilisateur possède les droits, la modification ou la suppression d'un post
const Post = () => {
    const navigate = useNavigate();
    //const { register, handleSubmit } = useForm()
    //const [error, setError] = useState()



    const [post, setPost] = useState([]);
    const [user, setUser] = useState({});
    const [isDelete, setIsDelete] = useState(false);
    //const [comment, setComment] = useState({})

    // Récupération de tous les posts
    function getposts() {
        axios.get("http://localhost:3001/api/posts/", {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
            .then(({ data }) => {
                setPost(data)
            })
    }

    // modification d'un post
    const updatePost = (postid) => {
        axios.put("http://localhost:3001/api/posts/" + postid, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
            .then(() =>
                navigate("/modifierpost")
            )
    }

    // Mise en place de la suppression des posts
    const deletePost = (postid) => {
        axios.delete(`http://localhost:3001/api/posts/${postid}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
            .then(() =>
            getposts())
            alert('Le post a bien été supprimé !')
    }

    // Gestion des likes d'un post
    
    const liked = (postid) => {
        axios.post(`http://localhost:3001/api/posts/${postid}/like/`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
            .then(() => {
                getposts()
            })
            .catch(err => {
                console.log(err);
            })
    }


    // Mise en place de la modification des commentaires
    /*const editComment = (commentid) => {
        axios.put('http://localhost:3001/api/comment/update/' + commentid)
            .then(() =>
                getposts())
    }*/

    // Mise en place de la suppression des commentaires
    /*const deleteComment = (commentid) => {
        axios.delete("http://localhost:3001/api/comment/delete/" + commentid)
            .then(() =>
                getposts())
    }*/


    useEffect(() => {
        if (!window.localStorage.token) {
            navigate('/')
        }
        getposts();

        // Récupération des informations de l'utilisateur
        axios.get("http://localhost:3001/api/auth/allusers/", {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
            .then(({ data }) => {
                setUser(data)
            })


        /*const getComm = (postid) => {
            axios.get("http://localhost:3001/api/comment/all")
            .then(({ data }) => {
                setComment(data)
            })
        }*/
        }, [])

        /*const onSubmit = (data) => {
            const formdata = new FormData()
            //formdata.append('userId', parseToken.id);
            formdata.append("content", data.content)
            axios.post("http://localhost:3001/api/comment/reply", formdata)
                .then((res) => {
                    navigate("/");
                })
                .catch((error) => {
                    setError(error.response.data.error)
                })
            }*/
        
            
        
            const[iconState, setIconState] = useState(false);

            const iconFunction = () => {
                setIconState(!iconState)
            }

            
            return (
                <>
            <div className="post" key={post.id}>
                {post.map(element => {
                    const date = dateFormat(element.date, "dd/mm/yyyy") + ' à ' + dateFormat(element.date, "HH:MM");
                    const like = <FontAwesomeIcon icon={faThumbsUp} />
                    const del = <FontAwesomeIcon icon={faTrash} />
                    const edit = <FontAwesomeIcon icon={faEdit} />
                    if(element.userId === parseToken.userId || user.isAdmin){
                        return(
                        <div className="icons">
                                        <span className="centerIcon">
                                            <Link aria-label="Modifier" to={`/modifierpost`} state={{ element }}><div>{edit}</div></Link>
                                        </span>
                                        <span className="centerIcon">
                                            <div className="iconDelete" id={element._id} onClick={() => setIsDelete(!isDelete) + deletePost(element._id)}>{del}</div>
                                        </span>
                                    </div>
                )}
                    return (
                        <div className="postBody" key={`post-${element._id}`}>
                            <div className='posterImg'>
                                <img src={element.userId.imageUrl} alt='profile pic'/>
                            </div>
                            {element.userId === parseToken.userId && (
                            <div className="icons">
                                <span className="centerIcon">
                                    <Link aria-label="Modifier" to={`/modifierpost`} state={{ element }}><div>{edit}</div></Link>
                                </span>
                                <span className="centerIcon">
                                    <div className="iconDelete" id={element._id} onClick={() => setIsDelete(!isDelete) + deletePost(element._id)}>{del}</div>
                                </span>
                            </div>
                            )}
                            <div className="postInfos">
                                <div className='postUser'>{element.userId.firstName} {element.userId.lastName}</div>
                                <div className='postDate'>{date}</div>
                            </div>
                            <div className='postTitle'>
                                {element.title ? <h2>{element.title}</h2> : null}
                            </div>
                            <div className='postContent'>
                                {element.content}
                            </div>
                            <div className="imgPost">
                                <img src={element.imageUrl} alt="" />
                            </div>
                                <div className="like" onClick={() => liked(element._id)}>{like} {element.usersLiked.length}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default Post;