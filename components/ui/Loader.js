import React from 'react'
import { css } from '@emotion/react';
// import styles from '../../styles/Loader.module.css'



export default function Loader() {
  return (
    <div
      css={css`
        width: 100vw;
        height: 50vh;
        display: grid;
        place-content: center;
      `}
    >
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
    
  )
}
