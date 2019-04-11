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
            props.userReducer.user.user_id,
            inputs.post
        );
    };

    const handleReply = (e) => {
        e.preventDefault();
        props.reply(
            inputs.reply,
            inputs.user_id,
            inputs.post_id
        );
        console.log(inputs.reply, inputs.user_id, inputs.post_id)
    };

    const showReplies = post_id => {
        props.allReplies(post_id); 
    }

    const closeReplies = () => {
    };

    useEffect(()=>{
        props.allPosts();
    }, []);

    useEffect(()=>{
        props.allReplies()
    }, []);

    let postMap = [];
    if (props.postReducer.allPosts) {
        postMap = props.postReducer.allPosts.map((e,i) => {
            let date = new Date(e.date)
            return (
            <div>
            <h1 key={i} onClick={showReplies()}>
                {e.name}<br></br>
                {`${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`}<br></br>
                {e.post}
            </h1>
            
                <PostFormat>
                <>
                    <p>What's your feedback?</p>   
                    <textarea name="reply" rows='5' cols='100' onChange={onChange} />
                </>
                    <div>
                        <Button variant='contained' style={{cursor: 'pointer'}} onClick={handleReply}>Reply</Button>
                    </div>
                    <div>
                        {replyMap} 
                    </div>
                </PostFormat>
            </div>
        )
        } 
        )
    }

    let replyMap = [];
    if (props.replyReducer.allReplies) {
        replyMap = props.replyReducer.allReplies.map((e,i) => {
            let date = new Date(e.date)
            return (
            <h1 key={i}>
                {e.name}<br></br>
                {`${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`}<br></br>
                {e.reply}
            </h1>)
        } 
        )
    }


    console.log(props)
    console.log(reply)
    console.log(props.replyReducer.allReplies)
    console.log(props.userReducer.user.user_id)
    console.log(postMap)
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
                   {replyMap} 
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
    height: 60vh;
    width: 80vw;
    background-color: rgba(192, 192, 192, 0.9);
    margin: auto;
    color: black;
    text-align: center;
    overflow: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    

    h1 {
        height: 15vh;
        width: 80vw;
        margin: auto;
        color: black;
        border: solid black
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`