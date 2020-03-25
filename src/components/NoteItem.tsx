import React from 'react'
import withStyles, { WithStylesProps, Styles } from 'react-jss'
import { Note } from '../model/note'
import Button from './Button'
import Spinner from './Spinner'

const styles: Styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    'box-sizing': 'border-box',
    padding: 8,
    height: 64
  },
  text: {
    flexGrow: 1,
    marginLeft: 8,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)'
  },
  editInput: {
    flexGrow: 1,
    fontSize: 14,
    padding: 2,
    marginRight: 8,
    color: 'rgba(0, 0, 0, 0.8)'
  },
  checkbox: {
    flexShrink: 0,
    width: 16,
    height: 16
  }
}

// Component state
interface State {
  isEditing: boolean
  editText: string
}

// Component props
interface OwnProps {
    note: Note
    working: boolean
    onTextChange: (newNoteText: string) => Promise<void>
    onCompletionChange: (completed: boolean) => void
    onRemoveClick: () => void
}

type Props = OwnProps & WithStylesProps<typeof styles>

/**
 * Single note item allowing changing completion state, removing and editing note.
 */
class NoteItem extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
    this.handleCompletionChange = this.handleCompletionChange.bind(this)
    this.handleEditTextChange = this.handleEditTextChange.bind(this)
    this.handleEditDoneClick = this.handleEditDoneClick.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)

    this.state = {
      isEditing: false,
      editText: props.note.text
    }
  }

  handleEditClick () {
    this.setState({
      ...this.state,
      isEditing: true,
      editText: this.props.note.text
    })
  }

  handleRemoveClick () {
    this.props.onRemoveClick()
  }

  handleCompletionChange (complete: boolean) {
    this.props.onCompletionChange(complete)
  }

  handleEditTextChange (event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      editText: event.currentTarget.value
    })
  }

  async handleEditDoneClick (save: boolean) {
    // Ignore empty input on save
    if (save && !this.state.editText) {
      return
    }

    if (save) {
      await this.props.onTextChange(this.state.editText)
    }

    this.setState({
      ...this.state,
      isEditing: false
    })
  }

  handleEditSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.handleEditDoneClick(true)
  }

  render () {
    const { classes, note, working } = this.props
    const { isEditing } = this.state

    const defaultView =
      <div className={classes.root}>
        <input
          onChange={event => this.handleCompletionChange(event.currentTarget.checked)}
          checked={note.completed}
          className={classes.checkbox}
          type="checkbox"
        />
        <div className={classes.text}>{note.text}</div>
        <Button onClick={this.handleEditClick}>edit</Button>
        <Button onClick={this.handleRemoveClick}>remove</Button>
      </div>

    const editView =
      <form className={classes.root} onSubmit={this.handleEditSubmit}>
        <input
          onChange={this.handleEditTextChange}
          className={classes.editInput}
          value={this.state.editText}
          type="text"
        />
        <Button onClick={() => this.handleEditDoneClick(true)}>save</Button>
        <Button onClick={() => this.handleEditDoneClick(false)}>cancel</Button>
      </form>

    const workingView =
      <div className={classes.root}>
        <Spinner size={32} />
      </div>

    if (working) {
      return workingView
    } else if (isEditing) {
      return editView
    }
    return defaultView
  }
}

export default withStyles(styles)(NoteItem)
