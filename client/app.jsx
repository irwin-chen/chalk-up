import React from 'react';
import UserCardList from './pages/user-card-list';
import Profile from './pages/profile';
import NoContent from './pages/no-content';
import parseRoute from './lib/parse-route';
import Chatroom from './pages/chat-room';
import Messages from './pages/messages';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: {
        path: ''
      }
    };
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
