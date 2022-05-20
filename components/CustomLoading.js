import { StyleSheet, Modal,View, ActivityIndicator } from 'react-native'
import React from 'react'

const CustomLoading = ({ visible}) => {
  return (

    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
     
    >
      <View style={styles.container}  >
        <ActivityIndicator size={'large'}
          color={'#E9C300'} />
      </View>
    </Modal>


  )
}

export default CustomLoading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  }
})