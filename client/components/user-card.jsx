import React from 'react';
import ProfileTags from './profile-tags';

export default function UserCard(props) {
  const { userProfile, userId } = props;
  const profileTags = userProfile.tags.map(entry => {
    return (
      <ProfileTags key={entry.tagId} tagLabel={entry.label} />
    );
  });
  return (
    <a className="card w-9/10 md:max-w-[22rem] mb-4 bg-base-100 shadow-lg border border-solid border-slate-300 hover:cursor-pointer" href={`#profile?userId=${userId}`}>
      <img className="object-cover rounded-lg aspect-[5/6]" src={`./images/${userProfile.imageUrl}`}/>
      <div className="flex flex-auto flex-col gap-2 p-4">
        <h2 className="card-title">{userProfile.userName}</h2>
        <div className="hidden sm:inline-block">
          {profileTags}
        </div>
      </div>
    </a>
  );
}
