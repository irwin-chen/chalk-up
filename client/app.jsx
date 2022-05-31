import React from 'react';
import UserCardList from './pages/user-card-list';

export default class App extends React.Component {
  render() {
    return (
      <div className="body font-mono">
        <div className="header bg-black h-14 flex items-center">
          <span className="text-white pl-4 text-2xl">Climbr</span>
        </div>
        <UserCardList />
      </div>
      );
  }
}
