import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "./ducks/userReducer";
import styled from "styled-components";
import Button from '@material-ui/core/Button';

const Register = props => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        age: 0,
        gender: "",
        about_me: "",
        is_doc: false,
        practice: "",
        field: "",
        years: 0,
        license: ""
    });

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleRegister = e => {
        e.preventDefault();
        props.register(
            inputs.email,
            inputs.name,
            inputs.password,
            inputs.about_me,
            inputs.is_doc,
            inputs.practice,
            inputs.field,
            inputs.years,
            inputs.license
        );
        props.closeModal();
        props.toggleRefresh();
    };

    return (
        <RegisterStyle>
            <form onSubmit={handleRegister}>
                Register User
                <p> Email</p>
                <input name="email" onChange={onChange} />
                <p>Name</p>
                <input name="name" onChange={onChange} />
                <p>Password</p>
                <input name="password" onChange={onChange} />
                <p>About Me</p>
                <textarea name="about_me" onChange={onChange} />
                <p>Doctor?</p>
                <select onChange={onChange}>
                    <option value="false"> No</option>
                    <option value="true"> Yes</option>
                </select>
                <p>Practice</p>
                <input name="practice" onChange={onChange} />
                <p>Medical Field</p>
                <input name="field" onChange={onChange} />
                <p>Years</p>
                <input name="years" onChange={onChange} />
                <p>license</p>
                <input name="license" onChange={onChange} />
                <Button variant='contained' style={{cursor: 'pointer'}} onClick={handleRegister}>Submit</Button>
            </form>
        </RegisterStyle>
    );
};

const mapStateToProps = state => state;

export default connect (mapStateToProps, {register})(Register);

const RegisterStyle = styled.form`
    display: flex;
    justify-content: center;
    align-items: row;
`;