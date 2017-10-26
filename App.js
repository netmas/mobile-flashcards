import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { purple, white, blue } from './utils/colors';
import { FontAwesome} from '@expo/vector-icons'
import { Constants } from 'expo';
import AddDeck from './components/AddDeck';
import Home from './components/Home';

function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={purple} {...props} />
    </View>
  )
}

const Stack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions:({navigation}) => ({
      title: 'Mobile FlashCards',
      headerRight:( 
                    <TouchableOpacity style={{padding: 5}} onPress={() => navigation.navigate('AddDeck')}>
                      <FontAwesome name='plus-circle' size={26} color={blue}/>
                    </TouchableOpacity>
                  )
    })
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions:({navigation}) => ({
      title: 'Add New Deck'
    })
  },
})

export default class App extends React.Component {
  render() {

    return (
      <View style={{flex: 1 }}>
        <MyStatusBar backgroundColor={purple} barStyle="light-content" />
        <Stack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
