import React from 'react';
import UserCard from '../components/user-card';

export default class UserCardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: null
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        const list = data;
        this.setState({
          userList: list
        });
      });
  }

  userCardList() {
    const userCardList = this.state.userList.map(entry => {
      return (
        <UserCard userProfile={entry} key={entry.userId} userId={entry.userId} />
      );
    });
    return userCardList;
  }

  render() {
    if (!this.state.userList) return null;
    return (
      <div className="w-full md:max-w-3xl md:mx-auto">
        <div className="flex flex-wrap justify-evenly">
          {this.userCardList()}
        </div>
      </div>
    );
  }
}
