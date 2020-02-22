import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TextInput, ScrollView } from 'react-native';
import LogOutButton from '../Authentication/LogOutButton';
import AsyncStorage from '@react-native-community/async-storage'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import ShowPurchase from '../Purchase/ShowPurchase';

class AddBookDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Details',
            headerRight: () => (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <LogOutButton navigation={navigation} />
                    <ShowPurchase />
                </View>
            )
        }
    };

    constructor() {
        super();
        this.state = {
            id: 0,
            description: "",
            genre: "",
            pages: 0,
            score: 0,
            book: {}
        };
        this.inputChange = this.inputChange.bind(this)
        this._retrieveBook = this._retrieveBook.bind(this)
        this._saveChanges = this._saveChanges.bind(this)
    }

    componentDidMount() {
        const { navigation } = this.props;
        const newState = this.state;
        newState.id = navigation.getParam("id", null)
        this.setState({ newState })
        this._retrieveBook();
    }

    _retrieveBook = async () => {
        let key = "book/" + this.state.id;
        try {
            const value = await AsyncStorage.getItem(key);
            const book = JSON.parse(value);
            if (value !== null) {
                this.setState({ book: book })
            }
        } catch (error) {
            alert(error.message);
        }
    };

    _saveChanges = async () => {
        let key = "book/" + this.state.id;
        const book = {
            title: this.state.book.title,
            author: this.state.book.author,
            bookIndex: this.state.id,
            description: this.state.description,
            genre: this.state.genre,
            pages: parseInt(this.state.pages),
            score: parseInt(this.state.score)
        }
        if ((Number.isInteger(book.pages) && book.pages > 0) && (Number.isInteger(book.score) && (book.score > -1 && book.score < 11))) {
            try {
                await AsyncStorage.setItem(key, JSON.stringify(book));
                this.showNotification(book.title, 'Details added!', 'success');
            } catch (error) {
                alert(error.message)
            }
        } else {
            this.showNotification('Incorrect pages or score fields', 'Please, try again.', 'warning');
        }
    }

    inputChange(inputValue, field) {
        if (field === "description") {
            const newState = this.state
            newState.description = inputValue
            this.setState({ newState });
        } else if (field === "genre") {
            const newState = this.state
            newState.genre = inputValue
            this.setState({ newState });
        } else if (field === "pages") {
            const newState = this.state
            newState.pages = inputValue
            this.setState({ newState });
        } else {
            const newState = this.state
            newState.score = inputValue
            this.setState({ newState });
        }
    }

    showNotification(message, description, type) {
        showMessage({
            message: message,
            description: description,
            type: type
        });
    }

    render() {
        const { description, genre, pages, score, book } = this.state
        return (
            <View>
                <ScrollView style={styles.inputContainer}>
                    <Text style={styles.text}>Title: {book.title}. Author: {book.author}</Text>
                    <Text style={styles.label}>DESCRIPTION:</Text>
                    <TextInput style={styles.inputContainer}
                        value={String(description)}
                        placeholder="description"
                        numberOfLines={5}
                        multiline
                        placeholderTextColor="#CACACA"
                        onChangeText={(text) => this.inputChange(text, "description")} />
                    <Text style={styles.label}>GENRE:</Text>
                    <TextInput style={styles.inputContainer}
                        value={String(genre)}
                        placeholder="genre"
                        placeholderTextColor="#CACACA"
                        onChangeText={(text) => this.inputChange(text, "genre")} />
                    <Text style={styles.label}>PAGE NUMBERS:</Text>
                    <TextInput style={styles.inputContainer}
                        value={`${pages}`}
                        keyboardType={'numeric'}
                        placeholder="1"
                        placeholderTextColor="#CACACA"
                        onChangeText={(text) => this.inputChange(text, "pages")} />
                    <Text style={styles.label}>SCORE (0-10):</Text>
                    <TextInput style={styles.inputContainer}
                        value={`${score}`}
                        keyboardType={'numeric'}
                        placeholder="score"
                        placeholderTextColor="#CACACA"
                        onChangeText={(text) => this.inputChange(text, "score")} />
                    <TouchableHighlight style={styles.button} onPress={this._saveChanges} underlayColor='rgba(175, 47, 47, 0.75)'>
                        <Text>SAVE</Text>
                    </TouchableHighlight>
                </ScrollView>
                <FlashMessage position="top" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#dfecdf',
        marginRight: 50,
        marginTop: 5,
        marginLeft: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        borderWidth: 2,
        borderColor: "#228B22"
    },
    text: {
        fontWeight: "bold",
        fontSize: 20
    },
    label: {
        marginTop: 20,
        marginLeft: 20,
        fontWeight: "bold"
    }
})


export default AddBookDetails;