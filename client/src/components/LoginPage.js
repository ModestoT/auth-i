import React from 'react';
import makeAxios from './axios-config';

class LoginPage extends React.Component {
    state = {
        username: '',
        password: ''
    };

    login = e => {
        e.preventDefault();
        const user = { username: this.state.username, password: this.state.password };

        makeAxios()
            .post('login', user)
            .then( res => console.log(res))
            .catch( err => console.log(err));
    }

    handleInput = e => {
        this.setState({ [e.target.name] : e.target.value });
    }

    render(){
        return(
            <div className="login-wrapper">
                <form>
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInput}/>
                    <input type="password" name="password" placeholder="Passowrd" value={this.state.password} onChange={this.handleInput}/>
                    <button onClick={this.login}>Login</button>
                    <button>Register</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;