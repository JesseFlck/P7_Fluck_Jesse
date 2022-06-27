import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT"

export const getPosts = (num) => {
    return async (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/posts`)
            .then((res) => {
                console.log(res)
                const array = res.data.data.slice(0, num);
                console.log(array)
                dispatch({ type: GET_POSTS, payload: array })
                dispatch({ type: GET_ALL_POSTS, payload: res.data });
            })
            .catch((err) => console.log(err))
    }
}

export const addPost = (data) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/posts`, data)

    }
}

export const updatePost = (id, message) => {
    return async (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/posts/${id}`,
            data: { message }
        })
            .then((res) => {
                console.log(res)
                dispatch({ type: UPDATE_POST, payload: { message, id } })
            })
            .catch((err) => console.log(err));
    }
}

export const deletePost = (postId) => {
    console.log(postId)
    return async (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/posts/` + postId,
        })
            .then((res) => {
                console.log(res)
                dispatch({ type: DELETE_POST, payload: { postId } })
            })
            .catch((err) => console.log(err));
    }
}

export const addComment = (postId, userId, message) => {
    return async (dispatch) => {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/comment/`,
            data: { postId, userId, message }
        })
            .then((res) => {
                console.log(res)
                dispatch({ type: ADD_COMMENT, payload: { postId, userId, message } })
            })
            .catch((err) => console.log(err));
    }
}

export const editComment = (id, message) => {
    return async (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
            data: { id, message }
        })
            .then((res) => {
                console.log(res)
                dispatch({ type: EDIT_COMMENT, payload: { id, message } })
            })
            .catch((err) => console.log(err));
    }
}

export const deleteComment = (id) => {
    return async (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
            data: { id }
        })
            .then((res) => {
                console.log(res)
                dispatch({ type: DELETE_COMMENT, payload: { id } })
            })
            .catch((err) => console.log(err));
    }
}