import React, { useState } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
import { Query, Subscription, Mutation } from 'react-apollo';
import { GET_CONVERSATION, MESSAGE_SUBS, SEND_MESSAGE } from '../queries/messages';
import ConversationItem from './components/conversation-item';

export default function MessageDetails({ navigation }) {
  const [ message, setMessage ] = useState('');
  const [ page, setPage ] = useState(1);

  const variables = {
    id: navigation.state.params.id,
    page
  };

  return (
    <Query query={GET_CONVERSATION} variables={variables}>
    {
      ({ data: { getConversation }, error, loading, refetch }) => {

        const _keyExtractor = item => item.id;
        const _renderItem = ({ item }) => <ConversationItem item={item} />

        return (
          <View>
            <Subscription subscription={MESSAGE_SUBS}>
            {({ data , error }) => {

              const newMessages = data ? getConversation.concat(data.message) : getConversation;

              return (
                <FlatList
                  data={getConversation ? newMessages : []}
                  refreshing={loading}
                  onRefresh={refetch}
                  keyExtractor={_keyExtractor}
                  renderItem={_renderItem}
                />
              );
            }}
            </Subscription>
            <View>
              <TextInput
                style={{height: 40, borderBottomColor: '#47315a',
                borderBottomWidth: 1, width: 200}}
                placeholder="Type message"
                onChangeText={text => setMessage(text)}
                value={message}
              />
              <Mutation mutation={SEND_MESSAGE}>
                {addMessage =>
                    <Button
                      onPress={() => addMessage({ variables: { ...variables, message } })}
                      title="Send"
                      color="#841584"
                    />
                }
              </Mutation>

            </View>
          </View>
        );
      }
    }
    </Query>
  );
}
