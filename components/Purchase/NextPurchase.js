import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput } from 'react-native';
import LogOutButton from '../Authentication/LogOutButton';
import Heading from '../MyBooksView/Heading';
import ShowPurchase from './ShowPurchase';

import { connect } from 'react-redux';
import { addBook } from '../../actions';

const initialState = { book: "" }

class NextPurchase extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Purchase',
      headerRight: () => (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <LogOutButton navigation={navigation} />
          <ShowPurchase />
        </View>
      )
    }
  };

  state = initialState

  updateInput = (value) => {
    this.setState({
      book: value
    })
  }

  addBook = () => {
    this.props.dispatchAddBook(this.state.book)
    this.setState(initialState)
  }

  render() {
    const { books } = this.props
    return (
      <View style={{ backgroundColor: "#ffa3a340" }}>
        <Heading name={"New purchase: " + this.props.books} />
        <Text>Next purchase: {books}</Text>
        <View>
          <TextInput
            value={String(this.state.book)}
            onChangeText={value => this.updateInput(value)}
            placeholder='Book name'
            style={styles.inputContainer}
          />
        </View>
        <TouchableHighlight style={styles.button} underlayColor='rgba(175, 47, 47, 0.75)' onPress={this.addBook}><Text>New Purchase</Text></TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})

const mapDispatchToProps = {
  dispatchAddBook: (book) => addBook(book),
}

const mapStateToProps = (state) => ({
  books: state.nextPurchaseReducer.book
})

export default connect(mapStateToProps, mapDispatchToProps)(NextPurchase)

