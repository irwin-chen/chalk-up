import React from 'react';
import UserCard from '../components/user-card';
import Header from '../components/header';
import Banner from '../components/banner';
import AppContext from '../lib/app-context';

export default class UserCardList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: null,
      errorText: ''
    };
  }

  componentDidMount() {
    const { token, user } = this.context;
    this.context.toggleLoading();
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
        this.context.toggleLoading();
        if (data.error) {
          this.setState({ errorText: data.error });
        } else {
          const list = data;
          this.setState({
            userList: list
          });
        }
      });
  }

  userCardList() {
    const { userList } = this.state;
    if (userList) {
      const userCardList = userList.map(entry => {
        return (
          <UserCard userProfile={entry} key={entry.userId} userId={entry.userId} />
        );
      });
      return userCardList;
    }
  }

  render() {
    const { user } = this.context;
    if (!user) window.location.hash = '#sign-in';
    return (
      <>
        <Header />
        <Banner errorText={this.state.errorText} />
        <div className="w-full md:max-w-3xl md:mx-auto flex flex-wrap justify-evenly">
          {this.userCardList()}
        </div>
      </>
    );
  }
}

UserCardList.contextType = AppContext;
