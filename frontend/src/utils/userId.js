import axios from "axios"
import { useState, useEffect } from "react"
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);



export default function UserId () {
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
}
