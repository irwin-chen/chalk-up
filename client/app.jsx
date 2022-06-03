import React from 'react';
import UserCardList from './pages/user-card-list';
import Header from './components/header';
import Profile from './pages/profile';
import NoContent from './pages/no-content';
import parseRoute from './lib/parse-route';

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
    } else {
      return <NoContent />;
    }
  }

  render() {
    if (this.state.route.path === null) return null;
    return (
      <div className="body font-mono bg-slate-300 min-h-screen">
        <Header />
        <div>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}
