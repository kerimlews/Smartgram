import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            username,
            email,
            firstName,
            lastName,
            token
        }
    }
`
export const REGISTRATION = gql`
    mutation registration($email: String!, $username: String!, $firstName: String!, $lastName: String! $password: String!) {
        registration(email: $email, username: $username, firstName: $firstName, lastName: $lastName, password: $password) {
            username,
            email,
            firstName,
            lastName,
            token
        }
    }
`
export const LOADING = gql`
    {
        user @client {
            isLoading
        }
    }
`;
