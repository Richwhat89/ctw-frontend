import React from 'react';
import styled from 'styled-components';

const Home = () => {
    return(
        <HomeStyle>

        </HomeStyle>
    )
};

export default Home;

const HomeStyle = styled.div`
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
    `