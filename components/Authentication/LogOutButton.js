import React from 'react'
import { Text, StyleSheet, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const LogOutButton = ({ navigation }) => {
    const logOutFunction = async () => {
        try {
            await AsyncStorage.removeItem('@userToken');
            navigation.navigate('SignIn');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <TouchableHighlight
            underlayColor='#efefef'
            style={styles.button}
            onPress={logOutFunction}>
            <Text style={styles.submit}>
                EXIT
            </Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#ffffff',
        width: 100,
        marginRight: 20,
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default LogOutButton