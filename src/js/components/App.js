import styles from './App.css';

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
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            <Link to="home" className={styles.link}>
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
