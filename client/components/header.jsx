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
    // if (!Number(this.props.targetId)) return null;
    // fetch(`api/users/${this.props.targetId}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     const entry = data;
    //     this.setState({
    //       targetProfile: entry
    //     });
    //   });
  }

  renderHeader() {
    // const targetProfile = this.state.targetProfile;
    // console.log(targetProfile);
    // if (Number(this.props.targetId)) {
    //   return (
    //     <img src={`./images/${targetProfile.imageUrl}`}></img>
    //   );
    // } else {
    return <a className="text-white pl-4 text-2xl hover:cursor-pointer" href='#'>Climbr</a>;
    // }
  }

  render() {
    return (
      <div className="header bg-black h-16 flex items-center mb-4">
        {this.renderHeader()}
      </div>
    );
  }
}
