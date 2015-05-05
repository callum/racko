import React from 'react';
import { Link, RouteHandler } from 'react-router';

import withAuth from './shared/withAuth';
import withUser from './shared/withUser';

class App extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__heading">
            <Link to="home" className="app__link">
              Rack-O
            </Link>
          </h1>

          {this.props.user.get('name')}
        </header>

        <RouteHandler {...this.props} />
      </div>
    );
  }

}

const AppWithUser = withUser(App);
const AppWithAuth = withAuth(AppWithUser);

export default AppWithAuth;
