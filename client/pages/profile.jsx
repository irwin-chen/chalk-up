import React from 'react';

export default function Profile(props) {
  const [targetProfile] = props.targetProfile;
  return (
    <div>
      <div className="w-19/20">
        <img className="aspect-[10/11] object-cover w-full" src={`./images/${targetProfile.imageUrl}`}></img>
      </div>
    </div>
  );
}
