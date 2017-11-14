import React from 'react';
import {StackNavigator} from 'react-navigation';

import Home from './Home/Home';
import Login from './Login/Login';

const AppNavigator = StackNavigator({
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
})

export default AppNavigator;