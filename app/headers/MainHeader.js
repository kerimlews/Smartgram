import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Appbar, Text, Badge } from 'react-native-paper';

const UNREADED_MESSAGE = gql` { unReadedMeessage }`;

export default function MainHeader({ navigation }) {

    const CameraButton = (
        <Appbar.Action
            icon="photo-camera"
            color="#599eff"
            onPress={this._goBack}
        />
    );

    const Search = (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
            <View style={{ flex: 1, height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 8, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ borderColor: '#d1cfcf', borderWidth: 1, borderRadius: 10, position: 'relative', alignItems: 'center', flexDirection: 'row', flex: 1 }} >
                    <View style={{ position: 'absolute', marginLeft: 20, marginTop: 5 }}>
                        <Ionicons name="md-search" size={20} color="gray" />
                    </View>
                    <View style={{ minWidth: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'gray', marginLeft: 10 }}>Search for frends...</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    const MessageButton = (
        <View style={{ position: 'relative' }}>
            <Appbar.Action
                icon="message"
                color="#ffca59"
                onPress={() => navigation.navigate('Message')}
            />
            <Query query={UNREADED_MESSAGE}>
                {({ data: { unReadedMeessage }, loading }) => !loading && unReadedMeessage > 0 &&
                    <Badge
                        size={17}
                        style={{ position: 'absolute', top: 5, right: 5 }}
                    >
                        {unReadedMeessage}
                    </Badge>
                }
            </Query>
        </View>
    );
    
    return (
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
            <CameraButton />
            <Search />
            <MessageButton />    
        </Appbar.Header>
    );
}

