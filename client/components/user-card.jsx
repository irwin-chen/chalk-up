import React from 'react';

export default function UserCard(props) {
  const { userProfile } = props;
  const profileTags = userProfile.tags.map(entry => {
    return (
      <div className="badge badge-outline mr-2" key={entry.tagId}>{entry.label}</div>
    );
  });
  return (
    <div className="card w-card md:max-w-sm mt-4 bg-base-100 shadow-lg border border-solid border-slate-300">
      <img className="object-cover rounded-lg aspect-square" src={`./images/${userProfile.imageUrl}`} />
      <div className="flex flex-auto flex-col gap-2 p-4">
        <h2 className="card-title">{userProfile.userName}</h2>
        <p className="overflow-hidden whitespace-nowrap text-ellipsis">
          {userProfile.userDescription}
        </p>
        <div className="hidden sm:inline-block">
          {profileTags}
        </div>
      </div>
    </div>
  );
}
