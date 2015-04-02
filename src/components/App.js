import React from 'react';
import { RouteHandler } from 'react-router';
import withFirebase from './shared/withFirebase';

export class App extends React.Component {

  static getToken() {
    return localStorage.getItem('token');
  }

  static getDefaultData() {
    return {
      user: null
    };
  }

  static addDataHandlers() {
    let token = App.getToken();

    if (token) {
      this.firebase.authWithCustomToken(token, (err, res) => {
        if (err) {
          console.log('Authentication failed', err);
          return;
        }

        this.user = this.firebase.child('users').child(res.uid);

        this.handlers.user = this.user.on('value', res => {
          this.setState({
            user: res.val()
          });
        });
      });
    }
  }

  static removeDataHandlers() {
    this.user.off('value', this.handlers.user);
  }

  authenticate(e) {
    let name = e.target.elements.name.value;

    this.props.firebase.authAnonymously((err, res) => {
      if (err) {
        console.log('Authentication failed', err);
        return;
      }

      let user = { name };

      this.props.firebase.child('users').child(res.uid).set(user);

      localStorage.setItem('token', res.token);
    });

    e.preventDefault();
  }

  render() {
    let token = App.getToken();

    if (this.props.user) {
      return (
        <div>
          <h1>Rack-O</h1>

          <p>Logged in as {this.props.user.name}</p>

          <RouteHandler user={this.props.user} />
        </div>
      );
    }

    if (token) {
      return (
        <p>Logging in…</p>
      );
    }

    return (
      <form onSubmit={this.authenticate.bind(this)}>
        <h1>Login</h1>

        <label>
          Your name
          <input type="text" name="name" />
        </label>

        <button type="submit">
          Authenticate
        </button>
      </form>
    );
  }

}

export default withFirebase(App);
