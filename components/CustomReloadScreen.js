import { StyleSheet, Text, View, Image, Modal } from 'react-native'
import React, { useEffect } from 'react'
import reload from '../assets/icons/reload.png'


const CustomReloadScreen = ({ visible, setModalVisible }) => {
    <Modal
        animationType='slide'
        transparent={true}
        visible={visible}
        onRequestClose={() => { setModalVisible(!visible) }}
    >
        <View style={[styles.container]}>
            <Image
                source={reload}
                style={styles.icon}
            />
        </View>
    </Modal>
}

export default CustomReloadScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '27%',
        width: '80%',
        paddingHorizontal: 20,
        borderRadius: 20,
        padding: 10,
        alignSelf: 'center',
        alignContent: 'center',
    },
    icon: {
        width: 70,
        height: 70,
        borderRadius: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
})