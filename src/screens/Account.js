import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

import UserContext from '../contexts/User'

export default function Account() {
    const { signout } = useContext(UserContext)

    return (
        <View style={styles.container}>
            <Button
                title="Sign out"
                onPress={signout}
                buttonStyle={styles.signoutBtn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        alignSelf: 'center'
    },
    signoutBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'red'
    }
})
