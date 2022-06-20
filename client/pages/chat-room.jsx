import React from 'react';
import Header from '../components/header';
import { io } from 'socket.io-client';
import AppContext from '../lib/app-context';

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
    const { route, token } = this.context;
    const toUser = route.params.get('userId');
    const socket = io('/', {
      query: {
        toUser: Number(toUser)
      },
      auth: {
        'x-access-token': token
      }
    });

    fetch(`/api/chat?toUser=${toUser}`, {
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          chat: data
        });
      });

    socket.on('message', message => {
      const { chat } = this.state;
      const updatedChat = chat.concat([message]);
      this.setState({
        chat: updatedChat
      });
    });
  }

  displayMessage() {
    if (!this.state.chat) {
      return null;
    }
    const { user } = this.context;
    const { chat } = this.state;
    const messageList = chat.map(entry => {
      const time = new Date(entry.createdAt);
      const hourMin = new Intl.DateTimeFormat('en-us', { timeStyle: 'short' }).format(time);
      const date = new Intl.DateTimeFormat('en-us', { dateStyle: 'short' }).format(time);
      let order, messageClass, border, timeLabel;
      if (entry.senderId === user.userId) {
        messageClass = 'justify-end pr-4';
        order = '';
        border = 'rounded-bl-lg';
        timeLabel = 'mr-2';
      } else {
        messageClass = '';
        order = 'order-last';
        border = 'rounded-br-lg';
        timeLabel = 'ml-2';
      }
      return (
        <div key={entry.createdAt} className={`flex mb-4 ${messageClass}`}>
          <div className={`flex flex-col justify-center text-xs text-slate-400 ${order}`}>
            <span className={`hidden sm:inline-block ${timeLabel}`}>{date}</span>
            <span className={timeLabel}>{hourMin}</span>
          </div>
          <div className={`px-4 py-2 bg-white rounded-tl-lg rounded-tr-lg max-w-[80%] inline-block break-words whitespace-pre-line ${border}`}>{entry.messageContent}</div>
        </div>
      );
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

    const { route, token } = this.context;
    const toUser = route.params.get('userId');
    const message = {
      message: this.state.message,
      toUser: Number(toUser)
    };

    fetch('/api/messages', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(message)
    })
      .then(data => {
        this.setState({
          message: ''
        });
      });
  }

  render() {
    const { token, route } = this.context;
    const toUser = route.params.get('userId');
    return (
      <>
        <Header targetId={toUser} token={token} />
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

Chatroom.contextType = AppContext;
