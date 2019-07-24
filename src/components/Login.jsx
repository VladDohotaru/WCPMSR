import React, { Component } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = async event => {
    event.preventDefault();
    try {
      const res = await fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in please try again');
    };
  };

  render() {
    return (
    <MDBContainer>
      <MDBRow>
      <MDBCol md="6">
        <MDBCard>
        <MDBCardBody>
          <MDBCardHeader className="form-header warm-flame-gradient rounded">
          <h3 className="my-3">
              <MDBIcon icon="lock" /> Login:
          </h3>
          </MDBCardHeader>
          <label
          htmlFor="defaultFormEmailEx"
          className="grey-text font-weight-light"
          >
          </label>
          <form onSubmit={this.onSubmit}>

          <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
          />

          <label
          htmlFor="defaultFormPasswordEx"
          className="grey-text font-weight-light"
          >
          </label>
          <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
          />

          <div className="text-center mt-4">
          <MDBBtn color="deep-orange" className="mb-3" type="submit">
              Login
          </MDBBtn>
          </div>
          </form>


          <MDBModalFooter>
          <div className="font-weight-light">
              <p>Not a member? Sign Up</p>
              <p>Forgot Password?</p>
          </div>
          </MDBModalFooter>
        </MDBCardBody>
        </MDBCard>
      </MDBCol>
      </MDBRow>
    </MDBContainer>
    );
  }
}