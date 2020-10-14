import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './authentication.styles.scss';

const Authentication = () => {
  return (
    <div className='authentication'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authentication;