import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useFirebaseContext } from '../../hooks/useFirebaseContext'

import Navegacion from './Navegacion'
import Buscar from '../ui/Buscar'
import Boton from '../ui/Boton'

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const BarraNavegacion = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    
    flex-direction: row;
    align-items: center;
  }
`

const Logo  = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
`

const UserInformacion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

`

export default function Header() {

  const { usuario, firebase } = useFirebaseContext()

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <ContenedorHeader>
        <BarraNavegacion>
          <div
            css={css`
            display: flex;
            gap: .5rem;
            justify-content: center;
            align-items: center
          `}
          >
            <Link href='/'>
              <Logo>P</Logo>
            </Link>
            <Buscar />
          </div>
          <Navegacion />
        </BarraNavegacion>

        <UserInformacion>
          {
            usuario ? (
              <>
                <p>{usuario.displayName}</p>
                <Boton 
                  bgColor
                  onClick={() => firebase.cerrarSesion() }
                >
                  Cerrar sesión
                </Boton>
              </>          
            ) 
            :
            (
              <>
                <Link href='/login' passHref legacyBehavior >
                  <Boton
                    bgColor='true'
                  >Login</Boton>
                </Link>
                <Link href='/crear-cuenta' passHref legacyBehavior >
                  <Boton>Crear cuenta</Boton>
                </Link>
              </>
            )
          }
        </UserInformacion>
      </ContenedorHeader>
    </header>
  )
}
