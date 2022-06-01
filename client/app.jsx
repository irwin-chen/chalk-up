import React from 'react';
import UserCardList from './pages/user-card-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null,
      userId: null
    };
    this.profileClick = this.profileClick.bind(this);
  }

  profileClick(event) {
    const targetId = event.target.closest('.card').getAttribute('profileid');
    this.setState({
      userId: targetId
    });
  }

  componentDidMount() {
    fetch('/api/users', () => {
      'GET';
    })
      .then(response => response.json())
      .then(data => {
        const list = data;
        this.setState({ userList: list });
      });
  }

  render() {
    if (!this.state.userList) {
      return null;
    }
    return (
      <div className="body font-mono bg-slate-50">
        <div className="header bg-black h-14 flex items-center">
          <span className="text-white pl-4 text-2xl">Climbr</span>
        </div>
        <div onClick={this.profileClick} className="w-full md:max-w-3xl md:mx-auto">
          <UserCardList clickEvent={this.profileClick} userList={this.state.userList} />
        </div>
      </div>
    );
  }
}
