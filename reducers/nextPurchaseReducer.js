import { CHANGE_NEXT_PURCHASE } from '../actions'

const initialState = { book: "d" }

const nextPurchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NEXT_PURCHASE:
      return { book: action.book }
    default:
      return state
  }
}

export default nextPurchaseReducer