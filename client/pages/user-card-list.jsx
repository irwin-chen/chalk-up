import React from 'react';
import UserCard from '../components/user-card';
import Header from '../components/header';

export default class UserCardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: null
    };
  }

  componentDidMount() {
    fetch('/api/userList', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      },
      body: JSON.stringify(this.props.user)
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
    if (!this.props.user) {
      window.location.hash = '#sign-in';
    }
    if (!this.state.userList) return null;
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
