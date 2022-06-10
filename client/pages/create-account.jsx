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
      userDescription: '',
      bouldering: false,
      topRope: false,
      lead: false,
      indoor: false,
      outdoor: false,
      belaying: false,
      clicked: false
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.showForm = this.showForm.bind(this);
    this.imageUploaded = this.imageUploaded.bind(this);
    this.accountSubmit = this.accountSubmit.bind(this);
    this.onToggle = this.onToggle.bind(this);
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
      imageFile: this.fileInputRef.current.files[0]
    });
  }

  accountSubmit() {
    const { username, password, firstName, lastName, age, city, userDescription } = this.state;
    const accountInfo = { username, password, firstName, lastName, age, city, userDescription };
    const form = new FormData();

    for (const prop in accountInfo) {
      form.append(prop, accountInfo[prop]);
    }

    form.append('image', this.fileInputRef.current.files[0]);

    window.location.hash = '#log-in';
    fetch('api/register', {
      method: 'POST',
      body: form
    }, () => {
      window.location.hash = '#log-in';
    });
  }

  onToggle(event) {
    const fieldName = event.target.name;
    const newValue = !this.state[fieldName];
    const update = {};
    update[fieldName] = newValue;
    this.setState(update);
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
            <input minLength={4} name="username" onChange={this.handleChange} value={this.state.username} type="text" required className="mb-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            <p className="mb-2 font-semibold">Password</p>
            <input minLength={6} name="password" onChange={this.handleChange} value={this.state.password} type="password" required className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            <div className="flex justify-between ">
              <a href="#sign-in" className="text-sm">Sign in instead</a>
              <button type="submit" className="border border-black rounded-md px-3 py-1 text-md text-white bg-black">Next</button>
            </div>
          </form>
        </div>
        <div className={`w-[95%] max-w-2xl py-6 bg-white mx-auto rounded-lg ${entryForm}`}>
          <p className="text-center text-2xl mb-4 font-bold">Account Info</p>
          <form autoComplete="off" className={`mx-auto pb-2 w-[90%] flex flex-wrap justify-between ${entryForm}`} onSubmit={this.accountSubmit}>
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
                  <input required onChange={this.imageUploaded} ref={this.fileInputRef} className="hidden" type="file" accept=".png, .jpg, .jpeg, .gif, .webp"></input>
                  <img className="object-cover aspect-[5/6] w-full" name="image" src={this.state.preview}></img>
                </label>
              </div>
            </div>
            <div className="w-full mb-4">
              <p className="mb-2 font-semibold">Profile Description</p>
            <textarea name="userDescription" required onChange={this.handleChange} value={this.state.userDescription} className="resize-none w-full h-40 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Type something!"></textarea>
            </div>
            <div className="w-full mb-4">
              <p className="mb-2 font-semibold">Tags</p>
              <div className="flex justify-center flex-wrap">
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Bouldering</span>
                  <input type="checkbox" onChange={this.onToggle} name='bouldering' className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Top Rope</span>
                  <input type="checkbox" onChange={this.onToggle} name='topRope' className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Lead Climbing</span>
                  <input type="checkbox" onChange={this.onToggle} name='lead' className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Indoor</span>
                  <input type="checkbox" onChange={this.onToggle} name='indoor' className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Outdoor</span>
                  <input type="checkbox" onChange={this.onToggle} name='outdoor' className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Belaying</span>
                  <input type="checkbox" onChange={this.onToggle} name='belaying' className="checkbox" />
                </label>
              </div>
            </div>
            <button type="submit" className="mx-auto border border-black rounded-md px-3 py-1 text-md text-white bg-black">Create Account</button>
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
