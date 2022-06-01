import React from 'react';
import UserCardList from './pages/user-card-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: null
    };
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
      <div className="body font-mono">
        <div className="header bg-black h-14 flex items-center">
          <span className="text-white pl-4 text-2xl">Climbr</span>
        </div>
        <UserCardList userList={this.state.userList}/>
      </div>
    );
  }
}
