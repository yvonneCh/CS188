import React from 'react'
import loadingGif from '../assets/icons/loading.gif';
import { css } from 'react-emotion'

const Loading = props => (
    <img src={loadingGif} alt="Loading..."
        className={css`
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 400px;
  `}/>
)

export default Loading
