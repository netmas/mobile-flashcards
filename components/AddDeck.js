import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { black, purple, white } from '../utils/colors';
import { saveDeckTitle, getDecks } from '../utils/api';
import { NavigationActions } from 'react-navigation'

class AddDeck extends React.Component {
	state = {
		deck: ''
	}

	handleChangeDeck= (e) =>{
		this.setState(()=>({deck: e.target.value}))
	}

	submit = () => {
		saveDeckTitle(this.state.deck)
		const decks = getDecks()
		alert(JSON.stringify(decks))

		//this.setState(() => ({ deck: '' }))

		//this.toHome();
	}

	toHome = () => {
	    this.props.navigation.dispatch(NavigationActions.back())
	  }

	render() {
		const {deck} = this.state
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

export default AddDeck