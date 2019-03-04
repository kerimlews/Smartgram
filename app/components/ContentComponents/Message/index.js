import React, { useState } from 'react';
import Conversations from './components/conversations';
import Conversation from './components/conversation';

export default function Messages() {
  const [ content, setContent ] = useState(true);
  const [ page, setPage ] = useState(1);
  const [ id, setId ] = useState(null);
  const token = async () => await AsyncStorage.getItem('expoToken');

  function handleChangeContent(id) {
    setId(id);
    setPage(1);
    setContent(!content);
  }

  const variables = {
    id,
    page
  };

  return (
    content
      ? <Conversations variables={variables} openConversation={handleChangeContent} />
      : <Conversation variables={variables} />
  );
}
