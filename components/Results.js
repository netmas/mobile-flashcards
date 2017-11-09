import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, AsyncStorage, Animated} from 'react-native'
import { black, purple, white, gray, red, green } from '../utils/colors';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import Deck from './Deck';
import { connect } from 'react-redux';


//this.props.navigation.state.params.results
class Results extends React.Component {

	componentDidMount() {
      clearLocalNotification()
      .then(setLocalNotification)
	}

	toHome = (e) => {

		return this.props
               .navigation
               .dispatch(NavigationActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Home'})
                    ]
                  }));
	  }

  restartQuiz = (e) => {
      //return this.props.navigation.navigate('Quiz')
      return this.props.navigation.dispatch(NavigationActions.back())

   }

  toDeck = (e) => {
      return this.props
               .navigation
               .dispatch(NavigationActions.reset(
                 {
                    index: 1,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Home'}),
                      NavigationActions.navigate({ routeName: 'Deck', params: {title: this.props.selectedItem.title}})
                    ]
                  }));

   }

	render() {
		return (
			<View style={styles.container}>
				<Text style={{fontSize: 70, marginBottom:5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}> 
		          {this.props.navigation.state.params.results.percent} %
		        </Text>
		        <Text style={{fontSize: 35, marginBottom:30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', color:gray}}> 
		          {this.props.navigation.state.params.results.correct}/{this.props.navigation.state.params.results.total}
		        </Text>
            <TouchableOpacity 
               style={Platform.OS === 'ios' ?styles.iosSubmitBtn:styles.AndroidSubmitBtn}
               onPress={this.restartQuiz}
              >
                  <Text style={styles.submitBtnText}>Restart Quiz</Text>
             </TouchableOpacity>
             <TouchableOpacity 
               style={Platform.OS === 'ios' ?styles.iosSubmitBtn:styles.AndroidSubmitBtn}
               onPress={this.toDeck}
              >
                  <Text style={styles.submitBtnText}>Back to Deck</Text>
             </TouchableOpacity>
		        <TouchableOpacity 
		           style={Platform.OS === 'ios' ?styles.iosSubmitBtn:styles.AndroidSubmitBtn}
		           onPress={this.toHome}
		          >
		              <Text style={styles.submitBtnText}>To Home</Text>
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
  //const { selectedItem } = state
  //console.log(state)
  return {
     selectedItem: state.selectedItem
  }
}

//export default Results
export default connect(
  mapStateToProps
)(Results)