import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const NavItem = ({ tab, activeTab, client, style, active }) => (
  <TouchableOpacity
    onPress={() => client.writeData({ data: { navigation: { activeTab: tab.key, __typename: 'navigation' } } })}
    style={activeTab === tab.key ? active : style}
  >
        <Text>{tab.value}</Text>
  </TouchableOpacity>
)

export default NavItem;
