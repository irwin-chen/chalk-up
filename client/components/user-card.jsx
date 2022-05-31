import React from 'react';

export default function UserCard(props) {
  const userTags = userTagsList.map(entry => {
    return (
      <div class="badge badge-outline">{tag}</div>
    )
  });
  return (
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure><img src={imageUrl} /></figure>
      <div class="card-body">
        <h2 class="card-title">{userName}}</h2>
        <p>{userDescription}</p>
        <p className="flex">
          {userTags}
        </p>
      </div>
    </div>
  );
}
