import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'


export default function CustomModal({ children, title, onClose }: { children: React.ReactNode, title: string, onClose: () => void }) {
    return (<View style={styles.content}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose}>
                <FontAwesomeIcon icon={faXmark} size={24} color="white"/>
            </Pressable>
        </View>
        {children}
    </View>)
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#2d2d2d",
        height: "25%",
        width: "100%",
        bottom: 0,
        position: "absolute",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 10
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        color: "white",
        fontSize: 16
    }
});