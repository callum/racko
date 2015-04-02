import React from 'react';
import Router, { DefaultRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Game from './components/Game';

const routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="game" path=":key" handler={Game} />
  </Route>
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.getElementById('root'));
});
