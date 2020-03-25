import React from 'react'
import withStyles, { WithStylesProps, Styles } from 'react-jss'
import spinner from '../images/spinner.png'

const styles: Styles = {
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(359deg)'
    }
  },
  root: {
    animation: '$spin 2s linear infinite'
  }
}

// Component props
interface OwnProps {
    size: number
}

type Props = OwnProps & WithStylesProps<typeof styles>

class Spinner extends React.Component<Props> {
  render () {
    const { classes, size } = this.props
    return (
      <img
        style={{ width: size, height: size }}
        src={spinner}
        className={classes.root}
        alt="loading..."
      />
    )
  }
}

export default withStyles(styles)(Spinner)
