import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, AsyncStorage} from 'react-native'
import { black, purple, white, gray, red, green } from '../utils/colors';
import { connect } from 'react-redux';

class Quiz extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={{fontSize: 15, alignSelf: 'flex-start'}}> 
          				1/1
        		</Text>

				<Text style={{fontSize: 30, marginTop:30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}> 
          				MI PREGUNTA
        		</Text>

        		<TouchableOpacity 
        			style={{marginBottom:80}}
	           		onPress={this.AddNewCard}
	          	>
	          		<Text style={styles.submitBtnTextRed}>Answer</Text>
        		</TouchableOpacity>	
	        	<TouchableOpacity 
	           		style={Platform.OS === 'ios' ?styles.iosSubmitBtn:styles.AndroidSubmitBtnGreen}
	           		onPress={this.AddNewCard}
	          	>
	            	<Text style={styles.submitBtnText}>Correct</Text>
	          	</TouchableOpacity>
	          	<TouchableOpacity 
	           		style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtnRed}
	           		onPress={this.StartQuiz}
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

export default Quiz