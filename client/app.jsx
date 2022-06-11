import React from 'react';
import UserCardList from './pages/user-card-list';
import Profile from './pages/profile';
import NoContent from './pages/no-content';
import parseRoute from './lib/parse-route';
import Chatroom from './pages/chat-room';
import Messages from './pages/messages';
import Register from './pages/create-account';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: {
        path: ''
      }
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('userToken', token);
    this.setState({
      user
    });
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <UserCardList />;
    } else if (route.path === 'profile') {
      return <Profile profileId={route.params.get('userId')} />;
    } else if (route.path === 'chat') {
      return <Chatroom toUser={route.params.get('userId')} fromUser={route.params.get('fromUser')} />;
    } else if (route.path === 'messages') {
      return <Messages />;
    } else if (route.path === 'sign-in' || route.path === 'register') {
      return <Register path={route.path} signIn={this.signIn} />;
    } else {
      return <NoContent />;
    }
  }

  render() {
    if (this.state.route.path === null) return null;
    return (
      <div className="body font-mono bg-slate-100 min-h-screen">
        {this.renderPage()}
      </div>
    );
  }
}
