import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LogOutButton from '../Authentication/LogOutButton';
import Heading from '../MyBooksView/Heading';
import ShowPurchase from '../Purchase/ShowPurchase'
import { BarChart, PieChart } from 'react-native-chart-kit'


class Statistics_MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Statistics',
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
      keysGenres: [],
      valuesGenres: [],
      keysScore: [],
      valuesScore: [],
      total: 0
    }
    this._retrieveData = this._retrieveData.bind(this)
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { this._retrieveData() },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  _retrieveData = async () => {
    let mapGenres = new Map();
    let arrayGenres = [];
    let numGenres = [];
    let keys = await AsyncStorage.getAllKeys();
    keys = keys.filter((key) => key !== "@userToken")
    await AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
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
        if (mapGenres.has(book.genre)) {
          let numG = mapGenres.get(book.genre)
          mapGenres.set(book.genre, numG + 1)
        } else {
          mapGenres.set(book.genre, 1)
        }
      });
    });
    const iterator = mapGenres[Symbol.iterator]();
    for (let item of iterator) {
      arrayGenres.push(item[0])
      numGenres.push(item[1])
    }
    const keysGenres = [...arrayGenres];
    const valuesGenres = [...numGenres];
    const ttal = valuesGenres.reduce((a, b) => a + b);

    this.setState({ keysGenres, valuesGenres, total: ttal });
  };

  render() {
    const { keysGenres, valuesGenres, total } = this.state
    const perCentArrayValues = valuesGenres.map((element) => element / total * 100);
    const barData = {
      labels: keysGenres,
      datasets: [
        {
          data: perCentArrayValues,
        },
      ],
    };

    function random_rgb() {
      var o = Math.round, r = Math.random, s = 255;
      return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
    }

    const all = [];
    for (let i = 0; i < keysGenres.length; i++) {
      const item = {
        name: keysGenres[i],
        population: valuesGenres[i],
        color: random_rgb(),
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      }
      all.push(item)
    }
    return (
      <View style={{ backgroundColor: "#ffa3a340" }}>
        <ScrollView>
          <Heading name="Bar Chart" />
          <BarChart
            data={barData}
            width={Dimensions.get('window').width}
            height={420}
            yAxisLabel={'%'}
            chartConfig={{
              backgroundColor: 'yellow',
              backgroundGradientFrom: "grey",
              backgroundGradientTo: 'black',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
          />
          <Heading name="Pie Chart" />
          <PieChart
            data={all}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </ScrollView>
      </View>

    )
  }

}

export default Statistics_MainScreen;
