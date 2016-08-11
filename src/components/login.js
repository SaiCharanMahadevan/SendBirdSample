'use strict';
import React, { Component } from 'react';
import { TouchableHighlight, NavigatorIOS, TextInput, AppRegistry, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#655BAA'
  },
  textInput: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    width: 300,
    alignSelf: 'center',
    borderRadius: 1,
    borderColor: '#00AAFF',
    backgroundColor: 'white',
    fontSize: 15
  },
  button: {
    marginTop: 20,
    backgroundColor: '#00AAFF',
    height: 40,
    width: 300,
    alignSelf: 'center',
    borderRadius: 1,
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

  loginInput(text, field) {
    if(field) {
      
    }
    this.setState({username: text})
  }

  login() {
    console.log(this.state.username);
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={this.loginInput.bind(this, 'username')}/>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={this.loginInput.bind(this, 'password')}/>
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