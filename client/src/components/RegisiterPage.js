import React from 'react';
import makeAxios from './axios-config';

import '../App.css';

class RegisterPage extends React.Component {
    state = {
        username: '',
        password: '',
        error:'',
    };

    register = e => {
        e.preventDefault();
        const user = { username: this.state.username, password: this.state.password };

        makeAxios()
            .post('register', user)
            .then( res => { console.log(res);this.setState({ error: '', userId: res.data.id })})
            .catch( err => this.setState({ error: err }));
    }

    handleInput = e => {
        this.setState({ [e.target.name] : e.target.value });

        if( e.target.name === 'username' && e.target.value.length < 3){
            this.setState({ usernameError: true })
        } else {
            this.setState({ usernameError: false });
        }

        if( e.target.name === 'password' && e.target.value.length < 8){
            this.setState({ passwordError: true })
        } else {
            this.setState({ passwordError: false });
        }
    }

    componentDidUpdate(){
        if(this.state.userId){
            this.props.history.push('/')
        } 
    }

    render(){
        return(
            <div className="register-wrapper">
                <h1>Register</h1>
                <form onSubmit={this.register}>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput}/>
                    <p className={`warning ${this.state.usernameError ? "error-message" : null }`}>The username must be at least 3 characters long</p>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInput}/>
                    <p className={`warning ${this.state.passwordError ? "error-message" : null }`}>The Password must be at least 8 characters long</p>
                    <button>Register</button>
                </form>
                <div className={`warning ${this.state.error ? 'error' : null }`}>{this.state.error ? `${this.state.error}`: null}</div>
            </div>
        );
    }
}

export default RegisterPage;