import { StyleSheet, Text, View, Image, Modal } from 'react-native'
import React,{useEffect} from 'react'
import CustomButton from './CustomButton'
import info from '../assets/icons/info_01.png'
import correct from '../assets/icons/correct_01.png'
import danger from '../assets/icons/danger_01.png'

const CustomAlert = ({ title, message, alertStyle, btDone, btCancle, visible, setModalVisible, subtitle }) => {
    
    switch (alertStyle) {
        case 'info':
            return (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => { setModalVisible(!visible) }}
                >
                    <View style={[styles.container]}>
                        <Image
                            source={info}
                            style={styles.icon}
                        />
                        {subtitle == null ?
                            <View style={styles.title_group}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            :
                            <View style={styles.title_group}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            </View>
                        }

                        <Text style={styles.message}>{message}</Text>
                        <CustomButton
                            text={'Done'}
                            bgColor={'#F5B041'}
                            fgColor={'#FFFFFF'}
                            fontFamily={'Medium'}
                            fontSize={18}
                            onPress={btDone}
                            marginV={10}
                        />
                    </View>
                </Modal>

            )

        case 'warning':
            return (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => { setModalVisible(!visible) }}
                >
                    <View style={[styles.container]}>
                        <Image
                            source={danger}
                            style={styles.icon}
                        />
                        {subtitle == null ?
                            <View style={styles.title_group}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            :
                            <View style={styles.title_group}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            </View>
                        }
                        <Text style={styles.message}>{message}</Text>
                        <CustomButton
                            text={'OK'}
                            bgColor={'#A93006'}
                            fgColor={'#FFFFFF'}
                            fontFamily={'Medium'}
                            fontSize={18}
                            onPress={btDone}
                        />
                        <CustomButton
                            text={'Cancel'}
                            bgColor={'#229954'}
                            fgColor={'#FFFFFF'}
                            fontFamily={'Medium'}
                            fontSize={18}
                            onPress={btCancle}
                        />
                    </View>
                </Modal>

            )

        case 'success':
            return (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => { setModalVisible(!visible) }}>
                    <View style={[styles.container]}>
                        <Image
                            source={correct}
                            style={styles.icon}
                        />
                        {subtitle == null ?
                            <View style={styles.title_group}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            :
                            <View style={styles.title_group}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            </View>
                        }
                        <Text style={styles.message}>{message}</Text>
                        <CustomButton
                            text={'OK'}
                            bgColor={'#229954'}
                            fgColor={'#FFFFFF'}
                            fontFamily={'Medium'}
                            fontSize={18}
                            onPress={btDone}
                        />
                    </View>
                </Modal>

            )
        default:
            return (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => { setModalVisible(!visible) }}
                >
                    <View style={[styles.container]}>
                        <Image
                            source={correct}
                            style={styles.icon}
                        />
                        <Text style={styles.title}>default Alert</Text>
                        <Text style={styles.message}>default Alert this message</Text>
                        <CustomButton
                            text={'OK'}
                            bgColor={'#229954'}
                            fgColor={'#FFFFFF'}
                            fontFamily={'Medium'}
                            fontSize={18}
                            onPress={btDone}
                            
                        />
                    </View>
                </Modal>
            )
    }

}

export default CustomAlert

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
        elevation:10
    },
    icon: {
        width: 70,
        height: 70,
        borderRadius: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    title_group: {
        marginVertical: 10
    },
    title: {
        fontFamily: 'Kanit-Medium',
        fontSize: 22,
        alignSelf: 'center',
        textTransform:'capitalize'
    },
    subtitle: {
        fontFamily: 'Kanit-Medium',
        fontSize: 20,
        alignSelf: 'center',
    },
    message: {
        fontFamily: 'Kanit-Light',
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 5,
        padding:5

    }
})