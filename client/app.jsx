import React from 'react';
import UserCardList from './pages/user-card-list';
import Profile from './pages/profile';
import NoContent from './pages/no-content';
import parseRoute from './lib/parse-route';
import Chatroom from './pages/chat-room';
import Register from './pages/create-account';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: {
        path: 'sign-in'
      }
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn(result) {
    const { user, token } = result;
    if (!token) {
      window.location.hash = '#sign-in';
    }
    window.localStorage.setItem('userToken', token);
    this.setState({ user, route: { path: '' } });
  }

  componentDidMount() {
    const token = window.localStorage.getItem('userToken');
    if (token) {
      const user = jwtDecode(token);
      this.setState({
        user,
        route: {
          path: ''
        }
      });
    } else {
      window.location.hash = '#sign-in';
    }

    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage(token) {
    const { path } = this.state.route;

    if (path === '') {
      return <UserCardList />;
    }
    if (path === 'profile') {
      return <Profile />;
    }
    if (path === 'chat') {
      return <Chatroom />;
    }
    if (path === 'sign-in' || path === 'register') {
      return <Register path={path} signIn={this.signIn} />;
    }

    return <NoContent />;
  }

  render() {
    const { user, route } = this.state;
    const token = (window.localStorage.getItem('userToken')) ? window.localStorage.getItem('userToken') : null;
    const contextValue = { user, route, token };
    return (
      <AppContext.Provider value={contextValue}>
        <div className="body font-mono bg-slate-100 min-h-screen">
          {this.renderPage(token)}
        </div>
      </AppContext.Provider>
    );
  }
}
