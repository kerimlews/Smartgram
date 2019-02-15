import React from 'react';
import { View, Text, Button } from 'react-native';
import gql from 'graphql-tag';
import { compose, graphql, withApollo  } from 'react-apollo';
import { showMessage } from 'react-native-flash-message';

export const START_CONVERSATION = gql`
    mutation addConversation($user2: String!, $message: String) {
        addConversation(user2: $user2, message: $message) {
          id,
          message,
          attached,
          isSeen,
          isDeleted,
          updatedAt,
          createdAt
        }
    }
`

const update = (cache, { data: { addConversation } }) => {
    console.log(addConversation);
}

const onError = ({ message }) => showMessage({
    message,
    type: 'danger'
});

export default compose(
    graphql(START_CONVERSATION, {
        name: 'addConversation',
        options: { update, onError }
    })
)(Home);

function Home({ addConversation }) {
    const user2 = 'cjs61zbxz5weo0b00u5jh6sqw';
    const message = 'dzesi kera sta mai ?';

    const variables = { variables: {  user2, message } };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => addConversation(variables)}
          title="Start conversation"
          color="#841584"
        />
      </View>
    );
}
