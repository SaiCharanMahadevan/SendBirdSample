'use strict';
import React, { Component } from 'react';
import { TouchableHighlight, NavigatorIOS, TextInput, AppRegistry, Text, View, StyleSheet } from 'react-native';
import SendBird from 'sendbird';

import Channel from './channel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#655BAA'
  },
  textInput: {
    height: 40,
    borderWidth: 0.8,
    padding: 10,
    width: 200,
    alignSelf: 'center',
    borderRadius: 3,
    borderColor: '#00AAFF',
    backgroundColor: 'white',
    fontSize: 15
  },
  button: {
    marginTop: 20,
    backgroundColor: '#00AAFF',
    height: 40,
    width: 200,
    alignSelf: 'center',
    borderRadius: 3,
    justifyContent: 'center',
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  loginInput(text) {
    this.setState({username: text})
  }

  login() {
    SendBird.init({
      app_id: 'A7A2672C-AD11-11E4-8DAA-0A18B21C2D82',
      guest_id: this.state.username,
      user_name: this.state.username,
      image_url: "",
      access_token: "",
      successFunc: (data) => {
        this.props.navigator.push({
          title: 'Channel',
          component: Channel
        })
      },
      errorFunc: (status, error) => {
        this.setState({username: ''});
      }
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={this.loginInput.bind(this)}/>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#9bc2cf'
            onPress={this.login.bind(this)}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>LOGIN</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}