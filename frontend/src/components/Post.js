import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import dateFormat from "dateformat"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import '../styles/index.scss'


// Affiche l'ensemble des posts, la possibilité d'ajouter ou retirer un like
// et si l'utilisateur possède les droits, la modification ou la suppression d'un post
const Post = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()



    const [post, setPost] = useState([]);
    const [user, setUser] = useState({});
    const [comment, setComment] = useState({})

    // Récupération de tous les posts
    function getposts() {
        axios.get("http://localhost:3001/api/posts/")
            .then(({ data }) => {
                setPost(data)
            })
    }

    // modification d'un post
    const updatePost = (postid) => {
        axios.put("http://localhost:3001/api/posts/" + postid)
            .then(() =>
                navigate("/modifierpost")
            )
    }

    // Mise en place de la suppression des posts
    const deletePost = (postid) => {
        axios.delete("http://localhost:3001/api/posts/" + postid)
            .then(() =>
                getposts())
    }

    // Gestion des likes d'un post
    
    const liked = (postid) => {
        axios.post(`http://localhost:3001/api/posts/${postid}/like/`)
            .then(() => {
                getposts()
            })
            .catch(err => {
                console.log(err);
            })
    }


    // Mise en place de la modification des commentaires
    const editComment = (commentid) => {
        axios.put('http://localhost:3001/api/comment/update/' + commentid)
            .then(() =>
                getposts())
    }

    // Mise en place de la suppression des commentaires
    const deleteComment = (commentid) => {
        axios.delete("http://localhost:3001/api/comment/delete/" + commentid)
            .then(() =>
                getposts())
    }


    useEffect(() => {
        if (!window.localStorage.token) {
            navigate('/')
        }
        getposts();

        // Récupération des informations de l'utilisateur
        axios.get("http://localhost:3001/api/auth/allusers/")
            .then(({ data }) => {
                setUser(data)
            })


        const getComm = (postid) => {
            axios.get("http://localhost:3001/api/comment/" + postid)
            .then(({ data }) => {
                setComment(data)
            })
        }
        }, [])

        const onSubmit = (data) => {
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
            }
        

    return (
        <>
            <div className="post">
                {post.map(element => {
                    const date = dateFormat(element.date, "dd/mm/yyyy") + ' à ' + dateFormat(element.date, "HH:MM");
                    const like = <FontAwesomeIcon icon={faThumbsUp} />
                    const del = <FontAwesomeIcon icon={faTrash} />
                    const edit = <FontAwesomeIcon icon={faEdit} />
                    return (
                        <div className="postBody" key={`post-${element._id}`}>
                            <div className='posterImg'>
                                <img src="https://zupimages.net/up/22/22/e3uh.jpg" alt='profile pic'/>
                            </div>
                            <div className="icons">
                                <span className="centerIcon">
                                    <Link aria-label="Modifier" to={`/modifierpost`} state={{ element }}><div>{edit}</div></Link>
                                </span>
                                <span className="centerIcon">
                                    <div className="iconDelete" onClick={() => deletePost(element._id)}>{del}</div>
                                </span>
                            </div>
                            <div className="postInfos">
                                <div className='postUser'>{element.userId}</div>
                                <div className='postDate'>{date}</div>
                            </div>
                            <div className='postTitle'>
                                {element.title ? <h2>{element.title}</h2> : null}
                            </div>
                            <div className='postContent'>
                                {element.content}
                            </div>
                            {element.urlImage ? <div>
                                <img src={element.imageUrl} alt="" />
                            </div> : null}
                                <div className="like" onClick={() => liked(element._id)}>{like} {element.usersLiked.length}</div>
                            <div className='postComments'>
                                
                                <form onSubmit={handleSubmit(onSubmit)} className="newComment">
                                    <label><input {...register('content')} type="text" name="content" placeholder="Ecrire un commentaire"/></label>
                                    <input type="submit" value="Envoyer" className='boutoncomm'/>
                                </form>
                                <div className='commentBloc'>
                                <div className="icons">
                                    <span className="centerIcon">
                                        <div className="iconUpdate" onClick={() => editComment(comment._id)}>{edit}</div>
                                    </span>
                                    <span className="centerIcon">
                                        <div className="iconDelete" onClick={() => deleteComment(comment._id)}>{del}</div>
                                    </span>
                                </div>
                                    <div className='userImg'><img src='https://zupimages.net/up/20/52/sf2z.png' alt='profile pic'/></div>
                                    <div className='commentCorpse'>
                                        <div className='commentUser'>
                                            James Durand
                                        </div>
                                        <div className='commentContent'>
                                            <p>{comment.content}</p>
                                        </div>
                                        <div className='commentDate'>
                                            10 juin 2022, 15:12
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default Post;