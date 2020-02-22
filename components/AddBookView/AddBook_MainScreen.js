import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TextInput, Alert, Image } from 'react-native';
import LogOutButton from '../Authentication/LogOutButton';
import AsyncStorage from '@react-native-community/async-storage'
import ShowPurchase from '../Purchase/ShowPurchase'
import FlashMessage, { showMessage } from 'react-native-flash-message';

class AddBook_MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add book',
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
      title: "",
      author: "",
      books: [],
      numberOf: 1
    };
    this.inputChange = this.inputChange.bind(this)
    this._storeData = this._storeData.bind(this)
    this._retrieveData = this._retrieveData.bind(this)
    this._storeItem = this._storeItem.bind(this)
    this._twoOptionAlertHandler = this._twoOptionAlertHandler.bind(this)
  }

  componentDidMount() {
    this._retrieveData();
  }

  inputChange(inputValue, field) {
    if (field === "title") {
      const newState = this.state
      newState.title = inputValue
      this.setState({ newState });
    } else {
      const newState = this.state
      newState.author = inputValue
      this.setState({ newState });
    }
  }

  _retrieveData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      keys = keys.filter((key) => key !== "@userToken")
      if (keys.length != 0) {
        keys = keys.map((element) => {
          return parseInt(element.substr(5));
        });
        let max = Math.max(...keys) + 1;
        this.setState({ numberOf: max })
      } else {
        this.setState({ numberOf: 0 })
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async _storeItem(key, item) {
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      alert("ERROR: " + error.message);
    }
  }

  _storeData = async (text1, text2) => {

    text1 = this.state.title;
    text2 = this.state.author;
    if (text1 !== "" && text2 !== "") {
      let index = this.state.numberOf;
      let book = {
        title: text1,
        bookIndex: index,
        author: text2,
        description: "",
        genre: "",
        pages: 0,
        score: 0,
      }
      index++;
      let key = "book/" + book.bookIndex.toString();
      this._storeItem(key, book);
      this.setState({ numberOf: index, title: "", author: "" })
      this._twoOptionAlertHandler(book.bookIndex);
    } else {
      this.showNotification('You must specify Title and Author', 'Please, try again.', 'warning');
      this.setState({ title: "", author: "" })
    }

  };

  _twoOptionAlertHandler = (index) => {
    const { navigate } = this.props.navigation
    Alert.alert(
      'New book added!',
      'Do you want to add details now?',
      [
        { text: 'Yes', onPress: () => navigate('AddDetails', { id: index }) },
        { text: 'No', onPress: () => navigate('MyBooks') },
      ],
      { cancelable: false }
    );
  }

  showNotification(message, description, type) {
    showMessage({
      message: message,
      description: description,
      type: type
    });
  }

  render() {
    this._retrieveData();
    const { title, author } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>TITLE:</Text>
          <TextInput style={styles.inputContainer}
            value={String(title)}
            placeholder="title"
            placeholderTextColor="#CACACA"
            onChangeText={(text) => this.inputChange(text, "title")} />
          <Text style={styles.label}>AUTHOR:</Text>
          <TextInput style={styles.inputContainer}
            value={String(author)}
            placeholder="author"
            placeholderTextColor="#CACACA"
            onChangeText={(text) => this.inputChange(text, "author")} />
        </View>
        <TouchableHighlight style={styles.button} underlayColor='rgba(175, 47, 47, 0.75)' onPress={(text1, text2) => { this._storeData(text1, text2) }}>
          <Text style={styles.text}>ADD BOOK</Text>
        </TouchableHighlight>
        <Image style={styles.image} source={{ uri: 'https://pngimg.com/uploads/book/book_PNG51074.png' }} />
        <FlashMessage position="top" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa3a340",
  },
  button: {
    height: 50,
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
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#8c0000",
    backgroundColor: "white"
  },
  text: {
    fontWeight: "bold",
    fontSize: 20
  },
  label: {
    marginTop: 20,
    marginLeft: 20,
    fontWeight: "bold"
  },
  image: {
    width: 400,
    height: 200,
    backgroundColor: "#ffa3a300",
    justifyContent: "space-around"
  }
})

export default AddBook_MainScreen
