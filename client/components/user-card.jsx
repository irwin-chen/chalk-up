import React from 'react';

export default function UserCard(props) {
  const { userProfile } = props;
  // console.log(userProfile.imageUrl);
  const profileTags = userProfile.tags.map(entry => {
    return (
      <div className="badge badge-outline" key={entry.tagId}>{entry.label}</div>
    );
  });
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={`./public/images/${userProfile.imageUrl}`} /></figure>
      <div className="card-body">
        <h2 className="card-title">{userProfile.userName}</h2>
        <p>
          {userProfile.userDescription}
        </p>
        <div className="flex">
          {profileTags}
        </div>
      </div>
    </div>
  );
}
