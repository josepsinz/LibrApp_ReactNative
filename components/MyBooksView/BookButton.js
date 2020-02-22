import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

const BookButton = ({ onPress, name }) => (
    <TouchableHighlight
        onPress={onPress}
        underlayColor='#efefef'
        style={styles.button}>
        <Text>{name}</Text>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end',
        padding: 7,
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 4,
        marginRight: 5
    },
    text: {
        color: '#666666'
    },
    complete: {
        color: 'red',
        fontWeight: 'bold'
    },
})

export default BookButton