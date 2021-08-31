import React from 'react';
import {useHistory} from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/images/logo.png';
import { useLoginValidation } from '../hooks/use-validation';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const LoginPage = () => {
    
    const history = useHistory();

    const { 
        enteredValue: enteredEmail,
        inputIsValid: emailInputIsValid,
        inputIsEmpty: emailInputIsEmpty,
        inputIsInvalid: emailInputIsInvalid,
        changeInputValueHandler: changeEmailInputValueHandler,
        blurInputHandler: blurEmailInputHandler,
    } = useLoginValidation( value => (/\w+(\.|-|_)?\w+@\w+\.\w{2,3}/.test(value)), value => value.trim() === "" );

    const {
        enteredValue: enteredPassword,
        inputIsValid: passwordInputIsValid,
        inputIsEmpty: passwordInputIsEmpty,
        inputIsInvalid: passwordInputIsInvalid,
        changeInputValueHandler: changePasswordInputValueHandler,
        blurInputHandler: blurPasswordInputHandler,
    } = useLoginValidation( value => value.trim().length >= 8, value => value.trim() === "" );

    const loginFormIsValid = emailInputIsValid && passwordInputIsValid;

    const submitLoginHandler = (event) => {
        event.preventDefault();
        if(!loginFormIsValid) {
            return;
        }
        axios.post(
            `${process.env.REACT_APP_API_URL}/auth/login`,
            {
                email: enteredEmail,
                password: enteredPassword
            }
        ).then((res) => {
            const token = res.data.token;
            const user = jwtDecode(token);
            localStorage.setItem('token', token);
            console.log(user);
            history.push('/admin/dashboard');
        }).catch((err) => {
            console.log(err);
        });
    };
    
    return (
        <>
            <div className="backdrop"></div>
            <div className="login-box">
                <div className="content">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <form action="#" onSubmit={submitLoginHandler} className="login-form">
                        <div className={ `email-div ${ (emailInputIsInvalid || emailInputIsEmpty) ? "invalid" : emailInputIsValid ? "valid" : "" }` }>
                            <input 
                                type="email" 
                                name="" 
                                placeholder="Enter email" 
                                value={enteredEmail} 
                                onChange={changeEmailInputValueHandler} 
                                onBlur={blurEmailInputHandler} 
                            />
                        </div>
                        {
                            emailInputIsInvalid && <p className="invalid-message">Invalid e-mail</p>
                        }
                        {
                            emailInputIsEmpty && <p className="invalid-message">This field must be filled in!</p>
                        }
                        <div className={ `password-div ${ (passwordInputIsInvalid || passwordInputIsEmpty) ? "invalid" : passwordInputIsValid ? "valid" : "" }` }>
                            <input 
                                type="password" 
                                name="" 
                                placeholder="Password" 
                                value={enteredPassword} 
                                onChange={changePasswordInputValueHandler} 
                                onBlur={blurPasswordInputHandler} 
                            />
                        </div>
                        {
                            passwordInputIsInvalid && <p className="invalid-message">Password must be at least 8 characters</p>
                        }
                        {
                            passwordInputIsEmpty && <p className="invalid-message">This field must be filled in!</p>
                        }
                        <button type="submit" className="button">Log In</button>
                    </form>
                </div>
                <div className="footer">
                    <p>© 2021 - Blaze</p>
                    <p>By Meccainfotech</p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;