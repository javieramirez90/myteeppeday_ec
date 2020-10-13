import React from 'react';
import Directory from '../../components/directory/directory.component';
import { Switch, Route, Link } from 'react-router-dom';

import './homepage.styles.scss';

const HomePage = () => {
  return (
    <div className='homepage'>
      <Switch>
        <Route exact path='/' component={Directory}/>
        <Route exact path='/hats' component={<div>Hello</div>}/>
      </Switch>
      <Directory />
    </div>
  )
};

export default HomePage;