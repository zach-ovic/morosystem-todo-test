import { Note } from '../model/note'
import { ThunkAction } from 'redux-thunk';

// Global application state
export interface ApplicationState {
    notes: Note[]
}

type ThunkResult<R> = ThunkAction<R, ApplicationState, undefined, Actions>;

// List of action types
export const ADD_NOTE = 'ADD_NOTE'

// Action types
export interface AddNoteAcion {
    type: typeof ADD_NOTE
    payload: Note
}

export type ActionTypes =
    AddNoteAcion
