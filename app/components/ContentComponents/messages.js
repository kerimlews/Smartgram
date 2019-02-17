import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { Query, Subscription, Mutation } from 'react-apollo';
import { GET_CONVERSATIONS, GET_CONVERSATION, MESSAGE_SUBS, SEND_MESSAGE } from './queries/messages';
import MessageItem from './components/messageItem';

export default function Messages() {
  const [ page, setPage ] = useState(1);
  const [ search, setSearch ] = useState('');
  const [ content, setContent ] = useState(true);
  const [ id, setId ] = useState(null);
  const [ message, setMessage ] = useState('');

  function handleChangeContent(id) {
    console.log(id);
    setId(id);
    setPage(1);
    setContent(!content);
  }

  const variables = {
      id,
      page,
      search,
      message,
      user2: id
  };

  return (
    content ?
      <Query query={GET_CONVERSATIONS} variables={variables}>
      {
        ({ data: { getConversations }, error, loading, refetch }) => {

          const _keyExtractor = item => item.id;

          const _renderItem = ({ item }) => (
            <MessageItem
              id={item.id}
              item={item}
              handleChangeContent={handleChangeContent}
            />
          );

          return (
              <FlatList
                  data={getConversations || []}
                  refreshing={loading}
                  onRefresh={refetch}
                  keyExtractor={_keyExtractor}
                  renderItem={_renderItem}
              />
          );
        }
      }
      </Query>
      :
      <Query query={GET_CONVERSATION} variables={variables}>
      {
        ({ data: { getConversation }, error, loading, refetch }) => {
          const _keyExtractor = item => item.id;

          const _renderItem = ({ item }) => (
            <View>
              <Text>{item.message}</Text>
              <Text>{item.createdAt}</Text>
              <Text>{item.isSeen && 'Seen'}</Text>
            </View>
          );

          return (
            <View>
              <Subscription subscription={MESSAGE_SUBS}>
              {({ data , error }) => {

                console.log('subs', data, error)

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
              }
                
              }
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
                      onPress={() => addMessage({ variables })}
                      title="Send"
                      color="#841584"
                      accessibilityLabel="Learn more about this purple button"
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
