import React, {Component} from 'react';

class AddUser extends Component {
  state = {
    invalidForm: true,
    formData: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddUser(this.state.formData);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

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
          <button
            type="submit"
            className="btn"
            disabled={this.state.invalidForm}
          >
            ADD USER
          </button>
        </form>
      </>
    );
  }
}

export default AddUser;