import React from 'react';
import ProfileTags from '../components/profile-tags';
import Header from '../components/header';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userProfile: null
    };
  }

  componentDidMount() {
    fetch(`api/user/${this.props.profileId}`)
      .then(response => response.json())
      .then(data => {
        const entry = data;
        this.setState({
          userProfile: entry
        });
      });
  }

  render() {
    if (!this.state.userProfile) return null;
    const { userProfile } = this.state;
    const profileTags = userProfile.tags.map(entry => {
      return (
        <ProfileTags key={entry.tagId} tagLabel={entry.label} />
      );
    });
    return (
      <>
        <Header />
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <div className="w-19/20 mb-2">
            <img className="aspect-[10/11] object-cover w-full shadow-md rounded-lg" src={`./images/${userProfile.imageUrl}`}></img>
          </div>
          <div className="profile-description w-19/20 bg-white shadow-md rounded-lg mb-2">
            <p className="text-3xl font-bold p-2">{userProfile.userName}</p>
            <p className="p-2">{userProfile.userDescription}</p>
          </div>
          <div className="profile-tags w-19/20 bg-white shadow-md rounded-lg p-2 mb-2">
            <p className="text-xl font-bold">Tags</p>
            {profileTags}
          </div>
          <a className="btn btn-wide" href={`#chat?userId=${userProfile.userId}&fromUser=5`}>Start Chat</a>
        </div>
      </>
    );
  }
}
