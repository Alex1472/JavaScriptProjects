import { ADD_POST, FETCH_POSTS } from "./types";

export const fetchPosts = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(data => data.json())
    .then(data => dispatch({ 
        type: FETCH_POSTS,
        payload: data
    }));
}