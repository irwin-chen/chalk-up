import React from 'react';
import ProfileTags from '../components/profile-tags';
import Header from '../components/header';
import Banner from '../components/banner';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      errorText: ''
    };
  }

  componentDidMount() {
    const { route, token } = this.context;
    this.context.toggleLoading();
    const userId = route.params.get('userId');
    fetch(`api/user/${userId}`, {
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.context.toggleLoading();
        if (data.error) {
          this.setState({ errorText: data.error });
        }
        const entry = data;
        this.setState({
          userProfile: entry
        });
      });
  }

  render() {
    if (!this.state.userProfile) return null;
    const { userProfile } = this.state;
    let profileTags;
    if (!userProfile.tags) {
      profileTags = '';
    } else {
      profileTags = userProfile.tags.map(entry => {
        return (
          <ProfileTags key={entry.tagId} tagLabel={entry.label} />
        );
      });
    }

    return (
      <>
        <Header />
        <Banner errorText={this.state.errorText} />
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <div className="w-19/20 mb-2">
            <img className="aspect-[10/11] object-cover w-full shadow-md rounded-lg" src={userProfile.imageUrl}></img>
          </div>
          <div className="profile-description w-19/20 bg-white shadow-md rounded-lg mb-2">
            <p className="text-3xl font-bold p-2">{userProfile.firstName}</p>
            <p className="p-2">{userProfile.userDescription}</p>
          </div>
          <div className="profile-tags w-19/20 bg-white shadow-md rounded-lg p-2 mb-2">
            <p className="text-xl font-bold">Tags</p>
            {profileTags}
          </div>
          <a className="btn btn-wide mb-8" href={`#chat?userId=${userProfile.userId}`}>Start Chat</a>
        </div>
      </>
    );
  }
}

Profile.contextType = AppContext;
