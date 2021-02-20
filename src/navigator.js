import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator, StackNavigator } from 'react-navigation';
import screenMain from './screens/screenMain';
import auth from './screens/auth';
import config from './screens/config';
import perfilUser from './screens/perfilUser';

const mainRoutes = {
  auth: {
    name: 'auth',
    screen: auth
  },
  screenMain: {
    name: 'screenMain',
    screen: screenMain
  },
  config: {
    name: 'config',
    screen: config
  },
  perfilUser: {
    name: 'perfilUser',
    screen: perfilUser
  },
};
const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'auth'
});
export default createAppContainer(mainNavigator);