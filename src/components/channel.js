'use strict';
import React, { Component } from 'react';
import { ListView, TouchableHighlight, NavigatorIOS, TextInput, AppRegistry, Text, Image, View, StyleSheet } from 'react-native';
import SendBird from 'sendbird';
import _ from 'lodash';

import Chat from './chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  listContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 10
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fc',
    borderBottomWidth: 0.5,
    borderColor: '#D0DBE4',
    padding: 5
  },
  listIcon: {
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 15
  },
  channelIcon: {
    width: 30,
    height: 30
  },
  listInfo: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  titleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#60768b',
  },
  memberLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#abb8c4',
  }
});

const PULLDOWN_DISTANCE = 40;

export default class Channel extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource(
      {rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      channelList: [],
      dataSource: dataSource.cloneWithRows([]),
      page: 0,
      next: 0,
      channelName: ''
    };
  }

  componentWillMount() {
    this.getChannelList(1);
  }

  getChannelList(page) {
    if (page != 0) {
      SendBird.getChannelList({
        page: page,
        limit: 20,
        successFunc : (data) => {
          this.setState({channelList: this.state.channelList.concat(data.channels)}, () => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.state.channelList),
              page: data.page,
              next: data.next
            });
          });
        },
        errorFunc: (status, error) => {
          console.log(status, error);
        }
      });
    }
  }

  onChannelPress(url) {
    SendBird.joinChannel(
      url,
      {
        successFunc: (data) => {
          SendBird.connect({
            successFunc: (data) => {
              SendBird.getChannelInfo((channel) => {
                SendBird.connect({
                  successFunc: (data) => {
                    this.props.navigator.push({
                      title: 'Chat',
                      component: Chat
                    });
                  },
                  errorFunc: (status, error) => {
                    console.log(status, error);
                  }
                });
              });
            },
            errorFunc: (status, error) => {
              console.log(status, error);
            }
          });
        },
        errorFunc: (status, error) => {
          console.log(status, error);
        }
      }
    );
  }

  renderData(rowData) {
    const imageURI = rowData.cover_img_url;
    let processedThumbnail = '';
    if (!_.isEmpty(imageURI)) {
      processedThumbnail = imageURI.split(':/');
      processedThumbnail = `${processedThumbnail[0]}s:/${processedThumbnail[1]}`;
    }
    return (
      <TouchableHighlight
        onPress={() => this.onChannelPress(rowData.channel_url)}>
        <View style={styles.listItem}>
          <View style={styles.listIcon}>
            <Image
              style={styles.channelIcon}
              source={{ uri: processedThumbnail}} />
          </View>
          <View style={styles.listInfo}>
            <Text style={styles.titleLabel}>
              # {rowData.name}
            </Text>
            <Text style={styles.memberLabel}>
              {rowData.member_count} members
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderData.bind(this)}
            onEndReached={() => this.getChannelList(this.state.next)}
            onEndReachedThreshold={PULLDOWN_DISTANCE}/>
        </View>
      </View>
    );
  }
}