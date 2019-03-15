import React, { Fragment, useState } from 'react';
import { Headline  } from 'react-native-paper';
import Search from 'components/SearchBar';

export default function Home() {
    return (
        <Fragment>
            <Search />
            <Headline>HOMEEEE</Headline>
        </Fragment>
    );
}

Home.navigationOptions = {
    header: null,
};