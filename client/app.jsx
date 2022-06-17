import React from 'react';
import UserCardList from './pages/user-card-list';
import Profile from './pages/profile';
import NoContent from './pages/no-content';
import parseRoute from './lib/parse-route';
import Chatroom from './pages/chat-room';
import Messages from './pages/messages';
import Register from './pages/create-account';
import jwtDecode from 'jwt-decode';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: {
        path: parseRoute(window.location.hash)
      }
    };
    this.signIn = this.signIn.bind(this);
    console.log('constructor');
  }

  signIn(result) {
    const { token } = result;
    window.localStorage.setItem('userToken', token);
    window.location.hash = '#';
  }

  componentDidMount() {
    console.log('componentDidMount');
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

  renderPage() {
    console.log('renderPage');
    const token = window.localStorage.getItem('userToken');
    const { route, user } = this.state;

    if (!user) {
      return;
    }

    if (route.path === '') {
      return <UserCardList token={token} user={user} />;
    } else if (route.path === 'profile') {
      return <Profile profileId={route.params.get('userId')} token={token} />;
    } else if (route.path === 'chat') {
      return <Chatroom toUser={route.params.get('userId')} token={token} fromUser={user} />;
    } else if (route.path === 'messages') {
      return <Messages />;
    } else if (route.path === 'sign-in' || route.path === 'register') {
      return <Register path={route.path} signIn={this.signIn} />;
    } else {
      return <NoContent />;
    }
  }

  render() {
    console.log('render');
    return (
      <div className="body font-mono bg-slate-100 min-h-screen">
        {this.renderPage()}
      </div>
    );
  }
}
