import React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import Button from 'components/Button';
import gql from 'graphql-tag';

const PROFILE = gql`
  {
      user @client {
        username,
        firstName,
        lastName,
        email
      }
  }
`;

const Book = () => (
  <Query query={PROFILE}>
  {({ data: { user: { firstName, lastName, username, email } } }) =>
      <View>
        <Text>{lastName}</Text>
        <Text>{firstName}</Text>
        <Text>{username}</Text>
        <Text>{email}</Text>
      </View>
  }
  </Query>
)

export default Book;
