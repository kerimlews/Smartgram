import React, { useState, Fragment } from 'react';
import SearchHeader from 'headers/SearchHeader';
import SearchList from './components/search-list';

export default function SearchContent() {
    const [ search, setSearch ] = useState('');

    return (
        <Fragment>
            <SearchHeader
                setSearch={setSearch}
                search={search}
            />
            <SearchList
                search={search}
            />
        </Fragment>
    );
}
