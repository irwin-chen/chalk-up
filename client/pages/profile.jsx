import React from 'react';
import ProfileTags from '../components/profile-tags';

export default function Profile(props) {
  const [targetProfile] = props.targetProfile;
  const profileTags = targetProfile.tags.map(entry => {
    return (
      <ProfileTags key={entry.tagId} tagLabel={entry.label} />
    );
  });
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <div className="w-19/20 mb-2">
        <img className="aspect-[10/11] object-cover w-full shadow-md rounded-lg" src={`./images/${targetProfile.imageUrl}`}></img>
      </div>
      <div className="profile-description w-19/20 bg-white shadow-md rounded-lg mb-2">
        <p className="text-3xl font-bold p-2">{targetProfile.userName}</p>
        <p className="p-2">{targetProfile.userDescription}</p>
      </div>
      <div className="profile-tags w-19/20 bg-white shadow-md rounded-lg p-2 mb-2">
        <p className="text-xl font-bold">Tags</p>
        {profileTags}
      </div>
      <a className="btn btn-wide" href="#chat%{targetProfile.userId}">Start Chat</a>
    </div>
  );
}
