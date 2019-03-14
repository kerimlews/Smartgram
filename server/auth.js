{ isOpen &&
    <View style={{ positon: 'absolute', width: '100%', height: '100%' }}>
        { isEmpty(profileId) ?
            <FlatList
                data={users}
                refreshing={loading}
                onRefresh={refetch}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
            />
            :
            <ShowProfile
                id={profileId}
            />
        }
    </View>}