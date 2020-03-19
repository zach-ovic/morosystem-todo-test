import { Note } from '../model/note'
import { AddNoteAcion, ADD_NOTE, ApplicationState, ActionTypes } from './types'
import { ThunkAction } from 'redux-thunk'
import { IServerApi } from '../api/api'

export function addNote (newNote: Note): AddNoteAcion {
  return {
    type: ADD_NOTE,
    payload: newNote
  }
}

type ApplicationThunkAction<R> = ThunkAction<R, ApplicationState, IServerApi, ActionTypes>

export function addNoteThunk (newNoteText: string): ApplicationThunkAction<Note> {
  return (dispatch, getState, serverApi): Note => {
    serverApi.addNote(newNoteText)
      .then(response => response.data)
  }
}
