import { AsyncStorage } from 'react-native'
import { MOBILE_FLASHCARD_DECK_STORAGE_KEY, formatDecksResults } from './_flashCards'

export function getDecks () {
  let value = AsyncStorage.getItem(MOBILE_FLASHCARD_DECK_STORAGE_KEY)

  value === null && (

  	AsyncStorage.setItem(MOBILE_FLASHCARD_DECK_STORAGE_KEY, JSON.stringify({"my value":"hola"}))

  )

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

  return AsyncStorage.mergeItem(MOBILE_FLASHCARD_DECK_STORAGE_KEY, JSON.stringify({"my value":"hola"}))
  
}

