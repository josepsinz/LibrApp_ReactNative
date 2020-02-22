import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableHighlight, ScrollView, Picker } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LogOutButton from '../Authentication/LogOutButton';
import Heading from './Heading';
import BookList from './BookList';
import Input from './Input'
import ShowPurchase from '../Purchase/ShowPurchase';

class MyBooks_MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Books',
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
      books: [],
      filter: "",
      order: "",
      inputValue: "",
      isLoading: true
    }

    this.inputChange = this.inputChange.bind(this)
    this.viewDetails = this.viewDetails.bind(this)
    //this._clearAllData = this._clearAllData.bind(this)
    this._retrieveData = this._retrieveData.bind(this)
    this._deleteBook = this._deleteBook.bind(this)
    this.updateOrderBy = this.updateOrderBy.bind(this)
    this.updateFilterBy = this.updateFilterBy.bind(this)
    this.allow = this.allow.bind(this)
  }

  //CLEAR ALL DATA 
  /*
  async _clearAllData() {
    try {
      await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert('success'));
    }
    catch (exception) {
      alert("Data is already cleared");
    }
  }
  */


  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.setState({ isLoading: true }),
          this._retrieveData()
      }
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  _retrieveData = async () => {
    let arraybooks = [];
    let keys = await AsyncStorage.getAllKeys();
    keys = keys.filter((key) => key !== "@userToken")
    await AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        //let key = store[i][0];
        let value = JSON.parse(store[i][1]);
        const book = {
          title: value.title,
          author: value.author,
          bookIndex: value.bookIndex,
          description: value.description,
          genre: value.genre,
          pages: value.pages,
          score: value.score
        }
        arraybooks.push(book)
      });
    });
    arraybooks = arraybooks.sort((a, b) => parseInt(a.bookIndex) - parseInt(b.bookIndex))
    const books = [...arraybooks];
    this.setState({ books })
    this.setState({ isLoading: false })
  };

  viewDetails(index) {
    const { navigate } = this.props.navigation
    let indice = index
    navigate('Edit', { id: indice });
  }

  async _deleteBook(index) {
    let key = "book/" + index
    try {
      await AsyncStorage.removeItem(key);
      this._retrieveData();
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  allow() {
    this.setState({ order: "--", filter: "--", inputValue: "" })
    this._retrieveData();
  }

  updateOrderBy = (order) => {
    this.setState({ order: order })
    let books = this.state.books
    switch (order) {
      case "pages":
        books = books.sort((a, b) => parseInt(a.pages) - parseInt(b.pages))
        this.setState(books);
        break;
      case "score":
        books = books.sort((a, b) => parseInt(b.score) - parseInt(a.score))
        this.setState(books);
        break;
      case "alphabetically":
        books = books.sort((a, b) => a.title.localeCompare(b.title))
        this.setState(books)
        break;
      case "--":
        alert("hey ORDER!")
    }
  }

  inputChange(inputValue) {
    if (inputValue === "") {
      const newState = this.state
      newState.inputValue = inputValue
      this.setState({ newState, filter: "--" });
      this._retrieveData();
    } else {
      const newState = this.state
      newState.inputValue = inputValue
      this.setState({ newState });
      this.updateFilterBy(this.state.filter);
    }
  }

  updateFilterBy = (filter) => {
    this.setState({ filter: filter })
    let books = this.state.books
    let matchingText = this.state.inputValue
    if (matchingText !== "") {
      switch (filter) {
        case "title":
          books = books.filter(d => d.title.toLowerCase().includes(matchingText.toLowerCase()));
          this.setState({ books })
          break;
        case "author":
          books = books.filter(d => d.author.toLowerCase().includes(matchingText.toLowerCase()));
          this.setState({ books })
          break;
        case "genre":
          books = books.filter(d => d.genre.toLowerCase().includes(matchingText.toLowerCase()));
          this.setState({ books })
          break;
        case "--":
        //alert("hey FILTERING")
        default:

      }
    }
  }

  render() {
    const { books, inputValue } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
          <View style={{ justifyContent: "flex-start", flexDirection: "row" }}>
            <Heading name="Filters" />
            <TouchableHighlight style={styles.button} onPress={this.allow} underlayColor='rgba(175, 47, 47, 0.75)'>
              <Text style={{ fontWeight: "bold" }}>REMOVE FILTERS</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.pickers}>
            <Text style={styles.text}>ORDER BY {this.state.order}</Text>
            <Picker selectedValue={this.state.order} onValueChange={this.updateOrderBy}>
              <Picker.Item label="--" value="--" />
              <Picker.Item label="pages" value="pages" />
              <Picker.Item label="score" value="score" />
              <Picker.Item label="alphabetically" value="alphabetically" />
            </Picker>
          </View>
          <View style={styles.pickers}>
            <Text style={styles.text}>FILTER BY: {this.state.filter}</Text>
            <Picker selectedValue={this.state.filter} onValueChange={this.updateFilterBy}>
              <Picker.Item label="--" value="--" />
              <Picker.Item label="title" value="title" />
              <Picker.Item label="author" value="author" />
              <Picker.Item label="genre" value="genre" />
            </Picker>
            <Input inputValue={inputValue} inputChange={(text) => this.inputChange(text)} />
          </View>
          <Heading name="List" />
          {this.state.isLoading ? <View style={{ flex: 1, padding: 100 }}>
            <Text style={{ fontSize: 30 }}>loading...</Text>
            <ActivityIndicator size="large" color="red" />
          </View> : <BookList books={books} viewDetails={this.viewDetails} deleteBook={this._deleteBook} />}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa3a340",
  },
  pickers: {
    borderWidth: 1,
    borderColor: '#8c0000',
    marginBottom: 0,
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10
  },
  content: {
    flex: 1,
    paddingTop: 0
  },
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
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    alignSelf: "flex-start"
  }
})

export default MyBooks_MainScreen;
