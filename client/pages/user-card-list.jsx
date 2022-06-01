import React from 'react';
import UserCard from '../components/user-card';

export default function UserCardList(props) {
  const { userList } = props;
  const userCardList = userList.map(entry => {
    return (
        <UserCard userProfile={entry} key="entry.username"/>
    );
  });
  return (
    <div>
      {userCardList}
    </div>
  );
}
