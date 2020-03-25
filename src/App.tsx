import React from 'react'
import withStyles, { WithStylesProps, Styles } from 'react-jss'
import NoteInput from './components/NoteInput'
import NotesList from './components/NotesList'
import Actions from './components/Actions'
import ErrorDisplay from './components/ErrorDisplay'
import { ApplicationState } from './store'
import { connect, ConnectedProps } from 'react-redux'
import { getNotes } from './store/notes/actions'
import FilterCount from './components/FilterCount'

const styles: Styles = {
  root: {
    width: 500,
    margin: '0 auto'
  },
  header: {
    fontSize: 48,
    lineHeight: '48px',
    textAlign: 'center',
    color: 'rgba(130, 0, 0, 0.2)'
  },
  notes: {
    position: 'relative',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(50, 50, 50)'
  }
}

// Connection to Redux
const mapStateToProps = (state: ApplicationState) => ({
  error: state.ui.error
})

const mapDispatchToProps = ({
  getNotes
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = WithStylesProps<typeof styles> & ConnectedProps<typeof connector>

class App extends React.Component<Props> {
  componentDidMount () {
    this.props.getNotes()
  }

  render () {
    const { classes, error } = this.props

    return (
      <div className={classes.root} >
        <h1 className={classes.header}>todos</h1>
        <div className={classes.notes}>
          <NoteInput />
          {
            error &&
            <ErrorDisplay error={error} />
          }
          <Actions />
          <NotesList />
          <FilterCount />
        </div>

      </div>
    )
  }
}

export default
connector(
  withStyles(styles)(
    App
  )
)
