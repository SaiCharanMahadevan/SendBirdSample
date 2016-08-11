'use strict';
import React, { Component } from 'react';
import {
  NavigatorIOS,
  AppRegistry,
  Text,
  View,
  StyleSheet
} from 'react-native';

import Login from './components/login';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class Main extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Login,
          title: 'Log in'
        }}
      />
    );
  }
}