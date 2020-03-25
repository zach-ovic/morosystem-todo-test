import React, { ChangeEvent, FormEvent } from 'react'
import withStyles, { WithStylesProps, Styles } from 'react-jss'
import { ApplicationState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import { addNote } from '../store/notes/actions'
import { isAsyncTaskRunning } from '../store/async/selectors'
import Spinner from './Spinner'
import { ADD_NOTE_TASK_TAG, GET_NOTES_TASK_TAG } from '../store/notes/types'

const styles: Styles = {
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    padding: 8,
    outlineColor: 'rgba(0, 0, 0, 0.3)',
    'box-sizing': 'border-box'
  },
  spinner: {
    position: 'absolute',
    right: 8
  }
}

// Component state
interface State {
    text: string
}

// Connection to Redux
const mapStateToProps = (state: ApplicationState) => ({
  isAddingNote: isAsyncTaskRunning(ADD_NOTE_TASK_TAG)(state),
  isGettingNotes: isAsyncTaskRunning(GET_NOTES_TASK_TAG)(state)
})

const mapDispatchToProps = {
  addNote
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// Component props
type Props = WithStylesProps<typeof styles> & ConnectedProps<typeof connector>

/**
 * Component that allows adding notes via input textfield.
 */
class NoteInput extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      text: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      text: event.currentTarget.value
    })
  }

  async handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Ignore empty input
    if (!this.state.text) {
      return
    }

    await this.props.addNote(this.state.text)

    // Clear input on success
    this.setState({
      ...this.state,
      text: ''
    })
  }

  render () {
    const { classes, isAddingNote } = this.props

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <input
          disabled={isAddingNote}
          className={classes.input}
          placeholder="What needs to be done?"
          value={this.state.text}
          onChange={this.handleChange}
        />
        {
          // Show spinner when adding note (communicating with the server)
          isAddingNote &&
          <div className={classes.spinner}>
            <Spinner size={16} />
          </div>
        }
      </form>
    )
  }
}

export default
connector(
  withStyles(styles)(
    NoteInput
  )
)
