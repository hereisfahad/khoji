import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import UserContext from '../contexts/User'

export default function Account() {
    const { signout } = useContext(UserContext)

    return (
        <View>
            <Text style={styles.pageTitle}>Account</Text>
            <Button title="signout" onPress={signout} />
        </View>
    )
}

const styles = StyleSheet.create({
    pageTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 50,
        alignSelf: 'center'
    },
})
