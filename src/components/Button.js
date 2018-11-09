import React, { Component } from 'react'
import { css } from 'react-emotion'

import shadows from '../global/shadows'

/*
types:
"plus"
"minus"
"trash"
"cook"
"x"
*/

class Button extends Component {
  render() {
    let themeStyles = {}
    if (this.props.light) {
      themeStyles = {
        background: 'white',
        color: 'red'
      }
    }
    else {
      themeStyles = {
        background: 'red',
        color: 'white'
      }
    }

    return (
      <button
        className={css`
          color: ${themeStyles.color};
          background: ${themeStyles.background};
          border-radius: 50%;
          box-shadow: ${shadows.default};
          font-size: 24px;
          font-weight: bold;
          width: 45px;
          height: 45px;
          border: none;
        `}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    )
  }
}

export default Button
