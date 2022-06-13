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
      route: {
        path: '#sign-in'
      }
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn(result) {
    const { token } = result;
    window.localStorage.setItem('userToken', token);
    window.location.hash = '#';
  }

  componentDidMount() {
    const token = window.localStorage.getItem('userToken');
    let path = 'sign-in';
    if (token) {
      path = '';
    }
    this.setState({
      route: { path }
    });

    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const token = window.localStorage.getItem('userToken');
    const { route } = this.state;
    let user = null;
    if (token) {
      user = jwtDecode(token);
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
    return (
      <div className="body font-mono bg-slate-100 min-h-screen">
        {this.renderPage()}
      </div>
    );
  }
}
