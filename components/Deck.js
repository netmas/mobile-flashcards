import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, AsyncStorage} from 'react-native'
import { black, purple, white, gray } from '../utils/colors';
import { connect } from 'react-redux';
import { selectDeck } from '../actions'


class Deck extends React.Component {
  state = {
    disabled: false
  }

  componentDidMount() {
    const { decks } = this.props
    let deck = Object.values(decks).find(item => item.title === this.props.navigation.state.params.title) 
    deck.questions === undefined || deck.questions.length === 0?(this.setState({disabled:true})):(this.setState({disabled:false}))

  }

  AddNewCard = () => {
    return this.props.navigation.navigate('AddCard', {
                                title: this.props.navigation.state.params.title
                                })
  }

   StartQuiz = () => {
    const { decks } = this.props
    let deck = Object.values(decks).find(item => item.title === this.props.navigation.state.params.title) 
    
    deck = {
      total:deck.questions.length,
      correct:0,
      currentQuestion:0,
      displayAnswer:false,
      ...deck
    }
    this.props.selectDeck(deck)

    return this.props.navigation.navigate('Quiz', {
                                title: this.props.navigation.state.params.title
                                })   
  }

	render() {	
    const { decks } = this.props
    //console.log(this.props)
    const index = Object.values(decks).findIndex(item => item.title === this.props.navigation.state.params.title) 
    const title =  Object.values(decks)[index].title === undefined?'':Object.values(decks)[index].title
    const numQuestion = Object.values(decks)[index].questions=== undefined?0:Object.values(decks)[index].questions.length


		return (
			<View style={styles.container}>
				<Text style={{fontSize: 46, marginBottom:5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}> 
          {title}
        </Text>
        <Text style={{fontSize: 22, marginBottom:30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', color:gray}}> 
          {numQuestion===undefined?`0 Cards`:`${numQuestion} Cards`}
        </Text>
        <TouchableOpacity 
           style={Platform.OS === 'ios' ?styles.iosSubmitBtn:styles.AndroidSubmitBtnWhite}
           onPress={this.AddNewCard}
          >

              <Text style={styles.submitBtnTextBlack}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
           style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
           onPress={this.StartQuiz}
            disabled={this.state.disabled}
          >

              <Text style={styles.submitBtnText}>Start Quiz</Text>
          </TouchableOpacity>
          {numQuestion === 0 && (<Text style={{color:black, textAlign: 'center'}}>Add Cards to take the quiz</Text>)}
			</View>

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
  AndroidSubmitBtnWhite: {
    backgroundColor: white,
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
  },
  submitBtnTextBlack: {
    color: black,
    fontSize: 22,
    textAlign: 'center',
  }
});

function mapStateToProps ( state ) {
  const { decks } = state
  //console.log(state)
  return {
     decks: state.items
  }
}

const mapDispatchToProps = {
  selectDeck
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck)

//export default Deck