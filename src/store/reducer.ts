import { ApplicationState, ActionTypes, ADD_NOTE } from './types'

export const initialState: ApplicationState = {
  notes: []
}

export function reducer (state = initialState, action: ActionTypes): ApplicationState {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
  }
}
