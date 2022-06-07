import React from 'react';
import Header from '../components/header';

export default class Chatroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      chat: null
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.typeMessage = this.typeMessage.bind(this);
  }

  componentDidMount() {
    fetch('/api/chat')
      .then(response => response.json())
      .then(data => {
        this.setState({
          chat: data
        });
      });
  }

  displayMessage() {
    if (!this.state.chat) {
      return null;
    }
    const { chat } = this.state;
    const messageList = chat.map(entry => {
      if (Number(entry.senderId) === 5) {
        return (
          <div key={entry.createdAt} className="flex justify-end mb-4">
            <div className="flex flex-col justify-center">
              <p className="mr-2 text-xs text-slate-400">{entry.createdAt}</p>
            </div>
            <div className="px-4 py-2 bg-white rounded-tl-lg rounded-tr-lg rounded-bl-lg max-w-[85%] inline-block break-words whitespace-pre-line">{entry.messageContent}</div>
          </div>
        );
      } else {
        return (
          <div key={entry.createdAt} className="flex mb-4">
            <div className="px-4 py-2 bg-white rounded-tl-lg rounded-tr-lg rounded-br-lg max-w-[85%] inline-block break-words whitespace-pre-line">{entry.messageContent}</div>
            <div className="flex flex-col justify-center">
              <p className="ml-2 text-xs text-slate-400">{entry.createdAt}</p>
            </div>
          </div>
        );
      }
    });
    return messageList;
  }

  typeMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  sendMessage(event) {
    event.preventDefault();
    const message = {
      content: this.state.message
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
        const { chat } = this.state;
        chat.push(data);
        this.setState({
          chat,
          message: ''
        });
      });
  }

  render() {
    const { targetId } = this.props;
    return (
      <>
        <Header targetId={targetId} />
        <div className="w-9/10 h-[80vh] mx-auto sm:max-w-lg mb-8 overflow-auto">
          {this.displayMessage()}
        </div>
        <form className="flex justify-center" onSubmit={this.sendMessage}>
          <input placeholder="Message..." type="text" className="placeholder:text-slate-300 border-slate-600 shadow-sm w-9/10 h-10 rounded-3xl pl-4 sm:max-w-lg focus:outline-slate-200" onChange={this.typeMessage} value={this.state.message} ></input>
        </form>
      </>
    );
  }
}
