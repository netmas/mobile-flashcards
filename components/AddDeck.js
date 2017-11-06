import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, AsyncStorage} from 'react-native'
import { black, purple, white, red } from '../utils/colors';
import { saveDeckTitle, getDecks } from '../utils/api';
import { MOBILE_FLASHCARD_DECK_STORAGE_KEY } from '../utils/_flashCards';
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions'
import { connect } from 'react-redux';

class AddDeck extends React.Component {
	state = {
		deck: '',
		response: '',
		error: ''
	}

	componentDidMount() {
		

		//AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
	}

	handleChangeDeck= (e) =>{
		this.setState(()=>({deck: e.target.value}))
	}


	submit = () => {

		let payload = 	{
							title:this.state.deck, 
							questions:undefined
						}
		let stateRedux = this.props.decks
		let exists = Object.values(stateRedux).find(e => e.title === payload.title)
		//console.log(stateRedux)
		exists === undefined? (
			this.setState(()=>({error: ''})),
			this.props.addDeck(payload),
			saveDeckTitle(this.state.deck),
			//this.setState(() => ({ response: JSON.stringify(value) }))
			this.toHome()
		):(
			this.setState(()=>({error: 'This Deck already exists'}))
		)
		

		
	}

	toHome = () => {
	    this.props.navigation.dispatch(NavigationActions.back())
	  }

	render() {
		const {deck} = this.state.deck
		const {response} = this.state.response
		return (

			<KeyboardAvoidingView behavior='padding' style={styles.container}>
			    <Text style={styles.text}>What is the title of your new deck?</Text>
			    <TextInput
			        style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, margin:10}}
			        onChangeText={(text) => this.setState({deck: text})}
			        value={this.state.deck}
			      />
			    <TouchableOpacity 
			     style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
			     onPress={this.submit}
			    >

			        <Text style={styles.submitBtnText}>Submit</Text>
			    </TouchableOpacity>
			    <Text style={{color: red, fontSize: 22}}>{this.state.error}</Text>
			</KeyboardAvoidingView>

			)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 46,
    textAlign: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
});

function mapStateToProps ( state ) {
  //const { decks } = state
  //console.log(state)
  return {
     decks: state
  }
}

const mapDispatchToProps = {
  addDeck
}

//export default AddDeck
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDeck)