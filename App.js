import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { purple, white, blue } from './utils/colors';
import { FontAwesome} from '@expo/vector-icons'
import { Constants } from 'expo';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import Deck from './components/Deck';
import Home from './components/Home';
import './ReactotronConfig'
import { createStore, applyMiddleware, compose  } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'


const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      logger, 
      thunk
    )
  )
)

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
  Deck: {
    screen: Deck,
    navigationOptions:({navigation}) => ({
      title: 'Deck'
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions:({navigation}) => ({
      title: 'Add New Card'
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions:({navigation}) => ({
      title: 'Quiz'
    })
  },
})

export default class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <View style={{flex: 1 }}>
          <MyStatusBar backgroundColor={purple} barStyle="light-content" />
          <Stack />
        </View>
      </Provider>
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
