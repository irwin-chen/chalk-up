import React from 'react';
import UserCardList from './pages/user-card-list';
import Header from './components/header';
import Profile from './pages/profile';
import NoContent from './pages/no-content';
import parseRoute from './lib/parse-route';
import Chatroom from './pages/chat-room';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 5,
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
      return (
      <>
          <Header />
          <UserCardList currentUser={this.state.currentUser}/>
      </>
      );
    } else if (route.path === 'profile') {
      return (
        <>
          <Header />
          <Profile profileId={route.params.get('userId')} />
        </>
      );
    } else if (route.path === 'chat') {
      return (
        <>
          <Header targetId={route.params.get('userId')}/>
          <Chatroom receiver={route.params.get('userId')} sender={this.state.currentUser} />
        </>
      );
    } else {
      return (
        <>
          <Header />
          <NoContent />
        </>
      );
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
