import React from 'react';
import Header from '../components/header';

export default function NoContent() {
  return (
    <>
      <Header />
      <div className="bg-white w-2/3 text-center mx-auto b">
        <a href="#">Oops, you werent supposed to see this! Click anywhere in this box to go back to the home page</a>
      </div>
    </>
  );
}
