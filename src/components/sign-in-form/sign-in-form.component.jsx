import { useState } from 'react';

import {
  signInWithGooglePopup,
  signInUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button-comonent';

import './sign-in-form.styles.scss';


const defaultFormFields = {
  email: '',
  password: '',
}

const singInWithGoogle = async () => {
  await signInWithGooglePopup();
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInUserWithEmailAndPassword(
        email,
        password
      );
      console.log("sign in", user);


      resetFormFields()
    } catch(err) {
      console.log('Error logging in', err);
    }
  }

  const handleChange = event => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  return (
    <div className='sign-in-container'>
      <h2>Sign in with existing account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-conntainer">
          <Button type="submit">Sign in</Button>
          <Button buttonType="google" onClick={singInWithGoogle}>Sign in with Google</Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;