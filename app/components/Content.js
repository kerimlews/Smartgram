import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import style from './styles/content';

const ACTIVE_TAB = gql`
  {
    navigation @client {
      activeTab
    }
  }
`

function swipe(activeTab, client, type) {
  console.log(activeTab, client, type)

  const query = {}
  console.log(query)
  switch (type) {
    case 'LEFT':
      activeTab = activeTab === 0 ? activeTab : activeTab - 1;
      //client.writeData({ data: { navigation: { ...query, activeTab } } });
      break;
    case 'RIGHT':
      activeTab = activeTab === 4 ? activeTab : activeTab + 1;
      //client.writeData({ data: { navigation: { ...query, activeTab } } });
      break;
    default: null
  }
}

// ADD SIGN OUT TO SETTTINGS MAKE FLATLIST
const Content = () => (
  <Query query={ACTIVE_TAB}>
  {({ data: { navigation: { activeTab }, client , error, loading }}) => {
      console.log(client);

      if(loading)
        return <Text>loadingggggg</Text>
      if (error)
        console.log(error);
      return (
        <Swipeable
          renderLeftActions={() => swipe(activeTab, client, 'LEFT')}
          renderRightActions={() => swipe(activeTab, client, 'RIGHT')}
        >
          <View style={style.content}>
              { activeTab === 0 &&  <Text>HOME</Text>}
              { activeTab === 1 &&  <Text>BOOK</Text>}
              { activeTab === 2 &&  <Text>MESSAGE</Text>}
              { activeTab === 3 &&  <Text>NOTICE</Text>}
              { activeTab === 4 &&  <Text>SETTINGS</Text>}
          </View>
        </Swipeable>
      );
    }
  }
  </Query>
);

export default Content;
