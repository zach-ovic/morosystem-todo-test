import React from 'react'
import { ApplicationState } from '../store'
import { connect, ConnectedProps } from 'react-redux'
import withStyles, { WithStylesProps, Styles } from 'react-jss'
import { filteredNotes, notesCount } from '../store/notes/selectors'

const styles: Styles = {
  root: {
    padding: 4,
    paddingLeft: 8,
    border: '0.5px solid rgba(0, 0, 0, 0.3)',
    borderTopWidth: 0,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)'
  }
}

// Connection to Redux
const mapStateToProps = (state: ApplicationState) => ({
  filteredNotes: filteredNotes(state),
  allNotesCount: notesCount(state)
})

const connector = connect(mapStateToProps)

// Component props
type Props = WithStylesProps<typeof styles> & ConnectedProps<typeof connector>

/**
 * Component that displays count of currently showing notes vs. total count of notes.
 */
class FilterCount extends React.Component<Props> {
  render () {
    const { classes, filteredNotes, allNotesCount } = this.props

    if (filteredNotes.length === 0) {
      return null
    }

    return (
      <div className={classes.root}>
        Showing {filteredNotes.length} of {allNotesCount} todos
      </div>
    )
  }
}

export default
connector(
  withStyles(styles)(
    FilterCount
  )
)
