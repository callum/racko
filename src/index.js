import React from 'react';
import Router, { DefaultRoute, Route } from 'react-router';

import AuthPersister from './persisters/AuthPersister';
import GamePersister from './persisters/GamePersister';
import PlayerPersister from './persisters/PlayerPersister';
import UserPersister from './persisters/UserPersister';

import App from './components/App';
import Home from './components/Home';
import Game from './components/Game';

const routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="game" path=":id" handler={Game} />
  </Route>
);

AuthPersister.initialize();
GamePersister.initialize();
PlayerPersister.initialize();
UserPersister.initialize();

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.getElementById('root'));
});
