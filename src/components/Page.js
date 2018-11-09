import React from 'react'
import { css } from 'react-emotion'

import backArrow from '../assets/icons/arrow-dark.png'

const Page = props => (
  <div
    className={css`
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: 100vh;
    `}
  >
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        max-width: 480px;
        padding: 24px 16px;
      `}
    >
      {props.backButton && (
        <div
          className={css`
            width: 100%;
          `}
        >
          <img
            src={backArrow}
            className={css`
              width: 30px;
              height: 30px;
            `}
          />
        </div>
      )}
      {props.children}
      {!!props.bottomBar && (
        <div
          className={css`
            flex: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          `}
        >
          {props.bottomBar}
        </div>
      )}
    </div>
  </div>
)

export default Page