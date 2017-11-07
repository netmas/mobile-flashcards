import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks (state = { items:[],
                          selectedItem:[]}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return  {
        ...state,
        items:action.decks
      }
    case ADD_DECK :   
      const newIndex = Object.keys(state).length;
      let newDeck = action.deck
      let addedDeck = [...state.items, newDeck]
      return {
        ...state,
        items: addedDeck
      }
    case ADD_CARD :   
      let deckToEdit= state.items.find(item => item.title === action.deck) 
      const deckIndex = state.items.findIndex(item => item.title === action.deck)
      let allDecks = [...state.items]
      let newCard = [{...action.card}]
      
      allDecks[deckIndex] = {
        ...deckToEdit,
        questions:[...deckToEdit.questions, ...newCard]
      }
      return {
        ...state,
        items: allDecks
      }
    default :
      return state
  }
}

export default decks