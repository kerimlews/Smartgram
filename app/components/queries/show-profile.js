import gql from 'graphql-tag';

export const FIND_USER = gql`
    query findUser($id: String!) {
        findUser(id: $id) {
            id,
            email,
            fullName,
            username,
            isActive
        }
    }
`;

export const START_CONVERSATION = gql`
    mutation addConversation($user2: String!, $message: String) {
        addConversation(user2: $user2, message: $message) {
          id,
          message,
          attached
        }
    }
`;

