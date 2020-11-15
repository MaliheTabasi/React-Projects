import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {},
    };

    schema = {
        password: Joi.string().required().label('Password'),
        username: Joi.string().required().label('Username'),
    };

    doSubmit = () => {
        //call server
    };

    render() {
        return (
            <div>
                <h1>Login Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default LoginForm;