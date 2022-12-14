// import { useState } from 'react';

import React from 'react';
import classes from './AuthForm.module.css';
import { Alert } from "react-bootstrap";
import AuthContext from '../../contexts/AuthContext';
import { Navigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import constants from '../../constants';

const CONSTANTS = require("../../constants");
const domainName_gw1 = "http://" + CONSTANTS.REACT_APP_GATEWAY1 + ":" + CONSTANTS.REACT_APP_GATEWAY1_PORT;
const webDomain = "http://" + CONSTANTS.DOMAIN + ":" + CONSTANTS.FE_PORT
const clientId = constants.CLIENT_ID

class SignUp extends React.Component{

    static contextType = AuthContext

    constructor(props){
        super(props)
        this.firstNameInp = React.createRef(null)
        this.lastNameInp = React.createRef(null)
        this.emailUserInp = React.createRef(null)
        this.passwordInp = React.createRef(null)
        this.context = AuthContext
        this.state = {
            error : null,
            success : null
        }
        this.props = props
    }

    formSubmitted(event){
        event.preventDefault()
        this.firstNameEntered = this.firstNameInp.current.value;
        this.lastNameEntered = this.lastNameInp.current.value;
        this.mailEntered = this.emailUserInp.current.value;
        this.passwordEntered = this.passwordInp.current.value;
        
        console.log(this.firstNameEntered);
        console.log(this.lastNameEntered)
        console.log(this.mailEntered);
        console.log(this.passwordEntered);

        fetch(
            domainName_gw1+"/signup",
            {
            method : "POST",
            body : JSON.stringify(
            {
                firstname: this.firstNameEntered,
                lastname: this.lastNameEntered,
                email: this.mailEntered,
                password: this.passwordEntered
            }),
            headers:
            {
                "Content-Type" : "application/json"
            }
          }).then(response => {
                if(response.ok){
                    response.json().then((data)=>{
                        this.setState({success:"Signup Successful"})
                        this.context.login(data)
                        // console.log(this.context)
                        // setTimeout(()=>{this.setState({isLoggedin:true})},2000)
                    })
                    // console.log(this.context)
                    // this.props.navigation.navigate('./', {replace:true})
                }else{
                    response.json().then((err)=>{
                        this.setState({error:err.msg})
                    })
                }
            });
    }

    onSuccess(res){
        // console.log(res.tokenId)
        fetch(
            domainName_gw1+"/auth/google",
            {
            method : "POST",
            mode: 'no-cors',
            body : JSON.stringify(
            {
                idToken: res.tokenId
            }),
            headers:
            {
                "Content-Type" : "application/json",
                "Origin" : webDomain
            }
          }).then(response => {
                if(response.ok){
                    response.json().then((data)=>{
                        this.setState({success:"Signup Successful"})
                        this.context.login(data)
                        // console.log(this.context)
                        // setTimeout(()=>{this.setState({isLoggedin:true})},2000)
                    })
                    // console.log(this.context)
                    // this.props.navigation.navigate('./', {replace:true})
                }else{
                    console.log(response)
                }
            });
    }

    onFailure(res){
        console.log(res.error)
    }

    render(){
        const switchAuthModeHandler = () =>{
            this.props.handleToUpdate(true);
        }
        if(this.context.isLoggedIn){
            return <Navigate to="/"/>
        }else{
            return (
                <section className={classes.auth}>
                <h1>Sign Up</h1>
                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                {this.state.success && <Alert variant='success'>{this.state.success}</Alert> }
                <form onSubmit = {this.formSubmitted.bind(this)}>
                    <div className={classes.control}>
                        <label htmlFor='name'>First Name</label>
                        <input type='text' id='name' required ref={this.firstNameInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='lname'>Last Name</label>
                        <input type='text' id='lname' required ref={this.lastNameInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' id='email' required ref={this.emailUserInp}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Your Password</label>
                        <input type='password' id='password' required ref={this.passwordInp}/>
                    </div>
                    <div className={classes.actions}>
                        <button>Create Account</button>
                        <button type='button'
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                        >Login with existing account
                        </button>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Google Sign Up"
                            onSuccess={this.onSuccess}
                            onFailure={this.onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </div>
                </form>
                </section>
            );
        }
    }
};

export default SignUp;
