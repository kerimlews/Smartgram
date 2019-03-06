import gql from 'graphql-tag';

export const FIND_USER = gql`
    query findUser($id: Int!) {
        findUsers(id: $id) {
            id,
            email,
            fullName,
            username,
            isActive
        }
    }
`;
