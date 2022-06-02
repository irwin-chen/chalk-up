import React from 'react';
import UserCard from '../components/user-card';

export default function UserCardList(props) {
  const { userList } = props;
  const userCardList = userList.map(entry => {
    return (
        <UserCard userProfile={entry} key={entry.userId} userId={entry.userId}/>
    );
  });
  return (
    <div className="w-full md:max-w-3xl md:mx-auto">
      <div className="flex flex-wrap justify-evenly">
        {userCardList}
      </div>
    </div>
  );
}
