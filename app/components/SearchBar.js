import React, { useState, Fragment } from 'react';
import { View, Image, TextInput, TouchableWithoutFeedback, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Query } from 'react-apollo';
import { isEmpty } from 'lodash';
import { SEARCH_USERS } from './queries/search-bar';
import ShowProfile from './SearcBarComponents/show-profile';

export default function SearchBar() {
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

                return (
                    <Fragment>
                        <View style={{ flexDirection: 'row', height: 50, marginTop: Expo.Constants.statusBarHeight, width: '100%', backgroundColor: 'black', alignItems: 'center' }}>
                            { isOpen &&
                                <TouchableWithoutFeedback onPress={() => setSearchContent(false)}>
                                    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                                        <Ionicons name="md-arrow-back" size={25} color="white" />
                                    </View>
                                </TouchableWithoutFeedback>
                            }
                            <View style={{ position: 'relative', alignItems: 'center', flexDirection: 'row', flex: 1 }} >
                                <View style={{ position: 'absolute', marginLeft: 25, marginTop: 5 }}>
                                    <Ionicons name="md-search" size={25} color="white" />
                                </View>
                                { isOpen
                                        ?  <TextInput
                                                autoFocus
                                                value={search}
                                                style={{height: 40, borderColor: 'gray', borderBottomWidth: 1, color: 'white', paddingLeft: 65, flex: 1}}
                                                onChangeText={text => setSearch(text)}
                                                placeholder="Search for frends..."
                                            />
                                        :   <TouchableOpacity onPress={() => setSearchContent(true)}>
                                                <View style={{ height: 40, minWidth: '100%', alignItems: 'flex-start', justifyContent: 'center', borderColor: 'gray', borderBottomWidth: 1, color: 'white'}}>
                                                    <Text style={{ color: 'white', paddingLeft: 65 }}>Search for frends...</Text>
                                                </View>
                                            </TouchableOpacity>
                                }
                            </View>
                        </View>
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
                            </View>
                        }
                    </Fragment>
                );
            }
        }
            
        </Query>
    );
}