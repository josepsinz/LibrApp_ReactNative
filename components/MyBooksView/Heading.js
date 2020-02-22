import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Heading = ({ name }) => (
    <View style={styles.header}>
        <Text style={styles.text}>
            {name}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        marginTop: 0,
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 35,
        color: 'black',
        fontWeight: 'bold'
    }
})

export default Heading;