import React from 'react';
import { Link } from 'react-router';

import GameActions from '../actions/GameActions';

class Home extends React.Component {

  createGame() {
    GameActions.create(this.props.user.get('id'));
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Rack-O</h1>

        <p>Logged in as {user.get('name')}</p>

        <h2>Games</h2>

        <ul>
          {user.get('games', []).map((value, key) => {
            return (
              <li key={key}>
                <Link to="game" params={{ id: key }}>{key}</Link>
              </li>
            );
          })}
        </ul>

        <button onClick={this.createGame.bind(this)}>
          Create game
        </button>
      </div>
    );
  }

}

Home.propTypes = {
  uid: React.PropTypes.string.isRequired,
  user: React.PropTypes.object
};

export default Home;
