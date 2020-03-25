import { ApplicationState } from '..'
import { createSelector } from 'reselect'
import { activeFilter } from '../ui/selectors'
import { FilterType } from '../ui/types'

const notes = (state: ApplicationState) => state.notes.notes

export const notesCount = createSelector(notes, notes => notes.length)
export const completedNotes = createSelector(notes, notes => notes.filter(note => note.completed))
export const incompleteNotes = createSelector(notes, notes => notes.filter(note => !note.completed))
export const filteredNotes = createSelector(notes, activeFilter, (notes, activeFilter) => {
  let filteredNotes

  switch (activeFilter) {
    case FilterType.All:
      filteredNotes = [...notes]
      break
    case FilterType.Completed:
      filteredNotes = notes.filter(note => note.completed)
      break
    case FilterType.Incomplete:
      filteredNotes = notes.filter(note => !note.completed)
      break
  }

  return filteredNotes.sort((a, b) => b.createdDate - a.createdDate)
})
