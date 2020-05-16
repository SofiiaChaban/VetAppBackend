import React, { Component } from "react";
import UserDataService from "../services/user.service"
export default class SignUp extends Component {
    constructor(props) {
        super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword1 = this.onChangePassword1.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);


    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      username: "",
      email: "",
      password1: "",
      password2: "",

      submitted: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }

  onChangePassword1(e) {
    this.setState({
      password1: e.target.value
    });
  }

  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    });
  }


saveUser() {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,

    };
    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          password1: response.data.password1,
          password2: response.data.password2,



          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

    newUser() {
    this.setState({
      username: "",
      email: "",
      password1: "",
      password2: "",
      submitted: false
    });
  }

    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" id="username" value={this.state.username} onChange={this.onChangeUsername} className="form-control" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" id="email" value={this.state.email} onChange={this.onChangeEmail} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password1" value={this.state.password1} onChange={this.onChangePassword1} className="form-control" placeholder="Enter password" />
                </div> <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" id="password2" value={this.state.password2} onChange={this.onChangePassword2} className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" onClick={this.saveUser} className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}