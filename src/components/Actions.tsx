import React from 'react'
import { ApplicationState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import withStyles, { WithStylesProps, Styles } from 'react-jss'
import Button from './Button'
import { removeNote, changeCompletionOnNote } from '../store/notes/actions'
import { toggleFilter } from '../store/ui/actions'
import { completedNotes, incompleteNotes, filteredNotes } from '../store/notes/selectors'
import { FilterType } from '../store/ui/types'

const styles: Styles = {
  root: {
    display: 'flex',
    padding: 4,
    border: '0.5px solid rgba(0, 0, 0, 0.3)',
    borderTopWidth: 0
  }
}

// Connection to Redux
const mapStateToProps = (state: ApplicationState) => ({
  completedNotes: completedNotes(state),
  incompleteNotes: incompleteNotes(state),
  filteredNotes: filteredNotes(state),
  filter: state.ui.filter
})

const mapDispatchToProps = {
  removeNote,
  toggleFilter,
  changeCompletionOnNote
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// Component props
type Props = WithStylesProps<typeof styles> & ConnectedProps<typeof connector>

/**
 * Action buttons component.
 */
class Actions extends React.Component<Props> {
  constructor (props: Props) {
    super(props)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleRemoveAllCompleted = this.handleRemoveAllCompleted.bind(this)
    this.handleMarkAllAsCompleted = this.handleMarkAllAsCompleted.bind(this)
  }

  handleFilterChange () {
    this.props.toggleFilter()
  }

  handleRemoveAllCompleted () {
    this.props.completedNotes.forEach(note => this.props.removeNote(note))
  }

  handleMarkAllAsCompleted () {
    this.props.incompleteNotes.forEach(note => this.props.changeCompletionOnNote(note, true))
  }

  render () {
    const { classes, filter } = this.props

    // Text of filter toggle button
    let filterButtonText = 'Show completed'
    if (filter === FilterType.Completed) {
      filterButtonText = 'Show incomplete'
    } else if (filter === FilterType.Incomplete) {
      filterButtonText = 'Show all'
    }

    return (
      <div className={classes.root}>
        <Button onClick={this.handleFilterChange}>{filterButtonText}</Button>
        <Button onClick={this.handleRemoveAllCompleted}>Remove all completed</Button>
        <Button onClick={this.handleMarkAllAsCompleted}>Mark all as completed</Button>
      </div>
    )
  }
}

export default
connector(
  withStyles(styles)(
    Actions
  )
)
