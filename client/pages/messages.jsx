import React from 'react';
import Header from '../components/header';

export default class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: null
    };
  }

  componentDidMount() {
    // fetch('api/messages')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //       list: data
    //     });
    //   });
  }

  messageList() {
    if (this.state.list === null) return null;
    const { list } = this.state;
    const directMessageList = list.map(entry => {
      return (
        <li key={entry}>
          <a href={`#chat?userId=${entry.userId}`} className="avatar ml-4">
            <div className="w-12 rounded-full bg-white">
              <img src={`./images/${entry.imageUrl}`} />
            </div>
          </a>
        </li>
      );
    });
    return directMessageList;
  }

  render() {
    return (
      <>
        <Header />
        <div className="w-9/10 mx-auto">
          <p className="text-xl">Messages</p>
            <ul>
              {this.messageList()}
            </ul>
        </div>
      </>
    );
  }
}
