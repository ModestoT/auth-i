import React from 'react';
import makeAxios from './axios-config';

class UsersList extends React.Component {
    state = {
        users: []
    };

    componentDidMount(){
        makeAxios()
            .get('/restricted/users')
            .then( res => this.setState({ users: res.data }))
            .catch( err => {console.log(err); this.props.history.push('/');});
    }

    render() {
        return(
            <div className="users-list-wrapper">
                {this.state.users.map( user => {
                    return (
                        <div className="user-wrapper" key={user.id}>
                            <h2>Username: {user.username}</h2>
                            <p>Password: {user.password}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default UsersList;