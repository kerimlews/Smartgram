import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Appbar, Badge } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

function SearchHeader({ navigation, search, setSearch }) {
    const UNREADED_MESSAGE = gql` { unReadedMeessage }`;

    function BackButton() {
        return (
            <Appbar.BackAction
                onPress={() => navigation.goBack()}
            />
        );
    }

    function SearchInput() {
        return (
            <View style={{ flex: 1, height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 8 }}>
                <View style={{ borderColor: '#d1cfcf', borderWidth: 1, borderRadius: 10, position: 'relative', alignItems: 'center', flexDirection: 'row', flex: 1 }} >
                    <View style={{ position: 'absolute', marginLeft: 20, marginTop: 5 }}>
                        <Ionicons name="md-search" size={20} color="gray" />
                    </View>
                    <TextInput
                        autoFocus
                        value={search}
                        style={{ color: 'gray', paddingLeft: 45, flex: 1}}
                        onChangeText={text => setSearch(text)}
                        placeholder="Search for frends..."
                    />
                </View>
            </View>
        );
    } 

    function MessageButton() {
        return (
            <View style={{position: 'relative'}}>
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
    } 

    return (
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
            {BackButton()}
            {SearchInput()}
            {MessageButton()}
        </Appbar.Header>
    );
}

export default withNavigation(SearchHeader);
