import React from 'react';
import Router, { DefaultRoute, Route } from 'react-router';

import AuthPersister from './persisters/AuthPersister';
import DrawPersister from './persisters/DrawPersister';
import GamePersister from './persisters/GamePersister';
import RackPersister from './persisters/RackPersister';
import UserPersister from './persisters/UserPersister';

import App from './components/App';
import Home from './components/Home';
import Game from './components/Game';

const routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="game" path=":gameId" handler={Game} />
  </Route>
);

AuthPersister.initialize();
DrawPersister.initialize();
GamePersister.initialize();
RackPersister.initialize();
UserPersister.initialize();

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.querySelector('.root'));
});
