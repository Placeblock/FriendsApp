import { Friend } from "@/constants/Types";
import { useState } from "react";
import { Button, Modal, StyleSheet, TextInput } from "react-native";
import * as SQLite from 'expo-sqlite';
import CustomModal from "./CustomModal";


export default function AddFriendModal({visible, onAdd, onClose}: {visible: boolean, onAdd: (friend: Friend) => void, onClose: () => void}) {
    const [name, setName] = useState("");
    const db = SQLite.useSQLiteContext();

    const handleAdd = async () => {
        if (name === undefined || name.trim() === "") return;
        const result = await db.runAsync("INSERT INTO friends (name) VALUES (?)", name);
        const id = result.lastInsertRowId
        const friend: Friend = {id, name}
        onAdd(friend);
    }
    
    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <CustomModal title="Freund hinzufügen" onClose={onClose}>
                <TextInput style={styles.nameInput} placeholder='Name' placeholderTextColor={"white"} onChangeText={setName} />
                <Button color={"#5522ff"} title='Hinzufügen' onPress={handleAdd}/>
            </CustomModal>
        </Modal>
    )
}

const styles = StyleSheet.create({
    nameInput: {
        color: "white",
        padding: 10
    }
})