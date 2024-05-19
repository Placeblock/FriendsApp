import { Friend } from "@/constants/Types";
import { useSearchBar } from "@/hooks/useSearchBar";
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import SearchInput from "./SearchInput";
import { Link } from "expo-router";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


export default function FriendList({friends, onDelete}: {friends: Friend[], onDelete: (id: number) => void}) {
    const {filteredItems, updateQuery} = useSearchBar({items: friends, key: f => f.name})

    return (
        <View style={styles.list}>
            <SearchInput onSearch={updateQuery}/>
            <View style={{borderBottomColor: "white", borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 20}}></View>
            <FlatList style={{width: "100%"}} data={filteredItems} renderItem={({ item }) =>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Link key={item.id} style={styles.link} href={{ pathname: "[id]", params: { id: item.id.toString() } }}>{item.name}</Link>
                    <TouchableHighlight style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
                        <Text><FontAwesomeIcon icon={faTrashCan} color='#ff2525' size={12}/></Text>
                    </TouchableHighlight>
                </View>
            } />
        </View>
    )
}

const styles = StyleSheet.create({
    link: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        color: "white",
        borderLeftWidth: 3,
        borderLeftColor: "#5522ff",
        flexGrow: 2
    },
    list: {
        width: "100%"
    },
    deleteBtn: {

    }
})