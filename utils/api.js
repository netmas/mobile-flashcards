import { AsyncStorage } from 'react-native'
import { MOBILE_FLASHCARD_DECK_STORAGE_KEY, formatDecksResults } from './_flashCards'

export function getDecks () {
  return AsyncStorage.getItem(MOBILE_FLASHCARD_DECK_STORAGE_KEY)
  			//.then(formatDecksResults)
    
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(MOBILE_FLASHCARD_DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
    			title: title,
    			questions:[]
    		 }
  }))
}

