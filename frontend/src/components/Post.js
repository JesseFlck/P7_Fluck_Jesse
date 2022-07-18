import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'
import '../styles/index.scss'
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);


// Affichage de l'ensemble des posts et options
const Post = () => {
    const navigate = useNavigate();



    const [post, setPost] = useState([]);
    const [user, setUser] = useState({});
    const [isDelete, setIsDelete] = useState(false);


    // récupération de l'utilisateur connecté
    const [userOnline, setUserOnline] = useState({});
        axios.get("http://localhost:3001/api/auth/user/" + parseToken.userId, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
        .then(({ data }) => {
            return(
            setUserOnline(data)
            )
        })


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
        console.log(parseToken.userId)
        console.log(post.userId)
        if(parseToken.userId === post.userId || user.isAdmin){
                navigate("/modifierpost")
            
        }else{
            alert('Vous n\'êtes pas autorisé à modifier ce post !')
        }
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
        console.log(postid)
        console.log(parseToken.userId)

        const infosLike = {
            postId: postid,
            userId: parseToken.userId
        }

        axios.post(`http://localhost:3001/api/posts/${postid}/like/`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            },
            body: JSON.stringify(infosLike)
        })
            .then(() => {
                getposts()
            })
            .catch(err => {
                console.log('bonjour', err);
            })
    }
            
            

    

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
        }, [])

        
            
        
            
            
            return (
                <>
            <div className="post" key={post.id}>
                {post.map(element => {
                    const like = <FontAwesomeIcon icon={faThumbsUp} />
                    const del = <FontAwesomeIcon icon={faTrash} />
                    const edit = <FontAwesomeIcon icon={faEdit} />
                    
                    return (
                        <div className="postBody" key={`post-${element._id}`}>
                            <div className='posterImg'>
                                <img src={element.userId.imageUrl} alt='profile pic'/>
                            </div>
                                {element.userId._id === parseToken.userId || userOnline.isAdmin ? <span>
                                    <div className="icons">
                                        <span className="centerIcon">
                                            <Link aria-label="Modifier" to={`/modifierpost`} state={{ element }}><div>{edit}</div></Link>
                                        </span>
                                        <span className="centerIcon">
                                            <div className="iconDelete" id={element._id} onClick={() => setIsDelete(!isDelete) + deletePost(element._id)}>{del}</div>
                                        </span>
                                    </div>
                                </span> : null}
                            <div className="postInfos">
                                <div className='postUser'>{element.userId.firstName} {element.userId.lastName}</div>
                                <div className='postDate'>{moment(element.createdAt).format('LLL')}</div>
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