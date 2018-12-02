import React, { Component } from 'react';
import { View, Text, PanResponder } from 'react-native';
import { Query, withApollo  } from 'react-apollo';
import gql from 'graphql-tag';
import style from './styles/content';

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
class Content extends Component {
  constructor(props) {
      super(props)
      const { client } = this.props;

      this._panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

       onPanResponderMove:  (e, { dx }) => {
        console.log(client.readQuery({ query: ACTIVE_TAB }))
       //  const activeTab = client.readQuery({ ACTIVE_TAB });
         /*console.log(activeTab);
          if(dx < 0)
            client.writeData({ data: { navigation: { activeTab: activeTab + 1 , __typename: 'navigation' } } })
          if(dx > 0)
            client.writeData({ data: { navigation: { activeTab: activeTab - 1 , __typename: 'navigation' } } })
        */
          }
    })
  }

  render() {
    return (
      <Query query={ACTIVE_TAB}>
      {({ data: { navigation: { activeTab }, error, loading, client }}) => {
          ///console.log(client);

          if(loading)
            return <Text>loadingggggg</Text>
          if (error)
            console.log(error);
          return (
              <View style={style.content} {...this._panResponder.panHandlers} >
                  { activeTab === 0 &&  <Home />}
                  { activeTab === 1 &&  <Book />}
                  { activeTab === 2 &&  <Messages />}
                  { activeTab === 3 &&  <Notice />}
                  { activeTab === 4 &&  <Settings />}
              </View>
          );
        }
      }
      </Query>
    );
  };
}

export default withApollo(Content);
