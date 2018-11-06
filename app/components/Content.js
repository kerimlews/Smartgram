import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import style from './styles/content';
import GestureRecognizer, { swipeDirections } from 'containers/utils/gesture-recognizer';

import Settings from './ContentComponents/settings';
import Book from './ContentComponents/book';
import Home from './ContentComponents/home';
import Messages from './ContentComponents/messages';
import Notice from './ContentComponents/notice';

const ACTIVE_TAB = gql`
  {
    navigation @client {
      activeTab
    }
  }
`

function onSwipe(event, activeTab, client) {
    console.log(event);

      //  activeTab = activeTab === 0 ? 0 : activeTab + 1;

      //  activeTab = activeTab === 4 ? 4 : activeTab - 1;


}

// ADD SIGN OUT TO SETTTINGS MAKE FLATLIST
const Content = () => (
  <Query query={ACTIVE_TAB}>
  {({ data: { navigation: { activeTab }, error, loading, client }}) => {
      ///console.log(client);

      if(loading)
        return <Text>loadingggggg</Text>
      if (error)
        console.log(error);
      return (
        <ScrollView
          horizontal={true}
          onScrollBeginDrag={(event) => console.log(event)}
        >
          <View style={style.content} >
              { activeTab === 0 &&  <Home />}
              { activeTab === 1 &&  <Book />}
              { activeTab === 2 &&  <Messages />}
              { activeTab === 3 &&  <Notice />}
              { activeTab === 4 &&  <Settings />}
            </View>
            <View stlye={style.content} >
            </View>
        </ScrollView>
      );
    }
  }
  </Query>
);

export default Content;
