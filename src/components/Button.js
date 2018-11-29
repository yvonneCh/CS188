import React, { Component } from 'react'
import { css } from 'react-emotion'
import { navigate } from '@reach/router'

import shadows from '../global/shadows'
import colors from '../global/colors'
import margins from '../global/margins'
import pan from '../assets/icons/pan.svg'
import check from '../assets/icons/check.svg'
import trash from '../assets/icons/trash.png'
import x from '../assets/icons/x.svg'

/*
types:
"plus"
"minus"
"trash"
"cook"
"x"
"select"
"logout"
"confirm"
*/

class Button extends Component {
  render() {
    const themeStyles = this.props.light
      ? css`
          background: ${colors.white};
          color: ${colors.red};
        `
      : css`
          background: ${colors.red};
          color: ${colors.white};
        `

    let renderSymbol
    let borderRadius = '50%'
    let width = '64px'
    let height = width
    switch (this.props.type) {
      case 'plus':
        renderSymbol = '+'
        break
      case 'minus':
        renderSymbol = '-'
        break
      case 'trash':
        renderSymbol = <img src={trash} />
        break
      case 'x':
        renderSymbol = <img src={x} />
        break
      case 'select':
        renderSymbol = (
          <div
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              color: ${colors.black};
            `}
          >
            <img src={check} />
            <span
              className={css`
                margin-left: ${margins.xtiny};
              `}
            >
              Select
            </span>
          </div>
        )
        borderRadius = '32px'
        width = '100px'
        height = '40px'
      case 'cook':
        renderSymbol = (
          <div
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              color: ${colors.white};
            `}
          >
            <span
              className={css`
                margin: 0 ${margins.xtiny};
              `}
            >
              Generate
            </span>
            <img src={pan} />
          </div>
        )
        borderRadius = '32px'
        width = '100%'
        height = '70px'
        break
      case 'logout':
        renderSymbol = (
          <div
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              color: ${colors.white};
              padding: ${margins.medium};
            `}
          >
            <span
              className={css`
                margin-left: ${margins.xtiny};
              `}
            >
              Logout
            </span>
          </div>
        )
        borderRadius = '32px'
        width = '100px'
        height = '70px'
        break
      case 'confirm':
        renderSymbol = (
          <div
            className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              color: ${colors.white};
              padding: ${margins.medium};
            `}
          >
            <span
              className={css`
                margin-left: ${margins.xtiny};
              `}
            >
              Confirm
            </span>
          </div>
        )
        borderRadius = '32px'
        width = '100px'
        height = '70px'
        break
      default:
        break
    }

    return (
      <button
        className={css`
          ${themeStyles}
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: ${borderRadius};
          box-shadow: ${shadows.default};
          font-size: 40px;
          font-weight: bold;
          width: ${width};
          height: ${height};
          border: none;
          text-decoration: none;
          opacity: ${this.props.disabled ? 0.4 : 1};
          cursor: ${this.props.disabled ? 'auto' : 'pointer'};
          :focus {
            outline: none;
          }
          ${this.props.className}
        `}
        onClick={
          this.props.onClick && !this.props.disabled
            ? this.props.onClick
            : this.props.to && !this.props.disabled
            ? () => navigate(this.props.to)
            : null
        }
      >
        {renderSymbol}
      </button>
    )
  }
}

export default Button
