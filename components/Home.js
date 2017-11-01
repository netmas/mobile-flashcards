import React, { Component } from 'react'
import {View, StyleSheet, FlatList, AsyncStorage, Text } from 'react-native'
import { black, purple, white } from '../utils/colors';
import {getDecks} from '../utils/api';
import Reactotron from 'reactotron-react-native';
import { receiveDecks, addDeck } from '../actions'
import { connect } from 'react-redux';

function Deck ({title, questions}) {
	return (
		<View style={{flex:1}}>
			<Text style={{fontSize:20}}>{title}</Text>
		</View>
	)
}

class Home extends React.Component {

	componentDidMount() {
		//const { dispatch } = this.props
		getDecks().then((decks) => this.props.receiveDecks(decks))
		console.log(this.props)
		/*
		const decks = getDecks()
		decks !== undefined && decks !== null?this.setState({data: decks}):this.setState({data: null })
		*/
	}

	renderItem = ({item})=>{
			return <Deck {...item} />
		}

	render() {		
		const { decks } = this.props
		const data = [{ title: "My title" }, { title: "My other title" }]
		console.log(data)
		console.log(decks)
		return (
			console.log(data) || (
			<View style={styles.container}>
			    <FlatList
		            data={data}
		            renderItem={({ item }) => <Text>{item.title}</Text>}
		            keyExtractor={item => item.title}
		          />
				
			 </View>
		)
	 )
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


function mapStateToProps ( state ) {
  const { decks } = state
  //console.log(state)
  return {
     decks: state
  }
}

const mapDispatchToProps = {
  receiveDecks,
  addDeck
}

//export default Home

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)