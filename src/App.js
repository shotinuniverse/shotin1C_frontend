import React, { Component } from 'react';
import './csses/bootstrap.css';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = { userName: "", password: "", resultArray: []};
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.LoginButton = this.getPassword.bind(this);
  }

  handleChangeUserName(event) {
    this.setState({ userName: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  getPassword() {
    fetch("http://localhost:8080/api/users", { method: 'GET' })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("data", data);
        this.setState({ 
          resultArray: data 
        });
      });
}

  render() {
    return (
      <div>
        <div>
          <label>
            username:
            <input type="text" value={this.state.userName} onChange={this.handleChangeUserName} class="form-control" placeholder="username" />
          </label>
          <label>
            password:
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} class="form-control" placeholder="password" />
          </label>
          <button class="btn -moz-focus-inner">sign in</button>
        </div>
        {<div>
          {this.getPassword()}
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>username</th>
                  <th>description</th>
                  <th>date of changed</th>
                  <th>roles id</th>
                  <th>show</th>
                  <th>eauth</th>
                  <th>adm role</th>
                </tr>
              </thead>
              {<tbody>
              {
                this.state.resultArray.map(Users =>
                  <tr key={Users.name}>
                    <td>{Users.name}</td>
                    <td>{Users.description}</td>
                    <td>{Users.dateofchanged}</td>
                    <td>{Users.idrole}</td>
                    <td>{Users.isshow}</td>
                    <td>{Users.isauth}</td>
                    <td>{Users.isadmin}</td>
                  </tr>
              )}
              </tbody>}
            </table>
        </div>}
      </div>
        
    );
  }
}


export default class App extends Component {
  static displayName = App.name;

  render() {
      return (
        <LoginForm />
      );
  }
}
