import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import HeaderConnected from '../components/HeaderConnected'
import UsersCard from '../components/AllUsers'
import "../styles/index.scss"
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);





const AllUsers = () => {
    return (
        <div>
            <header className='connectedHeader'>
                <HeaderConnected />
            </header>
            <h1>Liste des membres</h1>
            <div id="members">
                <UsersCard />
            </div>
        </div>
    )


}

export default AllUsers;