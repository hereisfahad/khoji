import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TrackCreate = () => {
    return (
        <View>
            <Text style={styles.pageTitle}>TrackCreate</Text>
        </View>
    )
}

export default TrackCreate

const styles = StyleSheet.create({
    pageTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 50,
        alignSelf: 'center'
      },
})
