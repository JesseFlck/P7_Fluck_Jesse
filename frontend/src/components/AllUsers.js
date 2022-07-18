import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'
//import { DayJS } from 'dayjs';
import dateFormat from "dateformat"
//import timePassed from '../utils/utils'
//import { useForm } from "react-hook-form"
import '../styles/index.scss'
import { parse } from "@fortawesome/fontawesome-svg-core";
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);


// Affiche l'ensemble des posts, la possibilité d'ajouter ou retirer un like
// et si l'utilisateur possède les droits, la modification ou la suppression d'un post
const UsersCard = () => {
    const navigate = useNavigate();
    //const { register, handleSubmit } = useForm()
    //const [error, setError] = useState()



    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    //const [comment, setComment] = useState({})

    // Récupération de tous les posts
    function getusers() {
        axios.get("http://localhost:3001/api/auth/allusers/", {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${parseToken.token}`
            }
        })
            .then(({ data }) => {
                setUser(data)
            })
    }


    getusers();
   

    useEffect(() => {
        if (!window.localStorage.token) {
            navigate('/')
        }

       
        }, [])


        const editUser = () => {
            navigate("/modifierprofil")
}

const deleteUser = () => {
    axios.delete("http://localhost:3001/api/auth/delete/" + parseToken.userId, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${parseToken.token}`
        }
    })
        .then(() =>
            alert('Votre compte a bien été supprimé !'),
            navigate("/connexion")
        )
}

const iconDeleteUser = <FontAwesomeIcon icon={faUserSlash} />
    const iconEditUser = <FontAwesomeIcon icon={faPen} />

        
            
            return (
                <>
            <div className="post" key={user.id}>
                {user.map(element => {
                    
                    return(
                        <div className="profileCardAllUsers"  key={`members-${element._id}`}>
                                <div className="userPic">
                                    <img src={element.imageUrl} alt='profile pic'/>
                                </div>
                            <div className="profileAllUsers">
                                <p><u>Prénom :</u> {element.firstName}</p>
                                <p><u>Nom :</u> {element.lastName}</p>
                                <p><u>Email :</u> {element.email} </p>
                            </div>
                            <div className="profileOptionsAllUsers">
                                <span className="centerIcon">
                                    <div className="iconEdit" onClick={() => editUser()}>{iconEditUser} Modifier l'utilisateur</div>
                                </span>
                                <span className="centerIcon">
                                    <div className="iconDelete" onClick={() => deleteUser()}>{iconDeleteUser} Supprimer le compte</div>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )

}


export default UsersCard;