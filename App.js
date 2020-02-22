import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import AuthLoadingScreen from './components/Authentication/AuthLoadingScreen'
import SignInScreen from './components/Authentication/SignInScreen'
import MyBooks_MainScreen from './components/MyBooksView/MyBooks_MainScreen'
import EditBookDetails from './components/MyBooksView/EditBookDetails'
import AddBook_MainScreen from './components/AddBookView/AddBook_MainScreen'
import AddBookDetails from './components/AddBookView/AddBookDetails'
import Statistics_MainScreen from './components/Statistics/Statistics_MainScreen'
import NextPurchase from './components/Purchase/NextPurchase'

import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(rootReducer)

const navigationOptions = {
    headerStyle: {
        backgroundColor: 'rgba(175, 47, 47, 0.75)'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
};

const MyBooksNavigator = createStackNavigator(
    {
        MyBooks: MyBooks_MainScreen,
        Edit: EditBookDetails
    },
    {
        initialRouteName: 'MyBooks',
        defaultNavigationOptions: navigationOptions,
        headerMode: 'screen'
    }
)

const AddBookNavigator = createStackNavigator(
    {
        AddBook: AddBook_MainScreen,
        AddDetails: AddBookDetails
    },
    {
        initialRouteName: 'AddBook',
        defaultNavigationOptions: navigationOptions,
        headerMode: 'screen'
    }
)

const SignInNavigator = createStackNavigator(
    {
        Main: SignInScreen,
    },
    {
        initialRouteName: 'Main',
        defaultNavigationOptions: navigationOptions,
        headerMode: 'screen'
    }
);

const StatisticsNavigator = createStackNavigator(
    {
        Statistics: Statistics_MainScreen,
    },
    {
        initialRouteName: 'Statistics',
        defaultNavigationOptions: navigationOptions,
        headerMode: 'screen'
    }
);

const PurchaseNavigator = createStackNavigator(
    {
        Purchase: NextPurchase,
    },
    {
        initialRouteName: 'Purchase',
        defaultNavigationOptions: navigationOptions,
        headerMode: 'screen'
    }
);

const Tabs = createBottomTabNavigator(
    {
        Books: MyBooksNavigator,
        Add: AddBookNavigator,
        Statistics: StatisticsNavigator,
        Purchase: PurchaseNavigator
    },
    {
        tabBarOptions: {
            activeBackgroundColor: 'rgba(75, 47, 47, 0.1)',
            labelStyle: {
                fontWeight: 'bold',
                fontSize: 20,
                color: 'rgba(175, 47, 47, 0.75)'
            }
        }
    }
)

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: Tabs,
        SignIn: SignInNavigator
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>)
    }
}