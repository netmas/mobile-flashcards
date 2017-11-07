import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, AsyncStorage} from 'react-native'
import { black, purple, white, gray } from '../utils/colors';
import { connect } from 'react-redux';


class Deck extends React.Component {
  state = {
    title: '',
    questions:[]
  }

  componentDidMount() {
    //const title = this.props.navigation.state.params.title
    /*
    getDeck(title).then((deck) => {
      //console.log(deck[0].title),
      this.setState(()=>({title:deck[0].title, questions:deck[0].questions}))
      //this.setState({...deck}),
      //console.log(this.props)
    })
    */
    //this.setState(()=>({deck: e.target.value}))
    
  }

  AddNewCard = () => {
    return this.props.navigation.navigate('AddCard', {
                                title: this.props.navigation.state.params.title
                                })
  }

   StartQuiz = () => {
    return this.props.navigation.navigate('Quiz', {
                                title: this.props.navigation.state.params.title
                                })
  }

	render() {	
    const { decks } = this.props
    //console.log(this.props)
    const index = Object.values(decks).findIndex(item => item.title === this.props.navigation.state.params.title) 

    const title =  Object.values(decks)[index].title === undefined?'':Object.values(decks)[index].title
    const numQuestion = Object.values(decks)[index].questions.length=== undefined?0:Object.values(decks)[index].questions.length

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
          >

              <Text style={styles.submitBtnText}>Start Quiz</Text>
          </TouchableOpacity>
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
  
}


export default connect(
  mapStateToProps
)(Deck)

//export default Deck