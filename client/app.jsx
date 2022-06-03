import React from 'react';
import UserCardList from './pages/user-card-list';
import Header from './components/header';
import Profile from './pages/profile';
import NoContent from './pages/no-content';
import parseRoute from './lib/parse-route';


function Redirect(props) {
  const url = new URL(window.location);
  if (props.to === '') {
    url.hash = '#';
  } else {
    url.hash = props.to;
  }
  window.location.replace(url);
  return null;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null,
      route: null
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        const list = data;
        this.setState({
          userList: list,
          route: {
            path: ''
          }
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
    if (route.path === '') {
      return <UserCardList userList={this.state.userList} />;
    } else if (route.path === 'profile') {
      return <Profile targetProfile={this.state.userList} />;
    } else {
      return <NoContent />;
    }
  }

  render() {
    if (this.state.userList === null) return null;
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
