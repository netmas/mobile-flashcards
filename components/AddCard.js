import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, AsyncStorage, KeyboardAvoidingView} from 'react-native'
import { black, purple, white, gray } from '../utils/colors';
import { connect } from 'react-redux';
import {addCardToDeck} from '../utils/api';
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'

class AddCard extends React.Component {
	state = {
		deck: this.props.navigation.state.params.title,
		question: '',
		answer: ''
	}

	submit = () => {
		let deck =  this.state.deck
		let card = 	{	
						question:this.state.question, 
						answer:this.state.answer
					}
		addCardToDeck(deck, card)
		this.props.addCard(deck, card)
		this.toPrevious()
	}

	toPrevious = () => {
	    this.props.navigation.dispatch(NavigationActions.back())
	  }

	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<TextInput
			        style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, margin:10}}
			        onChangeText={(text) => this.setState({question: text})}
			        value={this.state.question}
			        placeholder='Write the question here'
			      />
			    <TextInput
			        style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, margin:10}}
			        onChangeText={(text) => this.setState({answer: text})}
			        value={this.state.answer}
			        placeholder='Write the answer here'
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
    justifyContent: 'center'
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    margin: 10,
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

//export default AddCard

function mapStateToProps ( state ) {
  //const { decks } = state
  //console.log(state)
  return {
     decks: state
  }
}

const mapDispatchToProps = {
  addCard
}

//export default AddDeck
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCard)