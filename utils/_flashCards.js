import { AsyncStorage } from 'react-native'

export const MOBILE_FLASHCARD_DECK_STORAGE_KEY = 'Mobile-Flashcard:decks'

export function formatDecksResults (results) {
  console.log(results)
  return results === null
    ? null
    : JSON.parse(results).map((deck)=>(
    		deck.map((item)=>  {
    			return {title: item.title, questions:item.question}
    		})
    	))
    }
