import React, { useState, Fragment } from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Query } from 'react-apollo';
import { SEARCH_USERS } from './queries/search-bar';

export default function SearchBar() {
    const [ page, setPage ] = useState(1);
    const [ search, setSearch ] = useState('');
    const [ isOpen, setSearchContent ] = useState(false);

    const variables = {
        page,
        search
    };

    return (
        <Query query={SEARCH_USERS} variables={variables}>
        {
            ({ data: { findUsers }, error, loading }) => {
                return (
                    <Fragment>
                        <View style={{ flexDirection: 'row', height: 50, marginTop: Expo.Constants.statusBarHeight, width: '100%', backgroundColor: 'black', alignItems: 'center' }}>
                            { isOpen &&
                                <TouchableWithoutFeedback onPress={() => setSearchContent(false)}>
                                    <View style={{ marginLeft: 15 }}>
                                        <Ionicons name="md-arrow-back" size={25} color="white" />
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                            <View style={{ position: 'relative', alignItems: 'center', flexDirection: 'row', flex: 1 }} >
                                <View style={{ position: 'absolute', marginLeft: 25, marginTop: 5 }}>
                                    <Ionicons name="md-search" size={25} color="white" />
                                </View>
                                <TextInput
                                    style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, color: 'white', paddingLeft: 65, flex: 1}}
                                    onChangeText={(text) => setSearch({text})}
                                    value={search}
                                    onFocus={() => setSearchContent(true)}
                                    onBlur={() => setSearchContent(false)}
                                    placeholder="Search for frends..."
                                />
                            </View>
                        </View>
                        <View style={{ display: isOpen ? 'flex' : 'none', positon: 'absolute', width: '100%', height: '100%', backgroundColor: 'blue' }}>
                        </View>
                    </Fragment>
                );
            }
        }
            
        </Query>
    );
}