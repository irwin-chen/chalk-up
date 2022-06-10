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
      age: '',
      city: '',
      preview: './images/image-empty.jpeg',
      imageFile: '',
      userDescription: '',
      clicked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.showForm = this.showForm.bind(this);
    this.imageUploaded = this.imageUploaded.bind(this);
  }

  handleChange(event) {
    const fieldName = event.target.name;
    const newValue = event.target.value;
    const update = {};
    update[fieldName] = newValue;
    this.setState(update);
  }

  showForm(event) {
    event.preventDefault();
    this.setState({
      clicked: true
    });
  }

  imageUploaded(event) {
    this.setState({
      preview: URL.createObjectURL(event.target.files[0]),
      imageFile: event.target.files[0]
    });
  }

  accountSubmit() {
    const { username, password, firstName, lastName, age, city, imageFile, userDescription } = this.state;
    const accountInfo = { username, password, firstName, lastName, age, city, imageFile, userDescription };
    return accountInfo;
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
          <form autoComplete="off" className={`mx-auto pb-2 w-[85%] ${userCreation}`} onSubmit={this.showForm}>
            <p className="mb-2 font-semibold">Username</p>
            <input name="username" onChange={this.handleChange} value={this.state.username} type="text" required className="mb-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            <p className="mb-2 font-semibold">Password</p>
            <input name="password" onChange={this.handleChange} value={this.state.password} type="password" required className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            <div className="flex justify-between ">
              <a href="#sign-in" className="text-sm">Sign in instead</a>
              <button type="submit" className="border border-black rounded-md px-3 py-1 text-md text-white bg-black">Next</button>
            </div>
          </form>
        </div>
        <div className={`w-[95%] max-w-2xl py-6 bg-white mx-auto rounded-lg ${entryForm}`}>
          <p className="text-center text-2xl mb-4 font-bold">Account Info</p>
          <form autoComplete="off" className={`mx-auto pb-2 w-[90%] flex flex-wrap justify-between ${entryForm}`}>
            <div className="w-full sm:w-[45%]">
              <p className="mb-2 font-semibold">First Name</p>
              <input name="firstName" onChange={this.handleChange} value={this.state.firstName} required type="text" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="w-full sm:w-[45%]">
              <p className="mb-2 font-semibold">Last Name</p>
              <input name="lastName" onChange={this.handleChange} value={this.state.lastName} required type="text" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="max-w-[25%]">
              <p className="mb-2 font-semibold">Age</p>
              <input name="age" onChange={this.handleChange} value={this.state.age}required type="number" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="w-[60%]">
              <p className="mb-2 font-semibold">City</p>
              <input name="city" onChange={this.handleChange} value={this.state.city} required type="text" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            </div>
            <div className="w-full mb-6">
              <p className="mb-2 font-semibold">Profile Picture</p>
              <div className="w-full mx-auto max-w-xs">
                <label>
                  <p className="text-sm text-center mb-2">click below upload a profile picture</p>
                  <input required onChange={this.imageUploaded} className="hidden" type="file" accept=".png, .jpg, .jpeg, .gif, .webp"></input>
                  <img className="object-cover aspect-[5/6] w-full" name="image" src={this.state.preview}></img>
                </label>
              </div>
            </div>
            <div className="w-full mb-4">
              <p className="mb-2 font-semibold">Profile Description</p>
            <textarea name="userDescription" required onChange={this.handleChange} value={this.state.userDescription} className="resize-none w-full h-40 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Type something!"></textarea>
            </div>
            <a onClick={this.accountSubmit} href="#sign-in" className="mx-auto border border-black rounded-md px-3 py-1 text-md text-white bg-black">Create Account</a>
          </form>
        </div>
      </>
    );
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.preview);
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
