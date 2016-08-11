'use strict';
import React, { Component } from 'react';
import { TouchableHighlight, NavigatorIOS, TextInput, AppRegistry, Text, View, StyleSheet } from 'react-native';
import SendBird from 'sendbird';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#655BAA'
  }
});

export default class Channel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Channels</Text>
      </View>
    );
  }
}