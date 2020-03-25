import React from 'react'
import withStyles, { WithStylesProps, Styles } from 'react-jss'

const styles: Styles = {
  root: {
    height: 16,
    lineHeight: '16px',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    padding: 3,
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: 1,
    userSelect: 'none',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.6)',
      color: 'rgba(0, 0, 0, 0.9)'
    }
  }
}

// Component props
interface OwnProps {
    onClick: () => void
}

type Props = OwnProps & WithStylesProps<typeof styles>

/**
 * Simple button component.
 */
class Button extends React.Component<Props> {
  constructor (props: Props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick (_: React.MouseEvent<HTMLDivElement>) {
    this.props.onClick()
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root} onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(styles)(Button)
