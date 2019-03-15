import gql from 'graphql-tag';

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