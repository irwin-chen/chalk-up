import React from 'react';

export default function Banner(props) {
  const { errorText } = props;
  if (errorText) {
    return (
      <div className="alert w-[90%] mx-auto alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorText}</span>
        </div>
      </div>
    );
  }
}
