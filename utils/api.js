import { AsyncStorage } from 'react-native'
import escapeRegExp from 'escape-string-regexp'
import { MOBILE_FLASHCARD_DECK_STORAGE_KEY } from './_flashCards'

export function getDecks () {

  return AsyncStorage.getItem(MOBILE_FLASHCARD_DECK_STORAGE_KEY)
  			.then((results) => {
            //alert(results)
             results= JSON.parse(results)            
             
             return Object.values(results).map((deck)=>(
                     {title: deck.title, questions:deck.question}
                ))

          })
}

export function getDeck (title) {

  return AsyncStorage.getItem(MOBILE_FLASHCARD_DECK_STORAGE_KEY)
        .then((results) => {
            //alert(results)
             results= JSON.parse(results)            
             const matchTitle = new RegExp(escapeRegExp(title))
             /*
             return Object.values(results).map((deck)=>(
                     {title: deck.title, questions:deck.question}
                ))*/
             return Object.values(results).filter((deck) => matchTitle.test(deck.title))

          })
}

export function saveDeckTitle (title) {

   
  return AsyncStorage.mergeItem(MOBILE_FLASHCARD_DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
    			title: title,
    			questions:[]
    		 }
  }))

}

