import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      username:null,
      id:null,
      url: null,
      avatar_url: null
    }
  }

  getUser(username){
    return fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(response =>{
      return response;
    })
  }

  async handleSubmit(event){
    event.preventDefault();
    let user = await this.getUser(this.refs.username.value);
    this.setState({
      username: user.login,
      id: user.id,
      url: user.url,
      avatar_url: user.avatar_url
    });
  }


  render() {
    let user;
    if(this.state.username){
      const GitHubUrl = `https://github.com/${this.state.username}`
      user = <div>
        <p>Username: {this.state.username}</p>
        <p>ID: {this.state.id}</p>
        <p>Url: <a href={GitHubUrl}>GitHub Profile</a></p>
        <img src={this.state.avatar_url}/>
      </div>
    }
    return (
      <div className="App">
        <header className="App-header"> <h1>GitHub Search</h1>
        </header>
        <body>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input ref='username' type='text' placeholder = 'username'>
          </input>
        </form>
        <p className = "App-intro">
          {user}
        </p>
        </body>
      </div>
    );
  }
}

export default App;
