import axios from 'axios';

const initialState={
    reply: {},
    replies: [{name: 'test'}]
};

const ALL_REPLIES = 'ALL_REPLIES';
const ADD_REPLY = 'ADD REPLY';
const EDIT_REPLY = 'EDIT_REPLY';
const DELETE_REPLY =  'DELETE_REPLY';

export function allReplies(user_id, post_id){
    return{
        type: ALL_REPLIES,
        payload: axios.get('https://radiant-stream-98137.herokuapp.com/reply', {user_id, post_id})
    }
}

export function reply(user_id, post_id, reply){
    return{
        type: ADD_REPLY,
        payload: axios.post( 'https://radiant-stream-98137.herokuapp.com/reply', {user_id, post_id, reply})
    }
}

export function editReply(reply_id){
    return{
        type: EDIT_REPLY,
        payload: axios.put(
            //api url,
            reply)
    }
}

export function deleteReply(reply_id){
    return{
        type: DELETE_REPLY,
        payload: axios.delete(
            //api url,
            reply)
    }
}

export default function replyReducer(state=initialState, action){
    console.log(action.type, action.payload)
    switch(action.type){
        case ALL_REPLIES + '_FULFILLED':
        return{...state, allReplies: action.payload.data};
        
        case ALL_REPLIES + '_REJECTED':
        return{...state, error: 'Unable to log in'};

        case ADD_REPLY + '_FULFILLED':
        return{...state, reply: action.payload.data};

        case ADD_REPLY + '_REJECTED':
        return{...state, error: 'invalid'}

        case EDIT_REPLY + '_FULFILLED':
        return{...state, reply: action.payload.data};

        case EDIT_REPLY + '_REJECTED':
        return{...state, error: 'invalid'}

        case DELETE_REPLY + '_FULFILLED':
        return{...state, reply: action.payload.data};

        case DELETE_REPLY + '_REJECTED':
        return{...state, error: 'no user'}

        default:
        return state;
    }
} 