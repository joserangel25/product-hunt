import React from 'react'
import { css } from '@emotion/react'

export default function Error404({children}) {

  return (
    <div
    css={css`
        padding: .1rem;
        border: 1px solid #7B0C01;
        background-color: #FF7F72;
        border-radius: .3rem;
        text-align: center;
        color: #7B0C01;
        @media (min-width: 1024px) {
          max-width: 50%; 
          margin: 2rem auto 0;         
        }
    `}
    >
      <h1>{children}</h1>
    </div>
  )
}
