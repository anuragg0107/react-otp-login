import React, { useState } from 'react';
import firebase from './firebase';

const App = () => {
  const [state, setState] = useState({ mobile: '', otp: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        onSignInSubmit();
        console.log("Recaptcha verified");
      },
      defaultCountry: "IN",
    });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+91" + state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
      }).catch((error) => {
        console.log("SMS not sent");
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = state.otp;
    console.log(code);
    window.confirmationResult.confirm(code).then((result) => {
      const user = result.user;
      console.log(JSON.stringify(user));
      alert("User is verified ✅");
    }).catch((error) => {
    });
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={onSignInSubmit}>
        <div id="sign-in-button"></div>
        <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange} value={state.mobile} />
        <button type="submit">Submit</button>
      </form>

      <h2>Enter OTP</h2>
      <form onSubmit={onSubmitOTP}>
        <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange} value={state.otp} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
