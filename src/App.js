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
      <img className="github-icon" src = 'data:image/png;base64,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'></img>
        <header className="App-header"> <h1>GitHub Search</h1>
        </header>
        <body>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input ref='username' type='text' placeholder = 'please type in username'>
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
