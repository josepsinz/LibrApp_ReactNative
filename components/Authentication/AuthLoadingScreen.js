import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

class AuthLoadingScreen extends Component {
  componentDidMount() { // este método se llama cuando el componente está montado (cargado)
    this._bootstrapAsync();
  }

  // Recuperamos del almacenamiento interno del movil el token de usuario.
  // el token existirá si el usuario hizo login anteriormente y por lo tanto podemos pasar a la pantalla principal de la aplicación
  // si no existe, debemos ir a la pantalla de autenticación
  _bootstrapAsync = async () => {
    try {
      console.log('bootstrap');
      const userToken = await AsyncStorage.getItem('@userToken');
      // Aquí cambiariemos a la pantalla principal de la App o a la de autenticación,
      // esta pantalla será desmontada y desechada.
      this.props.navigation.navigate(userToken ? 'App' : 'SignIn');
    } catch (e) {
      console.log(e);
    }
  };

  // Mostramos una barra de carga mientras intentamos recuperar el token de usuario
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar />
      </View>
    );
  }
}

export default AuthLoadingScreen;