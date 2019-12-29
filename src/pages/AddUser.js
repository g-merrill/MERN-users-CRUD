import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ErrorMsg from '../components/ErrorMsg';

class AddUser extends Component {
  state = {
    invalidForm: true,
    formData: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.formData.password !== this.state.formData.passwordConfirm) return;
    let newUser = {...this.state.formData};
    delete newUser.passwordConfirm;
    this.props.handleAddUser(newUser);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  componentWillUnmount() {
    this.props.clearAddUserError();
  }

  render() {
    return (
      <>
        <h1>Add User</h1>
        <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email (required)</label>
            <input
              className="form-control"
              name="email"
              type="email"
              value={this.state.formData.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password (required)</label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={this.state.formData.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password (required)</label>
            <input
              className="form-control"
              name="passwordConfirm"
              type="password"
              value={this.state.formData.passwordConfirm}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              name="firstName"
              value={this.state.formData.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              name="lastName"
              value={this.state.formData.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              name="username"
              value={this.state.formData.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn"
              disabled={this.state.invalidForm}
            >
              ADD USER
            </button>
            <Link to='/users'>CANCEL</Link>
            {this.props.addUserError && 
            <ErrorMsg message={this.props.addUserError} />
            }
          </div>
        </form>
      </>
    );
  }
}

export default AddUser;