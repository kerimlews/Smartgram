import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { isEmpty } from 'lodash';
import gql from 'graphql-tag';
import SearchItem from './search-item';

export default function SearchList({ search }) {
    const [ page, setPage ] = useState(1);

    const variables= {
        search,
        page
    };

    return (
        <Query query={SEARCH_USERS} variables={variables}>
        {
            ({ data, error, loading, refetch }) => {

                const users = isEmpty(data) ? [] : data.findUsers;
                
                const _keyExtractor = item => item.id;
                const _renderItem = ({ item }) => <SearchItem item={item} />

                return (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={users}
                            refreshing={loading}
                            onRefresh={refetch}
                            keyExtractor={_keyExtractor}
                            renderItem={_renderItem}
                        />
                    </View>
                );
            }
        }
        </Query>
    );
}

const SEARCH_USERS = gql`
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
