import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class Login extends Component {
   constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.login = this.login.bind(this);

    this.state = {
      id: null,
      username: "",
      email: "",
      password: "",
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

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }


  login() {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    UserDataService.loginuser(data)
      .then(response => {
        console.log("done");
      })
      .catch(e => {
        console.log("bad");
      });
     }

    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input id="login_username_input" type="username" className="form-control" value={this.state.username} onChange={this.onChangeUsername} placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input id="login_email_input" type="email" value={this.state.email} onChange={this.onChangeEmail} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input id="login_password_input" type="password" value={this.state.password} onChange={this.onChangePassword} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={this.login} className="btn btn-primary btn-block">Submit</button>

            </form>

        );
    }
}