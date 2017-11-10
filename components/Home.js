import React, { Component } from 'react'
import {View, StyleSheet, FlatList, AsyncStorage, Text, ActivityIndicator, TouchableHighlight } from 'react-native'
import { black, purple, white } from '../utils/colors';
import {getDecks} from '../utils/api';
import Reactotron from 'reactotron-react-native';
import { receiveDecks } from '../actions'
import { connect } from 'react-redux';
import { List, ListItem } from "react-native-elements";

class Home extends React.Component {

	componentDidMount() {
		getDecks().then((decks) => this.props.receiveDecks(decks))
	}

	renderSeparator = () => {
	    return (
	      <View
	        style={{
	          height: 1,
	          width: "86%",
	          backgroundColor: "#CED0CE",
	          marginLeft: "14%"
	        }}
	      />
	    );
	  };

	renderFooter = () => {
	    if (!this.state.loading) return null;

	    return (
	      <View
	        style={{
	          paddingVertical: 20,
	          borderTopWidth: 1,
	          borderColor: "#CED0CE"
	        }}
	      >
	      </View>
	    );
	  };

	render() {		
		const { decks } = this.props
		const data = [{ title: "My title" }, { title: "My other title" }]
		//const data=Object.values(this.props.decks)
		//console.log(data)
		//console.log(decks)
		return (
			console.log(data) || (
			<View style={styles.container}>
				<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
				{Object.values(decks).length>0?
			    <FlatList
		            data={Object.values(decks)}
		            renderItem={({ item }) => (
			            <ListItem
			              roundAvatar
			              title={`${item.title}`}
			              subtitle={`${Object.keys(item.questions).length} Cards`}
			              avatar={Object.keys(item.questions).length <= 0?require('../images/deck-black.png'):require('../images/deck-blue.png')}
			              containerStyle={{ borderBottomWidth: 0 }}
			              onPress=	{() => {return this.props.navigation.navigate('Deck', {
			              						title: item.title
			              						})
			          					  	}
			          				}
			            />
			          )}
		            keyExtractor={item => item.title}
		            ItemSeparatorComponent={this.renderSeparator}

		          />
		          :
		          <Text>No data to display</Text>
		      	}
				</List>
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
     decks: state.items
  }
}

const mapDispatchToProps = {
  receiveDecks
}

//export default Home

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)