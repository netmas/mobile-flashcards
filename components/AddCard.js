import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, AsyncStorage} from 'react-native'
import { black, purple, white, gray } from '../utils/colors';
import { connect } from 'react-redux';
import {getDeck} from '../utils/api';

class AddCard extends React.Component {

	render() {
		return (
			<View>
				<Text>
					Add Card
				</Text>
			</View>
		)
	}

}

export default AddCard