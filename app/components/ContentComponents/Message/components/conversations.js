import React from 'react';
import { FlatList, View } from 'react-native';
import { Query } from 'react-apollo';
import { GET_CONVERSATIONS } from '../../queries/messages';
import ConversationsItem from './components/conversations-item';

export default function Conversations({ variables, openConversation }) {
  return (
    <Query query={GET_CONVERSATIONS} variables={variables}>
    {
      ({ data: { getConversations }, error, loading, refetch }) => {

        const _keyExtractor = item => item.id;
        const data = getConversations || [];

        const _renderItem = ({ item }) => (
          <ConversationsItem
            item={item}
            openConversation={openConversation}
          />
        );

        return (
          <View style={{ width: '100%', height: '100%', padding: 10, backgroundColor: '#f4f6f7' }}>
            <FlatList
                data={data}
                refreshing={loading}
                onRefresh={refetch}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
            />
            </View>
        );
      }
    }
    </Query>
  );
}
