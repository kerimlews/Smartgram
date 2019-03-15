import React, { useState, Fragment } from 'react';
import { View, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Query } from 'react-apollo';
import { Appbar, Text } from 'react-native-paper';
import { isEmpty } from 'lodash';
import { SEARCH_USERS } from './queries/search-bar';
import { withNavigation } from 'react-navigation';

import ShowProfile from './SearcBarComponents/show-profile';

function SearchBar({ navigation }) {
    const [ page, setPage ] = useState(1);
    const [ search, setSearch ] = useState('');
    const [ isOpen, setSearchContent ] = useState(false);
    const [ profileId, setProfile ] = useState(null);

    const variables = {
        page,
        search
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

                const addPadding = !isOpen ? { paddingLeft: 20, paddingRight: 20 } : null;
                return (
                    <View style={{ height: '100%' }}>
                    <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                        { !isOpen
                            ? <Appbar.Action
                                icon="photo-camera"
                                color="#599eff"
                                onPress={this._goBack}
                            />
                            : <Appbar.BackAction
                                onPress={() => setSearchContent(false)}
                            />
                        }
                        <View style={{ flex: 1, height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 8, ...addPadding }}>
                                <View style={{ borderColor: '#d1cfcf', borderWidth: 1, borderRadius: 10, position: 'relative', alignItems: 'center', flexDirection: 'row', flex: 1 }} >
                                    <View style={{ position: 'absolute', marginLeft: 20, marginTop: 5 }}>
                                        <Ionicons name="md-search" size={20} color="gray" />
                                    </View>
                                    { isOpen
                                        ?  <TextInput
                                                autoFocus
                                                value={search}
                                                style={{ color: 'gray', paddingLeft: 45, flex: 1}}
                                                onChangeText={text => setSearch(text)}
                                                onFocus={() => {
                                                    setProfile(null);
                                                }}
                                                placeholder="Search for frends..."
                                            />
                                        :   <TouchableOpacity onPress={() => setSearchContent(true)}>
                                                <View style={{ minWidth: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: 'gray', marginLeft: 10 }}>Search for frends...</Text>
                                                </View>
                                            </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <Appbar.Action
                                icon="message"
                                color="#ffca59"
                                onPress={() => navigation.navigate('Message')}
                            />
                        </Appbar.Header>
                        { isOpen &&
                            <View style={{ positon: 'absolute', width: '100%', height: '100%' }}>
                                { isEmpty(profileId) ?
                                    <FlatList
                                        data={users}
                                        refreshing={loading}
                                        onRefresh={refetch}
                                        keyExtractor={_keyExtractor}
                                        renderItem={_renderItem}
                                    />
                                    :
                                    <ShowProfile
                                        id={profileId}
                                    />
                                }
                            </View>}
                        </View>
                );
            }
        }
            
        </Query>
    );
}

export default withNavigation(SearchBar);
