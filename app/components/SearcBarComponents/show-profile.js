import React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import { FIND_USER } from '../queries/show-profile';

export default function ShowProfile({ id }) {
    return (
        <Query query={FIND_USER} variables={id} >
        {
            ({ data: { findUser }, error, loading }) => {
                if (loading)
                    return <Text>loading...</Text>

                const { fullName, email, isActive, username } = findUser;

                return
                    <View>
                        <Text>{fullName}</Text>
                        <Text>{email}</Text>
                        <Text>{username}</Text>
                        <Text>{ isActive ? 'Active' : 'Offline' }</Text>
                    </View>
            }
        }
        </Query>
    );
}