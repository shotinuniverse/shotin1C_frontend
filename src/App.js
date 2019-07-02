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
    fetch("http://localhost:8080/api/users")
      .then((response) => {
        response.json();
      })
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData)
        this.setState({ resultArray: jsonData[0] });
      })
      .then((data) => {
        console.log("data", data);
        //data = JSON.parse(this.data);
        this.setState({ resultArray: data[0] });
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
          <button onClick={this.getPassword} class="btn -moz-focus-inner">log in</button>
        </div>
        {<div>
          {this.getPassword()}
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>username</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
              {
                this.state.resultArray.map(Users =>
                  <tr>
                    <td>{Users.name}</td>
                    <td>{Users.description}</td>
                  </tr>
              )}
              </tbody>
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
