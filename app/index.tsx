import { View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useRef, useState } from 'react';
import { Friend } from '@/constants/Types';
import FriendList from '@/components/FriendList';
import AddFriendModal from '@/components/AddFriendModal';
import AddButton from '@/components/AddButton';
import ConfirmModal from '@/components/ConfirmModal';


export default function Page() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const db = SQLite.useSQLiteContext();
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    const deleteID = useRef<number>()
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

    const loadFriends = async () => {
        const loadedFriends = await db.getAllAsync<Friend>("SELECT * FROM friends")
        setFriends(loadedFriends)
    }

    const deleteFriend = async () => {
        if (deleteID.current === undefined) return;
        await db.runAsync("DELETE FROM friends WHERE rowid = ?", deleteID.current)
        setFriends(friends.filter(f => f.id !== deleteID.current))
        hideDeleteFriend();
    }

    const requestDeleteFriend = (id: number) => {
        deleteID.current = id;
        setShowConfirmDeleteModal(true);
    }
    const hideDeleteFriend = () => setShowConfirmDeleteModal(false)

    useEffect(() => {loadFriends()}, [])

    const showAddFriend = () => setShowAddFriendModal(true)
    const hideAddFriend = () => setShowAddFriendModal(false)

    const handleNewFriend = (friend: Friend) => {
        setFriends(friends => [...friends, friend])
        hideAddFriend()
    }

    return <View style={{flex:  1, alignItems: "flex-start"}}>
        <FriendList friends={friends} onDelete={requestDeleteFriend}/>
        <AddButton onAdd={showAddFriend}/>
        <AddFriendModal visible={showAddFriendModal} onClose={hideAddFriend} onAdd={handleNewFriend}/>
        <ConfirmModal visible={showConfirmDeleteModal} description='diesen Freund löschen möchtest' onClose={hideDeleteFriend} onConfirm={deleteFriend}/>
    </View>;
}

