import React from 'react';

export default function ProfileTags(props) {
  const { tagLabel } = props;
  return (
    <div className="badge badge-outline mr-2">{tagLabel}</div>
  );
}
