import axios from 'axios';

const initialState={
    post: {},
    posts: [{}]
};

const ALL_POSTS = 'ALL_POSTS';
const USER_POSTS = 'USER_POSTS;'
const ADD_POST = 'ADD POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST =  'DELETE_POST';

export function userPosts(user_id){
    return{
        type: USER_POSTS,
        payload: axios.get( 'https://radiant-stream-98137.herokuapp.com/post/getUserPosts/'+user_id, userPosts)
    }
}

export function allPosts(){
    return{
        type: ALL_POSTS,
        payload: axios.get('https://radiant-stream-98137.herokuapp.com/post/getAllPosts', allPosts)
    }
}

export function post(user_id, post){
    return{
        type: ADD_POST,
        payload: axios.post( 'https://radiant-stream-98137.herokuapp.com/post/addPost', {user_id, post})
    }
}

export function editPost(post_id){
    return{
        type: EDIT_POST,
        payload: axios.put(
            //api url,
            post)
    }
}

export function deletePost(post_id){
    return{
        type: DELETE_POST,
        payload: axios.delete(
            //api url,
            post)
    }
}

export default function postReducer(state=initialState, action){
    console.log(action.type, action.payload)
    switch(action.type){
        case ALL_POSTS + '_FULFILLED':
        return{...state, allPosts: action.payload.data};
        
        case ALL_POSTS + '_REJECTED':
        return{...state, error: 'Unable to log in'};

        case ADD_POST + '_FULFILLED':
        return{...state, post: action.payload.data};

        case ADD_POST + '_REJECTED':
        return{...state, error: 'invalid'}

        case EDIT_POST + '_FULFILLED':
        return{...state, post: action.payload.data};

        case EDIT_POST + '_REJECTED':
        return{...state, error: 'invalid'}

        case DELETE_POST + '_FULFILLED':
        return{...state, post: action.payload.data};

        case DELETE_POST + '_REJECTED':
        return{...state, error: 'no user'}

        default:
        return state;
    }
} 