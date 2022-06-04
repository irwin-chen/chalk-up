import React from 'react';

export default class Chatroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(event) {
    event.preventDefault();
  }

  render() {
    return (
      <>
        <div className="w-9/10 h-[80vh] mx-auto rounded-xl shadow-md border border-black mb-4">
        </div>
        <form className="flex justify-center" onSubmit={this.sendMessage}>
          <input type="text" className="border-slate-600 shadow-sm w-9/10 h-10 rounded-3xl"></input>
        </form>
      </>
    );
  }
}
