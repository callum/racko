import React from 'react';
import Router, { DefaultRoute, Route } from 'react-router';

import AuthPersister from './persisters/AuthPersister';
import GamePersister from './persisters/GamePersister';

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

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, document.getElementById('root'));
});
