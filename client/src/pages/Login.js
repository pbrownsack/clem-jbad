import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(245, 245, 245);

    h3 {
        font-size: 2rem;
        margin-bottom: 2rem;
        margin-top: -12rem;
    }
`;

const LoginPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    min-width: 400px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);

    form {
        display: flex;
        flex-direction: column;
        width: 100%;

        label {
            color: #5e5e5e;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            display: block;
            margin-bottom: 8px;
        }

        input {
            width: 100%;
            outline: none;
            border: none;
            background-color: rgb(245, 245, 245);
            border-radius: 8px;
            padding: 0.5rem;
            margin-bottom: 24px;
            transition: box-shadow 0.2s;

            &:focus {
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            }
        }

        button {
            color: #fff;
            background-color: #0f97d6;
            outline: none;
            border: none;
            padding: 12px 12px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            border-radius: 4px;
           
            &:hover {
                background-color: #1cabed;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            }
        }
    }
`;

const LoginPage = (props) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("clemuser")) {
            props.history.push("/");
        }
    }, [props.history])

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_REMOTE}/v1/users/login`, {
                username: user,
                password: password
            })

            if (response.data && response.data.error) {
                // Backend error
                console.log(response.data.error);
            } else if (response.data && response.data.user) {
                // User successfully logged in
                localStorage.setItem("clemuser", JSON.stringify(response.data.user));
                props.history.push("/");
            }
        } catch (err) {
            // Axios error
        }
    }

    const userChanged = e => {
        e.preventDefault();
        setUser(e.target.value);
    }

    const passwordChanged = e => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    return (
        <LoginContainer>
            <h3>Login to C.L.E.M.</h3>
            <LoginPanel>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="John Doe" value={user} onChange={userChanged} />
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" value={password} onChange={passwordChanged} />
                    <button>Login</button>
                </form>
            </LoginPanel>
        </LoginContainer>
    )
}

export default LoginPage;