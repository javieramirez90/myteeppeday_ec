import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';

import './authentication.styles.scss';

const Authentication = () => {
  return (
    <div className='authentication'>
      <SignIn />
    </div>
  );
};

export default Authentication;