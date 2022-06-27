import React from 'react';
import UserCard from '../components/user-card';
import Header from '../components/header';
import AppContext from '../lib/app-context';

export default class UserCardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: null
    };
  }

  componentDidMount() {
    const { token, user } = this.context;
    if (!token) return;
    fetch('/api/userList', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(user)
    })
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
    const { user } = this.context;
    const { userList } = this.state;
    if (!user) window.location.hash = '#sign-in';
    if (!userList) return null;
    return (
      <>
        <Header />
        <div className="w-full md:max-w-3xl md:mx-auto flex flex-wrap justify-evenly">
          {this.userCardList()}
        </div>
      </>
    );
  }
}

UserCardList.contextType = AppContext;
