import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Query } from 'react-apollo';
import { signOut } from 'containers/utils/util';
import gql from 'graphql-tag';

const PROFILE = gql`
  {
      user @client {
        id
        username
        firstName
        lastName
        email
      }
  }
`;

const Settings = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Query query={PROFILE}>
    {({ data: { user: { firstName, lastName, username, email } }, loading }) =>
        <View>
          <Text>{lastName}</Text>
          <Text>{firstName}</Text>
          <Text>{username}</Text>
          <Text>{email}</Text>
        </View>
    }
    </Query>
    <Button
      icon="power-settings-new"
      mode="contained"
      onPress={() => signOut(navigation)}
    >
      Sign out
    </Button>
  </View>
);

export default Settings;
