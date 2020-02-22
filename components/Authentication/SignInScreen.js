import React, { Component } from 'react';
import { View, Button, StyleSheet, TextInput, Image, Text, TouchableHighlight } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage'
import Heading from '../MyBooksView/Heading';

class SignInScreen extends Component {

    static navigationOptions = {
        title: 'LOGIN',
    };

    constructor() {
        super();
        this.state = {
            userNameInput: 'user',
            passInput: 'pass',
        }
        //this.inputChange = this.inputChange.bind(this);
        this._signInAsync = this._signInAsync.bind(this);
        //this.signup = this.signup.bind(this);
    }
    /*
        inputChange(inputValue, field) {
            const newState = this.state
            if (field === 'userName') {
                newState.userNameInput = inputValue;
            } else {
                newState.passInput = inputValue;
            }
            this.setState({ newState });
        }
    
        signup() {
            const { navigate } = this.props.navigation
            navigate('SignUp');
        }
    */
    render() {
        //const { userNameInput, passInput } = this.state;
        return (
            <View style={styles.inputContainer}>
                <Heading name="Click image to enter app" />
                <TouchableHighlight underlayColor='rgba(175, 47, 47, 0.75)' onPress={this._signInAsync}>
                    <Image style={styles.image} source={{ uri: 'https://freepngimg.com/download/book/6-books-png-image-with-transparency-background.png' }} />
                </TouchableHighlight>
            </View>
        );
    }

    _signInAsync = async () => {
        // comprobamos contrasña
        if (this.state.userNameInput === 'user' && this.state.passInput === 'pass') {
            // si es correcta, guardamos el token de usuario con el nombre
            // del usuario actual y navegamos a la pantalla de la aplicación
            try {
                await AsyncStorage.setItem('@userToken', this.state.userNameInput);
                this.props.navigation.navigate('App');
            } catch (error) {
                this.showNotification('Error with storage', error, 'danger');
            }
        } else {
            // si es incorrecta
            // vaciamos campos de texto
            const newState = {
                userNameInput: '',
                passInput: ''
            }
            this.setState(newState);
            // y mostramos notificación de fallo
            this.showNotification('Incorrect username or password', 'Please, try again.', 'warning');
        }
    };

    showNotification(message, description, type) {
        showMessage({
            message: message,
            description: description,
            type: type
        });
    }

}

const styles = StyleSheet.create({
    inputContainer: {
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        backgroundColor: "#ffa3a340",
        height: 3000
    },
    input: {
        height: 6,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10
    },
    image: {
        width: 400,
        height: 400,
        marginTop: 30
    }
})

export default SignInScreen;