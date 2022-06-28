import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetProfile: null
    };
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    if (!Number(this.props.targetId)) return null;
    fetch(`api/user/${this.props.targetId}`, {
      headers: {
        'x-access-token': this.props.token
      }
    })
      .then(response => response.json())
      .then(data => {
        const entry = data;
        this.setState({
          targetProfile: entry
        });
      });
  }

  renderHeader() {
    const { targetProfile } = this.state;
    if (this.state.targetProfile) {
      return (
        <>
          <a className="text-white ml-4" href="#">
            <FontAwesomeIcon icon={faChevronLeft} inverse/>
          </a>
          <a href={`#profile?userId=${targetProfile.userId}`} className="avatar ml-4">
            <div className="w-12 rounded-full bg-white">
              <img src={targetProfile.imageUrl} />
            </div>
          </a>
          <a href={`#profile?userId=${targetProfile.userId}`} className="text-white ml-4 text-xl" >{targetProfile.firstName}</a>
        </>
      );
    } else {
      return (
        <div className="w-9/10 mx-auto">
          <a className="text-white text-2xl" href="#">Chalk Up</a>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="bg-black h-16 mb-4 flex items-center">
        {this.renderHeader()}
      </div>
    );
  }
}
