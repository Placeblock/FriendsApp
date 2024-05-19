import { StyleSheet, TextInput } from "react-native";


export default function SearchInput({onSearch}: {onSearch: (query: string) => void}) {
    return (
        <TextInput 
            placeholderTextColor="white" 
            style={styles.search} 
            placeholder="Suchen" 
            onChangeText={onSearch}/>
    )
}

const styles = StyleSheet.create({
    search: {
        color: "white",
        width: "100%"
    }
});