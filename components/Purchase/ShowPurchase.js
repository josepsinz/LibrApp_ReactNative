import React, { Component } from 'react'
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native'
import { connect } from "react-redux";

class ShowPurchase extends Component {

    constructor() {
        super();
        this.state = {
            status: false,
            name: "Show Next P."
        }
    }

    toggleStatus() {
        this.setState({
            status: !this.state.status
        });
        if (this.state.status) {
            this.setState({ name: "Show Next P." })
        } else {
            this.setState({ name: "Hide Next P." })
        }
    }

    render() {
        const { name } = this.state
        return (
            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                {this.state.status && <Text>{this.props.books}</Text>}
                <TouchableHighlight
                    underlayColor='#efefef'
                    style={styles.button}
                    onPress={(event) => this.toggleStatus(event)}>
                    <Text>
                        {name}
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
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

const mapStateToProps = (state) => ({
    books: state.nextPurchaseReducer.book
})

export default connect(mapStateToProps)(ShowPurchase);