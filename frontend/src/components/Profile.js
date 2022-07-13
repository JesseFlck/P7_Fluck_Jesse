import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/index.scss"
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);





// Affiche les informations d'un utlisateur et permet la suppression du compte
const Profil = () => {

    const [user, setUser] = useState({});

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/api/auth/user/" + parseToken.userId)
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    const editUser = () => {
                navigate("/modifierprofil")
    }

    const deleteUser = () => {
        axios.delete("http://localhost:3001/api/auth/delete/" + parseToken.userId)
            .then(() =>
                alert('Votre compte a bien été supprimé !'),
                navigate("/connexion")
            )
    }

    const iconDeleteUser = <FontAwesomeIcon icon={faUserSlash} />
    const iconEditUser = <FontAwesomeIcon icon={faPen} />


    return (
        <>
            <div className="profile">
                <div className="userPic">
                    <img src={user.imageUrl} alt='profile pic'/>
                </div>
                <p><u>Prénom :</u> {user.firstName}</p>
                <p><u>Nom :</u> {user.lastName}</p>
                <p><u>Email :</u> {user.email} </p>
            </div>
            <div className="profileOptions">
                <span className="centerIcon">
                    <div className="iconEdit" onClick={() => editUser()}>{iconEditUser} Modifier mes informations</div>
                </span>
                <span className="centerIcon">
                    <div className="iconDelete" onClick={() => deleteUser()}>{iconDeleteUser} Supprimer mon compte</div>
                </span>
            </div>
        </>
    )


}

export default Profil;