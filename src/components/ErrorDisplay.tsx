import React from 'react'
import withStyles, { WithStylesProps, Styles } from 'react-jss'

const styles: Styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    'box-sizing': 'border-box',
    padding: 8,
    backgroundColor: 'rgb(255, 220, 220)',
    color: 'rgb(250, 56, 59)',
    border: '0.5px solid rgba(0, 0, 0, 0.3)',
    borderTopWidth: 0,
    fontSize: 10
  }
}

// Component props
interface OwnProps {
    error: string
}

type Props = OwnProps & WithStylesProps<typeof styles>

/**
 * Simple error display.
 */
class ErrorDisplay extends React.Component<Props> {
  render () {
    const { classes, error } = this.props
    return (
      <div className={classes.root}>
        {error}
      </div>
    )
  }
}

export default withStyles(styles)(ErrorDisplay)
