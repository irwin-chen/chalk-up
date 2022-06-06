import React from 'react';

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
    fetch(`api/user/${this.props.targetId}`)
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
          <a className="text-white ml-4" href="#messages">&#60;</a>
          <a href={`#profile?userId=${targetProfile.userId}`} className="avatar ml-4">
            <div className="w-12 rounded-full bg-white">
              <img src={`./images/${targetProfile.imageUrl}`} />
            </div>
          </a>
          <a href={`#profile?userId=${targetProfile.userId}`} className="text-white ml-4 text-xl" >{targetProfile.userName}</a>
        </>
      );
    } else {
      return <a className="text-white w-9/10 mx-auto text-2xl hover:cursor-pointer" href='#'>Climbr</a>;
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
