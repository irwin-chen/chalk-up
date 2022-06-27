import React from 'react';
import Header from '../components/header';
import AppContext from '../lib/app-context';

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
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      nextForm: false
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.firstSubmit = this.firstSubmit.bind(this);
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

  firstSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    if (this.props.path === 'register') {
      this.setState({
        nextForm: true
      });
    }

    const loginInfo = { username, password };
    if (this.props.path === 'sign-in') {
      fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
        .then(res => res.json())
        .then(result => {
          if (result.matching) {
            this.props.signIn(result);
          }
        });
    }
  }

  imageUploaded(event) {
    this.setState({
      preview: URL.createObjectURL(event.target.files[0]),
      imageFile: this.fileInputRef.current.files[0]
    });
  }

  accountSubmit(event) {
    event.preventDefault();
    const { username, password, firstName, lastName, age, city, userDescription } = this.state;
    const accountInfo = { username, password, firstName, lastName, age, city, userDescription };

    const form = new FormData();
    for (const prop in accountInfo) {
      form.append(prop, accountInfo[prop]);
    }

    for (let i = 1; i < 7; i++) {
      if (this.state[i]) {
        form.append('tagsId', i);
      }
    }
    form.append('profile-image', this.fileInputRef.current.files[0]);

    fetch('/api/register', {
      method: 'POST',
      body: form
    })
      .then(() => {
        this.setState({
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          age: '',
          city: '',
          preview: './images/image-empty.jpeg',
          userDescription: ''
        }, () => {
          window.location.hash = '#sign-in';
        });
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
    let entryForm, userCreation, titleText, toggleText, buttonText, hrefText;
    if (this.props.path === 'sign-in') {
      titleText = 'Sign in to your account';
      toggleText = 'Create an account';
      buttonText = 'Sign in';
      hrefText = 'register';
    }
    if (this.props.path === 'register') {
      titleText = 'Create an Account';
      toggleText = 'Sign in instead';
      buttonText = 'Next';
      hrefText = 'sign-in';
    }

    if (this.state.nextForm && this.props.path === 'register') {
      userCreation = 'hidden';
      entryForm = 'block';
    } else {
      userCreation = '';
      entryForm = 'hidden';
    }
    return (
      <>
        <div className={`w-[95%] max-w-md py-6 mt-28 bg-white mx-auto rounded-lg ${userCreation}`}>
          <p className="text-center text-2xl mb-4 font-bold">{titleText}</p>
          <form autoComplete="off" className={`mx-auto pb-2 w-[85%] ${userCreation}`} onSubmit={this.firstSubmit}>
            <p className="mb-2 font-semibold">Username</p>
            <input minLength={6} name="username" onChange={this.handleChange} value={this.state.username} type="text" required className="mb-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            <p className="mb-2 font-semibold">Password</p>
            <input minLength={6} name="password" onChange={this.handleChange} value={this.state.password} type="password" required className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
            <div className="flex justify-between ">
              <a href={`#${hrefText}`} className="text-sm underline">{toggleText}</a>
              <button type="submit" className="border border-black rounded-md px-3 py-1 text-md text-white bg-black">{buttonText}</button>
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
              <input name="age" min={1} onChange={this.handleChange} value={this.state.age}required type="number" className="mb-6 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"></input>
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
                  <img className="object-cover aspect-[5/6] w-full" src={this.state.preview}></img>
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
                  <input type="checkbox" onChange={this.onToggle} name={1} className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Top Rope</span>
                  <input type="checkbox" onChange={this.onToggle} name={2} className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Lead Climbing</span>
                  <input type="checkbox" onChange={this.onToggle} name={3} className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Indoor</span>
                  <input type="checkbox" onChange={this.onToggle} name={4} className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Outdoor</span>
                  <input type="checkbox" onChange={this.onToggle} name={5} className="checkbox" />
                </label>
                <label className="label cursor-pointer w-2/3">
                  <span className="label-text">Belaying</span>
                  <input type="checkbox" onChange={this.onToggle} name={6} className="checkbox" />
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

Register.contextType = AppContext;
