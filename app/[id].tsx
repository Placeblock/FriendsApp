import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Attribute, Attributes, Friend, FriendAttribute } from '@/constants/Types';
import {default as FriendAttrib} from '@/components/FriendAttribute';
import { useSearchBar } from '@/hooks/useSearchBar';
import SearchInput from '@/components/SearchInput';
import AddAttributeModal from '@/components/AddAttributeModal';
import AddButton from '@/components/AddButton';
import ConfirmModal from '@/components/ConfirmModal';

export default function Page() {
    const { id } = useLocalSearchParams<{id: string}>();
    const [friend, setFriend] = useState<Friend>();
    const [attributes, setAttributes] = useState<Attributes>([]);
    const [showAddAttributeModal, setShowAddAttributeModal] = useState(false);
    const [showDeleteAttributeModal, setShowDeleteAttributeModal] = useState(false);
    const deleteID = useRef<number>();
    const {filteredItems, updateQuery} = useSearchBar({items: attributes, key: a => a[0].name})
    const navigation = useNavigation();
    
    const db = SQLite.useSQLiteContext();

    useEffect(() => {
        navigation.setOptions({ headerTitle: friend?.name });
    }, [friend])

    useEffect(() => {
        if (id == undefined) return;
        (async () => {
            const loadedFriend = await db.getFirstAsync<Friend>("SELECT * FROM friends WHERE rowid = ?", Number(id))
            if (loadedFriend == null) return;
            setFriend(loadedFriend)
            await loadAttributes();
        })();
    }, [id]);

    const loadAttributes = async () => {
        const availableAttributes = await db.getAllAsync<Attribute>("SELECT * FROM attributes")
        const friendAttributes = await db.getAllAsync<FriendAttribute>("SELECT * FROM friend_attributes WHERE friend_id = ?", Number(id));
        const loadedAttributes: Attributes = []
        for (let availibleAttribute of availableAttributes) {
            const values: FriendAttribute[] = [];
            for (let friendAttribute of friendAttributes) {
                if (friendAttribute.attribute_id === availibleAttribute.id) {
                    values.push(friendAttribute);
                }
            }
            loadedAttributes.push([availibleAttribute, values])
        }
        setAttributes(loadedAttributes);
    }

    const showAddAttribute = () => setShowAddAttributeModal(true)
    const hideAddAttribute = () => setShowAddAttributeModal(false)

    const handleNewAttribute = () => {
        loadAttributes();
        hideAddAttribute()
    }

    const requestDeleteAttribute = (id: number) => {
        deleteID.current = id;
        setShowDeleteAttributeModal(true)
    }
    const hideDeleteAttribute = () => setShowDeleteAttributeModal(false)

    const deleteAttribute = async () => {
        if (deleteID.current === undefined) return;
        await db.runAsync("DELETE FROM attributes WHERE rowid = ?", deleteID.current)
        await loadAttributes();
        hideDeleteAttribute();
    }

    return <View style={{flex:  1}}>
        <SearchInput onSearch={updateQuery}/>
        <View style={{borderBottomColor: "white", borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 20}}></View>
        <ScrollView>
            {filteredItems.map(item => <FriendAttrib key={item[0].id} friendID={Number(id)} id={item[0].id} 
                name={item[0].name} defaultValues={item[1]} onDelete={() => requestDeleteAttribute(item[0].id)}/>)}
        </ScrollView>
        <AddButton onAdd={showAddAttribute}/>
        <AddAttributeModal visible={showAddAttributeModal} onClose={hideAddAttribute} onAdd={handleNewAttribute}/>
        <ConfirmModal visible={showDeleteAttributeModal} 
            description='diese Kategorie FÜR ALLE FREUNDE löschen möchtest' 
            onClose={hideDeleteAttribute} onConfirm={deleteAttribute}/>

    </View>;
}