import React from 'react';
import Header from '../components/header';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: '',
      age: '',
      city: '',
      imageUrl: '',
      userDescription: '',
      clicked: false
    };
    this.usernameOnChange = this.usernameOnChange.bind(this);
    this.passwordOnChange = this.passwordOnChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  usernameOnChange(event) {
    this.setState({
      username: event.value
    });
  }

  passwordOnChange(event) {
    this.setState({
      password: event.value
    });
  }

  showForm(event) {
    event.preventDefault();
    this.setState({
      clicked: true
    });
  }

  createAccount() {
    let entryForm, userCreation;
    if (this.state.clicked) {
      userCreation = 'hidden';
      entryForm = 'block';
    } else {
      userCreation = '';
      entryForm = 'hidden';
    }
    return (
      <>
        <div className={`w-[95%] max-w-md py-6 mt-28 bg-white mx-auto rounded-lg ${userCreation}`}>
          <p className="text-center text-2xl mb-4 font-bold">Create an Account!</p>
          <form className={`mx-auto pb-2 w-[85%] ${userCreation}`}>
            <p className="mb-2 font-semibold">Username</p>
            <input onChange={this.usernameOnChange} value={this.state.username} type="text" required className="mb-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            <p className="mb-2 font-semibold">Password</p>
            <input onChange={this.passwordOnChange} value={this.state.password} type="password" required className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            <div className="flex justify-between ">
              <a href="#sign-in" className="text-sm">Sign in instead</a>
              <a onClick={this.showForm} className="border border-black rounded-md px-3 py-1 text-md text-white bg-black">next</a>
            </div>
          </form>
        </div>
        <div className={`w-[95%] max-w-2xl py-6 mt-28 bg-white mx-auto rounded-lg ${entryForm}`}>
          <p className="text-center text-2xl mb-4 font-bold">Account Info</p>
          <form className={`mx-auto pb-2 w-[90%] flex flex-wrap justify-between ${entryForm}`}>
            <div className="w-full sm:w-[45%]">
              <p className="mb-2 font-semibold">First Name</p>
              <input type="text" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="w-full sm:w-[45%]">
              <p className="mb-2 font-semibold">Last Name</p>
              <input type="text" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="max-w-[25%]">
              <p className="mb-2 font-semibold">Age</p>
              <input type="number" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="w-[60%]">
              <p className="mb-2 font-semibold">City</p>
              <input type="text" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="w-full">

            </div>
          </form>
        </div>
      </>
    );
  }

  render() {
    return (
      <>
        <Header />
        {this.createAccount()}
      </>
    );
  }
}
