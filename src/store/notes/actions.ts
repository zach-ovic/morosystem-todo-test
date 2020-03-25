import {
  ADD_NOTE,
  AddNoteAcion,
  SET_NOTES,
  SetNotesAction,
  REMOVE_NOTE,
  RemoveNoteAction,
  UpdateNoteAcion,
  UPDATE_NOTE,
  GET_NOTES_TASK_TAG,
  ADD_NOTE_TASK_TAG,
  CHANGE_COMPLETION_ON_NOTE_TASK_TAG,
  EDIT_NOTE_TASK_TAG,
  REMOVE_NOTE_TASK_TAG
} from './types'
import { startAsyncTask, stopAsyncTask } from '../async/actions'
import { ApplicationThunkResult } from '../types'
import { Note } from '../../model/note'
import { setError } from '../ui/actions'
import { createGroupAsyncTaskCompositeTag } from '../async/types'

export function getNotes (): ApplicationThunkResult<Promise<void>> {
  return async (dispatch, _, serverApi) => {
    dispatch(startAsyncTask(GET_NOTES_TASK_TAG))

    try {
      const response = await serverApi.getNotes()
      dispatch({
        type: SET_NOTES,
        payload: response.data
      } as SetNotesAction)
    } catch (reason) {
      dispatch(setError('Failed download notes. Please try again later.'))
    } finally {
      dispatch(stopAsyncTask(GET_NOTES_TASK_TAG))
    }
  }
}

export function addNote (newNoteText: string): ApplicationThunkResult<Promise<void>> {
  return async (dispatch, _, serverApi) => {
    dispatch(startAsyncTask(ADD_NOTE_TASK_TAG))

    try {
      const response = await serverApi.addNote(newNoteText)
      dispatch({
        type: ADD_NOTE,
        payload: response.data
      } as AddNoteAcion)
    } catch (reason) {
      dispatch(setError('Failed to add note. Please try again later.'))
      throw reason
    } finally {
      dispatch(stopAsyncTask(ADD_NOTE_TASK_TAG))
    }
  }
}

export function changeCompletionOnNote (note: Note, completed: boolean): ApplicationThunkResult<Promise<void>> {
  return async (dispatch, _, serverApi) => {
    const asyncTaskTag = createGroupAsyncTaskCompositeTag(CHANGE_COMPLETION_ON_NOTE_TASK_TAG, note.id)
    dispatch(startAsyncTask(asyncTaskTag))

    try {
      const response = await serverApi.setCompletionOnNote(note.id, completed)
      dispatch(updateNoteInternal(response.data))
    } catch (reason) {
      dispatch(setError("Failed to change note's state. Please try again later."))
      throw reason
    } finally {
      dispatch(stopAsyncTask(asyncTaskTag))
    }
  }
}

export function editNote (note: Note, newNoteText: string): ApplicationThunkResult<Promise<void>> {
  return async (dispatch, _, serverApi) => {
    const asyncTaskTag = createGroupAsyncTaskCompositeTag(EDIT_NOTE_TASK_TAG, note.id)
    dispatch(startAsyncTask(asyncTaskTag))

    try {
      const response = await serverApi.editNote(note.id, newNoteText)
      dispatch(updateNoteInternal(response.data))
    } catch (reason) {
      dispatch(setError("Failed to change note's text. Please try again later."))
      throw reason
    } finally {
      dispatch(stopAsyncTask(asyncTaskTag))
    }
  }
}

export function removeNote (note: Note): ApplicationThunkResult<Promise<void>> {
  return async (dispatch, _, serverApi) => {
    const asyncTaskTag = createGroupAsyncTaskCompositeTag(REMOVE_NOTE_TASK_TAG, note.id)
    dispatch(startAsyncTask(asyncTaskTag))

    try {
      await serverApi.removeNote(note.id)
      dispatch({
        type: REMOVE_NOTE,
        payload: note
      } as RemoveNoteAction)
    } catch (reason) {
      dispatch(setError('Failed to remove note. Please try again later.'))
      throw reason
    } finally {
      dispatch(stopAsyncTask(asyncTaskTag))
    }
  }
}

function updateNoteInternal (note: Note): UpdateNoteAcion {
  return {
    type: UPDATE_NOTE,
    payload: note
  }
}
