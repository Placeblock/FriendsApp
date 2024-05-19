import { FriendAttribute as FriendAttributeType } from "@/constants/Types";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import * as SQLite from 'expo-sqlite';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function FriendAttribute({friendID, id, name, defaultValues, onDelete}: {friendID: number, id: number, name: string, defaultValues: FriendAttributeType[], onDelete: () => void}) {
    const [values, setValues] = useState<FriendAttributeType[]>(defaultValues)
    const db = SQLite.useSQLiteContext();

    const updateValues = (index: number, newValue: string) => {
        const valueID = values[index].id;
        db.runAsync("UPDATE friend_attributes SET value = ? WHERE rowid = ?", newValue, valueID)
        setValues(oldValues => {
            const newValues = [...oldValues]
            newValues[index] = {...newValues[index], value: newValue}
            return newValues;
        })
    }

    const addValue = async () => {
        const result: SQLite.SQLiteRunResult = await db.runAsync("INSERT INTO friend_attributes (friend_id, attribute_id, value) VALUES (?, ?, ?)", friendID, id, "")
        const valueID = result.lastInsertRowId
        setValues(values => [...values, {friend_id: friendID, attribute_id: id, id: valueID, value: ""}])
    }

    const deleteValue = async (id: number) => {
        await db.runAsync("DELETE FROM friend_attributes WHERE rowid = ?", id)
        setValues(values => values.filter(v => v.id != id));
    }

    return <View>
        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.attributeTitle}>{name}</Text>
            <View style={{flexDirection: "row"}}>
                <TouchableHighlight style={styles.deleteAttributeBtn} onPress={onDelete}>
                    <Text><FontAwesomeIcon icon={faTrashCan} color='#ff2525'/></Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.newValueBtn} onPress={addValue}>
                    <Text><FontAwesomeIcon icon={faPlus} color='white'/></Text>
                </TouchableHighlight>
            </View>
        </View>
        {values.map((v, index) => <View key={index} style={{flex: 1, flexDirection: "row", alignItems: "center", gap: 10}}>
            <TextInput value={v.value} style={styles.attributeInput} 
                onChangeText={(newText) => updateValues(index, newText)}/>
            <TouchableHighlight style={styles.deleteBtn} onPress={() => deleteValue(v.id)}>
                <Text><FontAwesomeIcon icon={faTrashCan} color='#ff2525' size={10}/></Text>
            </TouchableHighlight>
        </View>)}
    </View>
}

const styles = StyleSheet.create({
    attribute: {
        flex: 1,
        gap: 10,
        width: "100%"
    },
    attributeTitle: {
        color: "white",
        fontSize: 20
    },
    attributeInput: {
        backgroundColor: "#303030",
        flexGrow: 2,
        borderRadius: 5,
        height: 40,
        color: "white",
        paddingHorizontal: 10
    },
    newValueBtn: {
        backgroundColor: "#5522ff",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 3
    },
    deleteAttributeBtn: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 3
    },
    deleteBtn: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 3
    }
});