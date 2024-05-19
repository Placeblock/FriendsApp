import { Button, Modal, Text } from "react-native";
import CustomModal from "./CustomModal";


export default function ConfirmModal({visible, description, onConfirm, onClose}: {visible: boolean, description: string, onConfirm: () => void, onClose: () => void}) {
    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <CustomModal title="Bestätigen" onClose={onClose}>
                <Text style={{color: "white", marginVertical: 20}}>Bist du dir sicher, dass du {description}?</Text>
                <Button color={"#5522ff"} title='Bestätigen' onPress={onConfirm}/>
            </CustomModal>
        </Modal>
    )
}