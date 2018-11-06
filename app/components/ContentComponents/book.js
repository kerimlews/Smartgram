import React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import Button from 'components/Button';
import gql from 'graphql-tag';

const PROFILE = gql`
  {
      username @client
      email @client
  }
`
const Book = () => (
  <Query query={PROFILE}>
  { ({ data: { username, email }, loading, error }) => {

    if (loading)
      return <Text>LOADINGGGGGG</Text>
    return (
      <View>
        <Text>{username}</Text>
        <Text>{email}</Text>
      </View>
    );
  }}
  </Query>
);

export default Book;
