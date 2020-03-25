import React from 'react'
import { ApplicationState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import withStyles, { WithStylesProps, Styles } from 'react-jss'
import { filteredNotes } from '../store/notes/selectors'
import NoteItem from './NoteItem'
import { Note } from '../model/note'
import { changeCompletionOnNote, editNote, removeNote } from '../store/notes/actions'
import { isAsyncTaskRunning, groupAsyncTaskDictionary } from '../store/async/selectors'
import Spinner from './Spinner'
import { GET_NOTES_TASK_TAG, REMOVE_NOTE_TASK_TAG, EDIT_NOTE_TASK_TAG } from '../store/notes/types'

const styles: Styles = {
  root: {
    width: '100%',
    backgroundColor: 'white',
    'box-sizing': 'border-box',
    border: '0.5px solid rgba(0, 0, 0, 0.3)',
    borderTopWidth: 0
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    '& > :first-child': {
      marginBottom: 8
    }
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.3)',
    textTransform: 'uppercase'
  },
  itemsContainer: {
    '& > :not(:last-child)': {
      borderBottom: '0.5px solid rgba(0, 0, 0, 0.3)'
    }
  }
}

// Connection to Redux
const mapStateToProps = (state: ApplicationState) => ({
  notes: filteredNotes(state),
  gettingNotesAsyncTask: isAsyncTaskRunning(GET_NOTES_TASK_TAG)(state),
  removingNotesAsyncTask: groupAsyncTaskDictionary(REMOVE_NOTE_TASK_TAG)(state),
  editingNotesAsyncTask: groupAsyncTaskDictionary(EDIT_NOTE_TASK_TAG)(state)
})

const mapDispatchToProps = {
  changeCompletionOnNote,
  editNote,
  removeNote
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// Component props
type Props = WithStylesProps<typeof styles> & ConnectedProps<typeof connector>

/**
 * Component that shows list of notes.
 */
class NotesList extends React.Component<Props> {
  constructor (props: Props) {
    super(props)
    this.onNoteCompletionChanged = this.onNoteCompletionChanged.bind(this)
    this.onNoteTextChanged = this.onNoteTextChanged.bind(this)
    this.onRemoveClick = this.onRemoveClick.bind(this)
  }

  onNoteCompletionChanged (note: Note, completed: boolean) {
    this.props.changeCompletionOnNote(note, completed)
  }

  onNoteTextChanged (note: Note, newNoteText: string): Promise<void> {
    return this.props.editNote(note, newNoteText)
  }

  onRemoveClick (note: Note) {
    this.props.removeNote(note)
  }

  render () {
    const {
      classes,
      gettingNotesAsyncTask,
      notes,
      removingNotesAsyncTask,
      editingNotesAsyncTask
    } = this.props

    const downloadingView =
      <div className={classes.emptyContainer}>
        <Spinner size={32} />
        <div className={classes.emptyText}>
          getting your notes
        </div>
      </div>

    // Shown when no notes are downloaded
    const emptyView =
      <div className={classes.emptyContainer}>
        <div className={classes.emptyText}>
          no notes
        </div>
      </div>

    // Shown when
    const itemsView =
      <div className={classes.itemsContainer}>
        {notes.map(note =>
          <NoteItem
            key={note.id}
            note={note}
            working={removingNotesAsyncTask[note.id] || editingNotesAsyncTask[note.id]}
            onCompletionChange={(completed: boolean) => this.onNoteCompletionChanged(note, completed)}
            onTextChange={(newNoteText: string) => this.onNoteTextChanged(note, newNoteText)}
            onRemoveClick={() => this.onRemoveClick(note)}
          />
        )}
      </div>

    let viewToShow = itemsView
    if (gettingNotesAsyncTask) {
      viewToShow = downloadingView
    } else if (notes.length === 0) {
      viewToShow = emptyView
    }

    return <div className={classes.root}>{viewToShow}</div>
  }
}

export default
connector(
  withStyles(styles)(
    NotesList
  )
)
