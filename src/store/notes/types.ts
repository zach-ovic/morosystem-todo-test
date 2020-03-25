import { Note } from '../../model/note'

// Notes redux slice definition
export interface NotesState {
    notes: Note[]
}

// Action types
export const SET_NOTES = 'SET_NOTES'
export interface SetNotesAction {
    type: typeof SET_NOTES
    payload: Note[]
}

export const ADD_NOTE = 'ADD_NOTE'
export interface AddNoteAcion {
    type: typeof ADD_NOTE
    payload: Note
}

export const REMOVE_NOTE = 'REMOVE_NOTE'
export interface RemoveNoteAction {
    type: typeof REMOVE_NOTE
    payload: Note
}

export const UPDATE_NOTE = 'UPDATE_NOTE'
export interface UpdateNoteAcion {
    type: typeof UPDATE_NOTE
    payload: Note
}

// Async tasks tags
export const GET_NOTES_TASK_TAG = 'GET_NOTES'
export const ADD_NOTE_TASK_TAG = 'ADD_NOTE'
export const REMOVE_NOTE_TASK_TAG = 'REMOVE_NOTE'
export const EDIT_NOTE_TASK_TAG = 'EDIT_NOTE'
export const CHANGE_COMPLETION_ON_NOTE_TASK_TAG = 'CHANGE_COMPLETION_ON_NOTE'

export type NotesActionTypes = SetNotesAction | AddNoteAcion | RemoveNoteAction | UpdateNoteAcion
