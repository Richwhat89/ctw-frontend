import axios from 'axios';

const initialState={
    user: {},
    doctor: {}
};

const LOGIN = 'LOGIN';
const ADD_USER = 'ADD_USER';
const UPDATE = 'UPDATE';
const GET_USER =  'GET_USER';

export function login(email, password){
    return{
        type: LOGIN,
        payload: axios.post( 'https://radiant-stream-98137.herokuapp.com/signin', {email, password})
    }
}

export function register(
    name, 
    password, 
    email, 
    about_me,
    doctor,
    practice,
    field,
    years, 
    license){
    return{
        type: ADD_USER,
        payload: axios.post( 'https://radiant-stream-98137.herokuapp.com/register', {name, password, email, about_me, doctor, practice, field, years, license})
    }
}

export function edit(username, password, email, about_me){
    return{
        type: UPDATE,
        payload: axios.put({username, password, email, about_me})
    }
}

export function getUser(user_id){
    return{
        type: GET_USER,
        payload: axios.get(`https://radiant-stream-98137.herokuapp.com/users/${user_id}`, getUser)
    }
}

export default function userReducer(state=initialState, action){
    console.log(action.type, action.payload)
    switch(action.type){
        case LOGIN + '_FULFILLED':
        return{...state, user: action.payload.data};
        
        case LOGIN + '_REJECTED':
        return{...state, error: 'Unable to log in'};

        case ADD_USER + '_FULFILLED':
        return{...state, user: action.payload.data};

        case ADD_USER + '_REJECTED':
        return{...state, error: 'invalid'}

        case UPDATE + '_FULFILLED':
        return{...state, user: action.payload.data};

        case UPDATE + '_REJECTED':
        return{...state, error: 'invalid'}

        case GET_USER + '_FULFILLED':
        return{...state, user: action.payload.data};

        case GET_USER + '_REJECTED':
        return{...state, error: 'no user'}

        default:
        return state;
    }
} 