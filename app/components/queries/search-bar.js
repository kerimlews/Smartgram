import gql from 'graphql-tag';

export const SEARCH_USERS = gql`
    query findUsers($page: Int!, $search: String) {
        findUsers(page: $page, search: $search) {
            id,
            email,
            firstName,
            lastName,
            username,
            isActive
        }
    }
`;
