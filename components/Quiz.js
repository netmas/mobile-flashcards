import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, AsyncStorage, Animated} from 'react-native'
import { black, purple, white, gray, red, green } from '../utils/colors';
import { connect } from 'react-redux';

class Quiz extends React.Component {
  state = {
    displayAnswer:false,
    title: '',
    total: 0,
    correct: 0,
    currentQuestion: 0,
    questions: []
  }

  componentDidMount() {
    
    this.setState(this.props.selectedItem)
    //AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
  }

  SeeAnswer = (e) => {
    //console.log(this.state.title)
    this.state.displayAnswer ===true?this.setState({...this.state, displayAnswer:false}):this.setState({...this.state, displayAnswer:true})
  }

  Correct = (e) => {
    //let total = this.state.total
    //let currenQuestion = this.state.currenQuestion
    this.state.currentQuestion +1 >= this.state.total?(
      this.setState((prevState, props)=> {
          return {
                    displayAnswer: false,
                    correct: this.state.correct + 1,
                    currentQuestion: this.state.currentQuestion +1
                  }
       }),
      this.props.navigation.navigate('Results', {
                                results: this.calculateResults(1)
                                }) 
     ):(
       this.setState((prevState, props)=> {
          return {
                    displayAnswer: false,
                    correct: this.state.correct + 1,
                    currentQuestion: this.state.currentQuestion +1
                  }
       })
     )
  }

  Incorrect = (e) => {
    this.state.currentQuestion +1 >= this.state.total?(
      this.props.navigation.navigate('Results', {
                                results: this.calculateResults(0)
                                }) 
     ):(
       this.setState((prevState, props)=> {
          return {
                    displayAnswer: false,
                    currentQuestion: this.state.currentQuestion +1
                  }
       })
     )
  }

  calculateResults = (num) => {
    let total = this.state.total
    let correct = this.state.correct + num
    let percent = Math.round(((this.state.correct + num) * 100) / this.state.total)

    this.setState({displayAnswer:false, currentQuestion:0, correct: 0})

    return {
      total: total,
      correct: correct,
      percent: percent
    }
  }


	render() {


		return (
			<View style={styles.container}>
				    <Text style={{fontSize: 15, alignSelf: 'flex-start'}}> 
          				{this.state.currentQuestion + 1}/{this.state.total}
        		</Text>

				    <Text style={{fontSize: 30, marginTop:30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}> 
                  {this.state.questions.map((item, index)=>(
                      this.state.currentQuestion === index &&(
                        this.state.displayAnswer === false?item.question:item.answer
                    )
                   ))}
        		</Text>

        		<TouchableOpacity 
        			style={{marginBottom:80}}
	           		onPress={this.SeeAnswer}
	          	>
	          		<Text style={styles.submitBtnTextRed}>{this.state.displayAnswer ===true?'See Question':' See Answer'}</Text>
        		</TouchableOpacity>	
	        	<TouchableOpacity 
	           		style={Platform.OS === 'ios' ?styles.iosSubmitBtn:styles.AndroidSubmitBtnGreen}
	           		onPress={this.Correct}
	          	>
	            	<Text style={styles.submitBtnText}>Correct</Text>
	          	</TouchableOpacity>
	          	<TouchableOpacity 
	           		style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtnRed}
	           		onPress={this.Incorrect}
	          	>
	            	<Text style={styles.submitBtnText}>Incorrect</Text>
	         	</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
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
  AndroidSubmitBtnRed: {
    backgroundColor: red,
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
  AndroidSubmitBtnGreen: {
    backgroundColor: green,
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
  },
  submitBtnTextRed: {
    color: red,
    fontSize: 22,
    textAlign: 'center',
  }
});

function mapStateToProps ( state ) {
  //const { selectedItem } = state
  //console.log(state)
  return {
     selectedItem: state.selectedItem
  }
}



export default connect(
  mapStateToProps
)(Quiz)

//export default Quiz