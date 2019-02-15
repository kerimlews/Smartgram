import React, { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { Query } from 'react-apollo';
import { GET_CONVERSATIONS, GET_CONVERSATION } from './queries/messages';
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
      search
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
              <FlatList
                  data={getConversation || []}
                  refreshing={loading}
                  onRefresh={refetch}
                  keyExtractor={_keyExtractor}
                  renderItem={_renderItem}
              />
              <TextInput
                style={{height: 40, borderBottomColor: '#47315a',
                borderBottomWidth: 1, width: 200}}
                placeholder="Type message"
                onChangeText={text => setMessage({text})}
                value={message}
              />
            </View>
          );
        }
      }
      </Query>
  );
}
