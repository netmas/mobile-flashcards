import React, { Component } from 'react'
import {View, StyleSheet, FlatList, AsyncStorage, Text } from 'react-native'
import { black, purple, white } from '../utils/colors';
import {getDecks} from '../utils/api';

class Home extends React.Component {

	state = {
		data: ''
	}

	componentDidMount() {
		//const decks = getDecks()
		//this.setState({data: decks})
		//AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
		//alert(JSON.stringify(decks))
	}

	deck = ({title, questions}) => {
		return (
			<View style={{flex:1}}>
				<Text>{title}</Text>
			</View>
		)
	}

	render() {

		renderItem = ({item})=>{
			return this.deck(...item)
		}

		return (
			<View style={styles.container}>
			{/*}
			    <FlatList 
			    	data = {this.state.data}
			    	renderItem = {this.renderItem}
			    />
			*/}
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