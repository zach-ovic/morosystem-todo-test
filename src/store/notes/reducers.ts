import { NotesActionTypes, ADD_NOTE, NotesState, SET_NOTES, REMOVE_NOTE, UPDATE_NOTE } from './types'

const initialState: NotesState = {
  notes: []
}

export function notesReducer (state = initialState, action: NotesActionTypes): NotesState {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }

    case REMOVE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.id)
      }

    case UPDATE_NOTE:
      var updatedNotes = state.notes.map(note => {
        if (note.id !== action.payload.id) {
          return note
        }

        return {
          ...note,
          ...action.payload
        }
      })

      return {
        ...state,
        notes: updatedNotes
      }

    case SET_NOTES:
      return {
        ...state,
        notes: action.payload
      }

    default:
      return state
  }
}
