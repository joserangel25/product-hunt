import React from 'react'
import Link from 'next/link'
import { useFirebaseContext } from '../../hooks/useFirebaseContext';
import styled from '@emotion/styled'

const Nav = styled.nav`
  display: flex;
  margin: 0 auto;
  gap: 2rem;
  justify-content: center;
  width: 100%;
    a {
        font-size: 1.8rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;
        &:last-of-type {
            margin-right: 0;
        }
    }
    @media (min-width: 768px){
      padding-left: 2rem;
    }
`;

export default function Navegacion() {
  const { usuario } = useFirebaseContext()
  return (
    <Nav>
      <Link href='/'>Inicio</Link>
      <Link href='/populares'>Populares</Link>
      { usuario && (<Link href='/nuevo-producto'>Nuevo producto</Link>) }
    </Nav>
  )
}
