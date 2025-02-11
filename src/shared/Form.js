import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";

class Form extends Component {
  constructor(props) {
    super(props);

    this.email = createRef();
    this.password = createRef();
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSuccess() {
    this.resetForm();
    this.props.onSuccess && this.props.onSuccess();
    toast.success("You have been succesfully registered. Please login.");
  }

  handleErrors(reason) {
    this.props.onError && this.props.onError(reason);
    toast.error("Something went wrong, please try again.");
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      email,
      password,
      props: { action }
    } = this;

    auth
      .userSession(action, email.current.value, password.current.value)
      .then(this.handleSuccess)
      .catch(this.handleErrors);
  }

  resetForm() {
    if (!this.email.current || !this.password.current) {
      return;
    }
    const { email, password } = Form.defaultProps;
    this.email.current.value = email;
    this.password.current.value = password;
  }

  render() {
    return (
      <form
        className="col-6 mx-auto justify-content-center"
        onSubmit={this.handleSubmit}
      >
        <h1>{this.props.title}</h1>
        <input
          name="name"
          type="email"
          placeholder="Email"
          ref={this.email}
          className="form-control my-sm-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="none"
          ref={this.password}
          className="form-control my-sm-2"
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

Form.defaultProps = {
  errors: "",
  email: "",
  password: ""
};

export default Form;
