import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";


export default function AddButton({ onAdd }: { onAdd: () => void }) {
    return (
        <TouchableHighlight style={styles.add} onPress={onAdd}>
            <Text><FontAwesomeIcon icon={faPlus} color='white' /></Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    add: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 40,
        height: 40,
        borderRadius: 2,
        backgroundColor: "#5522ff",
        justifyContent: "center",
        alignItems: "center"
    }
})