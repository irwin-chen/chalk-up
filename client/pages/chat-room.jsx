import React from 'react';
import Header from '../components/header';

export default class Chatroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.typeMessage = this.typeMessage.bind(this);
  }

  typeMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  sendMessage(event) {
    event.preventDefault();
    const { sender, receiver } = this.props;
    const message = {
      content: this.state.message,
      sender,
      receiver
    };
    fetch('api/messages', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          message: ''
        });
      });
  }

  render() {
    const { receiver } = this.props;
    return (
      <>
        <Header targetId={receiver} />
        <div className="w-9/10 h-[80vh] mx-auto sm:max-w-lg rounded-xl shadow-md border border-black mb-4">
        </div>
        <form className="flex justify-center" onSubmit={this.sendMessage}>
          <input placeholder="Message..." type="text" className="placeholder:text-slate-300 border-slate-600 shadow-sm w-9/10 h-10 rounded-3xl pl-4 sm:max-w-lg focus:outline-slate-200" onChange={this.typeMessage} value={this.state.message} ></input>
        </form>
      </>
    );
  }
}
