import React from 'react'
import { View } from 'react-native'
import Book from './Book'

const BookList = ({ books, viewDetails, deleteBook }) => {
    const getVisibleBooks = (books) => {
        return books
    }
    books = getVisibleBooks(books)
    books = books.map((book, i) => {
        return (
            <Book
                key={book.bookIndex}
                book={book}
                viewDetails={viewDetails}
                deleteBook={deleteBook} />
        )
    })
    return (
        <View>
            {books}
        </View>
    )
}

export default BookList