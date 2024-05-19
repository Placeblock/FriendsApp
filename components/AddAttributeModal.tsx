import { Attribute } from "@/constants/Types";
import { useState } from "react";
import { Button, Modal, StyleSheet, TextInput } from "react-native";
import * as SQLite from 'expo-sqlite';
import CustomModal from "./CustomModal";


export default function AddAttributeModal({visible, onAdd, onClose}: {visible: boolean, onAdd: (attribute: Attribute) => void, onClose: () => void}) {
    const [name, setName] = useState("");
    const db = SQLite.useSQLiteContext();

    const handleAdd = async () => {
        if (name === undefined || name.trim() === "") return;
        const result = await db.runAsync("INSERT INTO attributes (name) VALUES (?)", name)
        const id = result.lastInsertRowId
        const attribute: Attribute = {id, name}
        onAdd(attribute);
    }
    
    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <CustomModal title="Kategorie hinzufügen" onClose={onClose}>
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