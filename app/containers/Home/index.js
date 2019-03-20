import React, { Fragment, useState } from 'react';
import { Headline  } from 'react-native-paper';

export default function Home() {
    return (
        <Fragment>
            <Headline>HOMEEEE</Headline>
        </Fragment>
    );
}

Home.navigationOptions = {
    header: null,
};