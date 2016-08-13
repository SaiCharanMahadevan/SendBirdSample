'use strict';
import React, { Component } from 'react';
import { ScrollView, ListView, Dimensions, TouchableHighlight, NavigatorIOS, TextInput, AppRegistry, Text, Image, View, StyleSheet } from 'react-native';
import SendBird from 'sendbird';
import _ from 'lodash';

const WINDOWSIZE = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#6E5BAA'
  },
  chatContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6E5BAA'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sendContainer: {
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  sendLabel: {
    color: '#fff'
  },
  textInput: {
    width: WINDOWSIZE.width - 70,
    color: '#555',
    height: 32,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#fff'
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f7f8fc',
    padding: 10,
    paddingLeft: 20
  },
  messageLabel: {
    color: '#6e6e6e'
  }
});

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageList: []
    }
  }

  componentWillMount() {
    SendBird.events.onMessageReceived = (obj) => {
      this.setState({messageList: this.state.messageList.concat([obj])});
    };
    this.getMessages();
  }

  getMessages() {
    SendBird.getMessageLoadMore({
      limit: 100,
      successFunc: (data) => {
        const messageList = [];
        data.messages.reverse().forEach((msg, index) => {
          if(SendBird.isMessage(msg.cmd)) {
            messageList.push(msg.payload);
          }
        });
        this.setState({
          messageList: messageList.concat(this.state.messageList)
        });
      },
      errorFunc: (status, error) => {
        console.log(status, error);
      }
    })
  }
  messageInput(text) {
    this.setState({
      message: text
    });
  }

  onSendPress() {
    SendBird.message(this.state.message);
    this.setState({message: ''});
  }

  render() {
    const list = this.state.messageList.map((item, index) => {
      return (
        <View
          style={styles.messageContainer}
          key={index}>
          <Text style={this.nameLabel}>
            {item.user.name}
            <Text style={styles.messageLabel}>
              : {item.message}
            </Text>
          </Text>
        </View>
      );
    });
    return(
      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <ScrollView
            ref={(c) => this._scrollView = c}
            onScroll={this.handleScroll}
            scrollEventThrottle={26}
            onContentSizeChange={(e) => {}}>
            {list}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.textInput}
              value={this.state.message}
              onChangeText={this.messageInput.bind(this)}/>
          </View>
          <View style={styles.sendContainer}>
            <TouchableHighlight
              underlayColor="#4e4273"
              onPress={() => this.onSendPress()}>
              <Text style={styles.sendLabel}>
                SEND
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}