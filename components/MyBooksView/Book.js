import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BookButton from './BookButton'

const Book = ({ book, viewDetails, deleteBook }) => (

    <View style={styles.bookContainer}>
        <View>
            <Text style={styles.bookName}>{book.title}</Text>
            <Text style={styles.bookAuthor}>{book.author}</Text>
            <Text style={styles.bookDetails}>
                Genre: {book.genre}
                {'\n'}Num Pages: {book.pages}
                {'\n'}Score: {book.score}
            </Text>
        </View>
        <View style={styles.buttons}>
            <BookButton
                name='Edit/Details'
                onPress={() => viewDetails(book.bookIndex)} />
            <BookButton
                name='Delete'
                onPress={() => deleteBook(book.bookIndex)} />
        </View>
    </View>
)

const styles = StyleSheet.create({
    bookContainer: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed',
        paddingLeft: 14,
        paddingTop: 10,
        paddingBottom: 7,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        flexDirection: "row",
        alignItems: 'center'
    },
    bookName: {
        fontSize: 20,
        color: "red",
        fontWeight: "bold"
    },
    bookAuthor: {
        fontSize: 15,
        fontWeight: "bold"
    },
    bookDetails: {
        fontSize: 12,
        alignItems: "flex-start"
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default Book