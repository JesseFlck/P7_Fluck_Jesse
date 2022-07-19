import React from 'react';
import axios from "axios"
const token = localStorage.getItem('token');
const parseToken = JSON.parse(token);

const getUser = axios.get("http://localhost:3001/api/auth/user/" + parseToken.userId, {
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${parseToken.token}`
    }
})

const UserContext = React.createContext({
  firstName: getUser.firstName,
  lastName: getUser.lastName,
  email: getUser.email,
  password: getUser.password,
  imageUrl: getUser.imageUrl
});

export default UserContext;