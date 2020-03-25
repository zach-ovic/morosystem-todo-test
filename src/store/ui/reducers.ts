import { UIState, UIActionTypes, SET_ERROR, FilterType, SET_FILTER } from './types'

const initialState: UIState = {
  error: '',
  filter: FilterType.All
}

export function UIReducer (state = initialState, action: UIActionTypes): UIState {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      }

    default:
      return state
  }
}
