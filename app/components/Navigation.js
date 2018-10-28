import React from 'react';
import { View, Text } from 'react-native';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import NavItem from './NavigationComponents/nav-item';
import style from './styles/navigation';

const tabs = [
  { key: 0, value: 'H' },
  { key: 1, value: 'B' },
  { key: 2, value: 'M' },
  { key: 3, value: 'N' },
  { key: 4, value: 'S' }
];

const ACTIVE_TAB = gql`
  {
    navigation @client {
      activeTab
    }
  }
`

const Navigation = () => (
  <Query query={ACTIVE_TAB}>
  {({ data: { navigation: { activeTab } }, error, loading, client }) => {
    if (loading)
      return <Text>loading navigation</Text>
    return (
        // ADD ANIMATIONS
          <View style={style.nav}>
          {
            tabs.map((tab) => (
              <NavItem
                key={tab.key}
                tab={tab}
                activeTab={activeTab}
                client={client}
                style={style.navItem}
                active={style.active}
              />
            ))
          }
          </View>
    )}
  }
  </Query>
);

export default Navigation;
