import React, { useState, Fragment } from 'react';
import { View, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Appbar, Text, Badge } from 'react-native-paper';
import { isEmpty } from 'lodash';
import { withNavigation } from 'react-navigation';

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

export default function SearchContent({ navigation }) {
  console.log(navigation)
    const [ page, setPage ] = useState(1);
    const [ isOpen, setSearchContent ] = useState(false);
    const [ profileId, setProfile ] = useState(null);

    const UNREADED_MESSAGE = gql` { unReadedMeessage }`;

    const variables = {
        page,
        search: navigation.state.params.search
    };

    return (
        <Query query={SEARCH_USERS} variables={variables}>
        {
            ({ data, error, loading, refetch }) => {

                const users = isEmpty(data) ? [] : data.findUsers;
                const _keyExtractor = item => item.id;

                const _renderItem = ({ item }) => (
                    <TouchableOpacity onPress={() => setProfile(item.id)}>
                        <View style={{ flex: 1, padding: 10, alignItems: 'center', borderBottomColor: 'gray', borderWidth: 1, flexDirection: 'row', height: 80 }}>
                            <Image
                                style={{ width: 50 , height: 50, marginRight: 15}}
                                source={{uri: 'https://www.pngarts.com/files/3/Avatar-Transparent-Image.png'}}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{item.firstName} </Text>
                                <Text>{item.lastName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );

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
