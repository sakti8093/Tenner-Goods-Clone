
let initState={
  cart:[],
  count:1,
  loading:false
}

 export const reducer = ( state=initState,{type,payload} ) => {
  switch (type) {
    case 'SET_PRODUCT':
      return {
       ...state,
        cart:payload
      }
      case 'INCREASE_PRODUCT':
      return{
        ...state,
        count:state.count+1
      }
      case 'DECREASE_PRODUCT':
      return{
       ...state,
       count:state.count-1
      }
      case 'START_LOADING':
        return{
          ...state,
          loading:true
        }
        case 'STOP_LOADING':
          return{
            ...state,
            loading:false
          }
    default:
      return state
  }

 }

export default reducer
