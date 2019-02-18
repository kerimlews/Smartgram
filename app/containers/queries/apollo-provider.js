import gql from 'graphql-tag';

export const CHECK_TOKEN = gql`
  {
    checkToken
      {
        email
        username,
        firstName,
        lastName
      }
  }
`;
