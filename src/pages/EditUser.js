import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ErrorMsg from '../components/ErrorMsg';

class EditUser extends Component {
  state = {
    invalidForm: false,
    formData: {
      ...this.props.location.state.user,
      password: '',
      passwordConfirm: ''
    }
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.formData.password !== this.state.formData.passwordConfirm) return;
    let updatedUser = {...this.state.formData};
    delete updatedUser.passwordConfirm;
    this.props.handleUpdateUser(updatedUser);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  componentWillUnmount() {
    this.props.clearEditUserError();
  }

  render() {
    return (
      <>
        <h1>Edit User</h1>
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
              value={this.state.formData.firstName || ''}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              name="lastName"
              value={this.state.formData.lastName || ''}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              name="username"
              value={this.state.formData.username || ''}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-xs"
            disabled={this.state.invalidForm}
          >
            SAVE USER
          </button>&nbsp;&nbsp;
          <Link to='/users'>CANCEL</Link>
          {this.props.editUserError && 
          <ErrorMsg message={this.props.editUserError} />
          }
        </form>
      </>
    );
  }
}

export default EditUser;