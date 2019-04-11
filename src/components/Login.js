import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "./ducks/userReducer";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Login = props => {
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        props.login(inputs.email, inputs.password);
        props.closeModal();
        // props.toggleRefresh();
    };

    return (
        <div>
            <LoginFormat>
                <>
                <p>email</p>
                <input name="email" onChange={onChange} />
                </>
                <>
                <p>Password</p>
                <input name="password" type="password" onChange={onChange} />
                </>
            </LoginFormat>
            <SignIn>
                <Link to='/Feed'>
                    <Button variant='contained' style={{cursor: 'pointer'}} onClick={handleLogin}>Sign In</Button>
                </Link>
            </SignIn>
        </div>
    );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, {login})(Login);

const Logo = styled.img`
    display: flex;
    justify-content: flex-end; 
    height: 4em;
    width: 100%;
`;

const SignIn = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 2em; 
`;

const LoginFormat = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-weight: bold;

    input{
        width: 50%;
    }
`;
