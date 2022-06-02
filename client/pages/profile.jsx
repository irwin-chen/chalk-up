import React from 'react';

export default function Profile(props) {
  const { targetProfile } = props;
  return (
    <div>
      <img src={targetProfile}></img>
    </div>
  );
}
