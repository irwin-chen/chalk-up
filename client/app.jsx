import React from 'react';
import UserCardList from './pages/user-card-list';
import Header from './components/header';
import Profile from './pages/profile';
import NoContent from './pages/no-content';

function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, queryString] = hashRoute.split('?');
  const params = new URLSearchParams(queryString);
  return { path, params };
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        const list = data;
        this.setState({
          userList: list,
          route: ''
        });
      });

    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      }, () => {
        const { route } = this.state;
        fetch(`api/users/${route.params.get('user')}`)
          .then(response => response.json())
          .then(data => {
            const list = data;
            this.setState({
              userList: list
            });
          });
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (this.state.route === '') {
      return <UserCardList userList={this.state.userList} />;
    } else if (route.path === 'profile') {
      return <Profile targetProfile={this.state.userList} />;
    } else {
      return <NoContent />;
    }
  }

  render() {
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
