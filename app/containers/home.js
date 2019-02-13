import React from 'react';
import { View, Text } from 'react-native';

import Navigation from 'components/Navigation';
import Content from 'components/Content';
import Stores from 'components/Stores';

import style from './styles/home';

const Home = () =>
  <View style={style.home}>
      <Navigation />
      <Content />
      <Stores />
  </View>

export default Home;
