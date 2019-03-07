import React from 'react';
import { View, Text, Button } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { showMessage } from 'react-native-flash-message';
import { FIND_USER, START_CONVERSATION } from '../queries/show-profile';

const onError = ({ message }) => showMessage({
    message,
    type: 'danger'
});

const update = () => showMessage({
    message: "Conversation added !",
    type: 'info'
});

export default function ShowProfile({ id }) {
    const variables= { id };

    return (
        <Query query={FIND_USER} variables={variables} >
        {
            ({ data: { findUser }, error, loading }) => {
                if (loading)
                    return <Text>loading...</Text>
                
                const { id, fullName, email, isActive, username } = findUser;
                const params = { user2: id, message: "Cao :)" };

                return (
                    <View>
                        <Text>{fullName}</Text>
                        <Text>{email}</Text>
                        <Text>{username}</Text>
                        <Text>{ isActive ? 'Active' : 'Offline' }</Text>
                        <Mutation mutation={START_CONVERSATION} onError={onError} update={update}>
                            {addConversation =>
                                <Button
                                    onPress={() => addConversation({ variables: params })}
                                    title="Start conversation"
                                    color="blue"
                                />
                            }
                        </Mutation>
                        
                        <Button
                            onPress={() => null}
                            title="Call"
                            color="green"
                        />
                    </View>
                );
            }
        }
        </Query>
    );
}