import React from 'react'

let initState={
  cart:[]
}

 export const reducer = ( state=initState,{type,payload} ) => {
  switch (type) {
    case 'SET_PRODUCT':
      return {
       ...state,
        cart:[...cart,payload]
      }
    default:
      return state
  }

 }

export default reducer
