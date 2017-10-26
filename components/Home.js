import React, { Component } from 'react'
import {View, StyleSheet, Flatlist } from 'react-native'
import { black, purple, white } from '../utils/colors';
import {getDecks} from '../utils/api';

class Home extends React.Component {

	componentDidMount() {
		//const decks = getDecks()
		//alert(JSON.stringify(decks))
	}

	render() {

		return (
			<View style={styles.container}>
			    

			 </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home