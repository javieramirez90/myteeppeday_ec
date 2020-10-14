import React, { Component } from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: '', password: '' })
    } catch(err) {
      console.log(err)
    }

  };

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value })
  }

  render() {
    return(
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Submit Form</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>
            {' '}
            Sign in with Google {' '}
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }

}

export default SignIn;