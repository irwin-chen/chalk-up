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
      loading: false,
      route: {
        path: 'sign-in'
      }
    };
    this.signIn = this.signIn.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  toggleLoading() {
    const loading = !this.state.loading;
    this.setState({ loading });
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
    const { user, route, loading } = this.state;
    const toggleLoading = this.toggleLoading;
    const token = (window.localStorage.getItem('userToken')) ? window.localStorage.getItem('userToken') : null;
    const contextValue = { user, route, token, toggleLoading };

    let hidden;
    loading ? hidden = '' : hidden = 'hidden';
    return (
      <AppContext.Provider value={contextValue}>
        <div className={`relative z-10 ${hidden}`}>
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>
          <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
            <img className="w-40 h-40" src="/images/spinner.svg" />
          </div>
        </div>
        <div className="body font-mono bg-slate-100 min-h-screen">
          {this.renderPage(token)}
        </div>
      </AppContext.Provider>
    );
  }
}
