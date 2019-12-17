import React, {Component} from 'react';
import './css/App.scss';
import {Route, NavLink} from 'react-router-dom';
// The following imports all named exports attached to userAPI
import * as userAPI from '../services/users-api';
import UserList from './UserList';
import AddUser from './AddUser';
import EditUser from './EditUser';

class App extends Component {
  state = {
    users: []
  };

  handleAddUser = async newUserData => {
    const newUser = await userAPI.create(newUserData);
    this.setState(state => ({
      users: [...state.users, newUser]
    }), () => this.props.history.push('/'));
  }

  handleUpdateUser = async updatedUserData => {
    const updatedUser = await userAPI.update(updatedUserData);
    const newUsersArray = this.state.users.map(u => 
      u._id === updatedUser._id ? updatedUser : u
    );
    this.setState(
      {users: newUsersArray},
      // Using cb to wait for state to update before rerouting
      () => this.props.history.push('/')
    );
  }

  handleDeleteUser= async id => {
    await userAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      users: state.users.filter(u => u._id !== id)
    }), () => this.props.history.push('/'));
  }

  /*--- Lifecycle Methods ---*/

  async componentDidMount() {
    const users = await userAPI.getAll();
    this.setState({users});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          React Users CRUD
          <nav>
            <NavLink exact to='/'>USERS LIST</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to='/add'>ADD USER</NavLink>
          </nav>
        </header>
        <main>
          <Route exact path='/' render={({history}) => 
            <UserList
              users={this.state.users}
              handleDeleteUser={this.handleDeleteUser}
            />
          } />
          <Route exact path='/add' render={() => 
            <AddUser
              handleAddUser = {this.handleAddUser}
            />
          } />
          <Route exact path='/edit' render={({history, location}) => 
            <EditUser
              handleUpdateUser={this.handleUpdateUser}
              location={location}
            />
          } />
        </main>
      </div>
    );
  }
}

export default App;
