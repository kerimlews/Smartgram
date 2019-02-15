import gql from 'graphql-tag';

export const GET_CONVERSATIONS = gql`
  query getConversations($page: Int!, $search: String) {
    getConversations(page: $page, search: $search) {
      id,
      message,
      name,
      startedAt,
      logo,
      isActive
    }
  }
`;

export const GET_CONVERSATION = gql`
  query getConversation($id: String!, $page: Int!) {
    getConversation(id: $id, page: $page) {
      id,
      message,
      attached,
      isSeen,
      isDeleted,
      createdAt,
      updatedAt,
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($id: String!, message: String) {
    addMessage(id: $id, message: $message) {
      id
      message
      isSeen
      createdAt
    }
  }
`;
