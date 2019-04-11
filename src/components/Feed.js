import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { allPosts, post, editPost, deletePost } from "./ducks/postReducer";
import { allReplies, reply} from './ducks/replyReducer';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const styles = theme => ({
    modalWrapper: {
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    }
});

const Feed = props => {
    const [inputs, setInputs]= useState({post: ""});
    const [modal, setModal]= useState(false);

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handlePost = e => {
        e.preventDefault();
        props.post(
            props.userReducer.user_id,
            inputs.post
        );
    };

    const handleReply = e => {
        e.preventDefault();
        props.reply(
            inputs.reply
        );
    };

    const showReplies = user_id => {
        props.allReplies(user_id);
        setModal(true)    
    }

    const closeReplies = () => {
        setModal(false)
    };

    useEffect(()=>{
        props.allPosts();
    }, []);

    let postMap = [];
    if (props.postReducer.posts){
        postMap = props.postReducer.posts.map((e,i)=>{
            return(
                <h1 key={i} onClick={()=>showReplies(e.post_id)}>
                   {e.name}
                </h1>
            );
        });
    }

    console.log(props.postReducer)
    console.log(props.userReducer)
    return (
        <FeedStyle>
            <PostFormat>
                <>
                <p>Whats on your mind?</p>   
                 <textarea name="post" rows='5' cols='100' onChange={onChange} />
                </>
                <div>
                    <Button variant='contained' style={{cursor: 'pointer'}} onClick={handlePost}>Post</Button>
                </div>
            </PostFormat>
            <Modal 
                    className={props.classes.modalWrapper}
                    open={modal}
                    onClose={closeReplies}
                >
                
                <div>
                   {props.replyReducer.replies.map((e,i)=><h1>{e.name}</h1>)} 
                </div>
            </Modal>
            <FeedFormat>
                {postMap}
            </FeedFormat>
        </FeedStyle>
    );
}

const mapStateToProps = state => state;

export default connect (mapStateToProps, {post, allPosts, reply, allReplies})(withStyles(styles)(Feed));

const FeedStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: absolute;
    top: 0;
    z-index: -1;
    background: url('https://s3.us-east-2.amazonaws.com/personalproject89/peaceful.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const PostFormat = styled.div`
    margin: 5% 10% 2% 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    height: 20vh;
    width: 60vw;
`;

const FeedFormat = styled.div`
    height: 20vh;
    width: 80vw;
    z-index: 1000;
    background-color: rgba(192, 192, 192, 0.9);
    color: white;
    margin: auto;
    text-align: center;
`

const Text = styled.div`
    height: 15vh;
    width: 100%;
    margin-left: 13vw;
`