import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Query } from 'react-apollo';
import { GET_CONVERSATIONS } from '../queries/messages';
import ConversationsItem from './components/conversations-item';

export default function Conversations({ navigation }) {
  const [ page, setPage ] = useState(1);
  const variables = { page };

  return (
    <Query query={GET_CONVERSATIONS} variables={variables} fetchPolicy="network-only">
    {
      ({ data: { getConversations }, error, loading, refetch }) => {

        const _keyExtractor = item => item.id;
        const _renderItem = ({ item }) => (
          <ConversationsItem
            item={item}
            navigate={navigation.navigate}
          />
        );

        const data = getConversations ? getConversations : [];

        return (
          <View style={{ flex: 1, backgroundColor: '#f4f6f7' }}>
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

