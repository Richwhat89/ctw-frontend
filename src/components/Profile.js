import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "./ducks/userReducer";
import { allPosts } from './ducks/postReducer';
// import EditProfile from "./EditProfile";
import styled from 'styled-components';
// import Button from '@material-ui/core/Button';
// import Avatar from "@material-ui/core/Avatar";
// import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    modalWrapper: {
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    }
});

const Profile = props => {
    // const { classes } = props;
    // const [modal, setModal] = useState(false);

    useEffect(() => {
        if (props.userReducer.user.id) {
            props.allPosts(props.userReducer.user.user_id);
        }
    }, [])

    // const openEdit = () => {
    //     setModal(true);
    // };

    // const closeEdit = () => {
    //     setModal(false);
    //     setRefresh(true);
    // };

    return (
        <ProfilePage>
            <div className='fog' />
            <ProfileFormat>
                <NameStyle>
                    <h2>Display Name</h2>
                    <h1>{props.userReducer.user.name}</h1>
                </NameStyle>
                <UserInfo>
                    <IdFormat>
                        <h2>Email: </h2>
                        <p>{props.userReducer.user.email}</p>
                    </IdFormat>
                        <IdFormat>
                            <h2>About me: </h2>
                            <p>{props.userReducer.user.about_me}</p>
                        </IdFormat>
                    {props.userReducer.user.doctor === true && (
                        <IdFormat>
                            <h2>Practice: </h2>
                            <p>{props.userReducer.user.practice}</p>
                        </IdFormat>
                    )}
                    {props.userReducer.user.doctor === true && (
                        <IdFormat>
                            <h2>Medical Field: </h2>
                            <p>{props.userReducer.user.medical_field}</p>
                        </IdFormat>
                    )}
                    {props.userReducer.user.doctor === true && (
                        <IdFormat>
                            <h2>Years:: </h2>
                            <p>{props.userReducer.user.years}</p>
                        </IdFormat>
                    )}
                    {props.userReducer.user.doctor === true && (
                        <IdFormat>
                            <h2>License: </h2>
                            <p>{props.userReducer.user.license}</p>
                        </IdFormat>
                    )}
                    <IdFormat>
                        <h2>Total Posts: </h2>
                        <p>{props.postReducer.posts.length}</p>
                    </IdFormat>
                    {/* {!modal && <Button variant='contained' style={{ position: 'relative', bottom: '-2em', height: '12em', width: '7em'}}onClick={openEdit}>Edit</Button>}
                    {modal && (
                        <Modal
                            className={classes.modalWrapper}
                            open={modal}
                            onClose={closeEdit}
                        >
                            <EditProfile
                                email={props.user.email}
                                closeEdit={closeEdit}
                                display_name={props.user.display_name}
                                avatar={props.user.avatar}
                                blizzard={props.user.blizzard}
                                epic={props.user.epic}
                                ps4={props.user.ps4}
                                riot={props.user.riot}
                                steam={props.user.steam}
                                xbox={props.user.xbox}
                            />
                        </Modal>
                    )} */}
                </UserInfo>
            </ProfileFormat>
        </ProfilePage>
    );
};

Profile.propTypes = {
    classes: PropTypes.object.isRequired
};

export const mapStateToProps = (state) => state; 

export default connect (mapStateToProps, { getUser, allPosts })(withStyles(styles)(Profile));

const ProfilePage = styled.div`
    display: flex;
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

    .fog {
        position: absolute;
        background: rgba(250,250,250, 0.3);
        height: 100%;
        width: 100%;
        z-index: -1;
    }
`;

const IdFormat = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 15vw;
`;

const ProfileFormat = styled.div`
    position: relative;
    padding: 4em 0 0 5vw;
    height: 100%;
    width: 40%;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    height: 85vh;
    width: 20%;
`;

const NameStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 20em;
    align-items: space-between;
    justify-content: flex-end;
    float: left;
    top: 5em;
    left: 0;
    margin: 2em;

    h1 {
        margin-right: 2em;
    }

    .user_avatar {
        height: 10em;
        width: 10em;
    }
`;