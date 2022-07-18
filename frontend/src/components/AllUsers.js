import { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'
import '../styles/index.scss'
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);


// Affichage de l'ensemble des utilisateurs
const UsersCard = () => {
    const navigate = useNavigate();



    const [user, setUser] = useState([]);

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


const iconDeleteUser = <FontAwesomeIcon icon={faUserSlash} />

            
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
                                    <div className="iconDelete" onClick={() => 
                            
                                        axios.delete("http://localhost:3001/api/auth/delete/" + element._id, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                                authorization: `Bearer ${parseToken.token}`
                                            }
                                        })
                                            .then(() =>
                                                alert('Le compte a bien été supprimé !'),
                                                navigate("/membres")
                                            )
                                    }>{iconDeleteUser} Supprimer le compte</div>
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