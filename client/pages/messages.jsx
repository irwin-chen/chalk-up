import React from 'react';
import Header from '../components/header';

export default class Messages extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="w-9/10 mx-auto">
          <p className="text-xl">Messages</p>
        </div>
      </>
    );
  }
}
