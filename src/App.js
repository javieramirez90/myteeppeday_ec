import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Authentication from './pages/authentication/authentication.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async  user => {
      createUserProfileDocument(user)
      // this.setState({currentUser: user})
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/signin' component={Authentication}/>
          <Route path='/shop' component={ShopPage}/>
        </Switch>
      </div>
    );
  };
};

export default App;
