import React, {Component} from 'react';
import './css/App.scss';
import {Route, NavLink, Redirect} from 'react-router-dom';
// The following imports all named exports attached to userAPI
import * as userAPI from '../services/users-api';
import UserList from './UserList';
import AddUser from './AddUser';
import EditUser from './EditUser';

class App extends Component {
  state = {
    users: [],
    errorMessages: {
      addUserError: '',
      editUserError: ''
    }
  };

  handleAddUser = async newUserData => {
    try {      
      const newUser = await userAPI.create(newUserData);
      this.setState(state => ({
        users: [...state.users, newUser],
        errorMessages: {...state.errorMessages, addUserError: ''}
      }),
      () => this.props.history.push('/users'));
    } catch (error) {
      const errorMessages = {
        ...this.state.errorMessages, 
        addUserError: error.message
      };
      this.setState({ errorMessages });
    }
  }

  clearAddUserError = () => {
    const errorMessages = {
      ...this.state.errorMessages, 
      addUserError: ''
    };
    this.setState({ errorMessages });
  }

  handleUpdateUser = async updatedUserData => {
    try {
      const updatedUser = await userAPI.update(updatedUserData);
      const newUsersArray = this.state.users.map(u => 
        u.id === updatedUser.id ? updatedUser : u
      );
      this.setState({ 
          users: newUsersArray,
          errorMessages: {
            ...this.state.errorMessages, 
            editUserError: ''
          }
        },
        () => this.props.history.push('/users')
      );
    } catch (error) {
      const errorMessages = {
        ...this.state.errorMessages, 
        editUserError: error.message
      };
      this.setState({ errorMessages });
    }
  }

  clearEditUserError = () => {
    const errorMessages = {
      ...this.state.errorMessages, 
      editUserError: ''
    };
    this.setState({ errorMessages });
  }

  handleDeleteUser= async id => {
    await userAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      users: state.users.filter(u => u.id !== id)
    }), () => this.props.history.push('/users'));
  }

  /*--- Lifecycle Methods ---*/

  async componentDidMount() {
    const users = await userAPI.getAll();
    this.setState({ users });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          React Users CRUD
          <nav>
            <NavLink exact to='/users'>USERS LIST</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to='/user/add'>ADD USER</NavLink>
          </nav>
        </header>
        <main>
          <Route exact path='/' render={() => 
            <Redirect to='/users' />
          }/>
          <Route exact path='/users' render={() => 
            <UserList
              users={this.state.users}
              handleDeleteUser={this.handleDeleteUser}
            />
          } />
          <Route exact path='/user/add' render={() => 
            <AddUser
              handleAddUser={this.handleAddUser}
              clearAddUserError={this.clearAddUserError}
              addUserError={this.state.errorMessages.addUserError}
            />
          } />
          <Route exact path='/user/edit' render={({location}) => 
            <EditUser
              location={location}
              handleUpdateUser={this.handleUpdateUser}
              clearEditUserError={this.clearEditUserError}
              editUserError={this.state.errorMessages.editUserError}
            />
          } />
        </main>
      </div>
    );
  }
}

export default App;
