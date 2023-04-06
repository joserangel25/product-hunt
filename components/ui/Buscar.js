import React, { useState } from 'react'
import Router from 'next/router';
import { css } from '@emotion/react'
import styled from '@emotion/styled' 

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;
const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 3rem;
    /* TODO: mejorar el icono de lupa */
    background-image: url('/assets/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;
    &:hover {
        cursor: pointer;
    }
`;

export default function Buscar() {
  const [ busqueda, setBusqueda ] = useState('')

  const handleSubmitBuscarProducto = e => {
    e.preventDefault();
    if(busqueda.trim() === '') return

    Router.push({
      pathname: '/buscar',
      query: { q: busqueda }
    })
  }
  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={handleSubmitBuscarProducto}
    >
      <InputText 
        type="text" 
        placeholder='buscar productos'
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)} 
      />
      <InputSubmit type='submit'>Buscar</InputSubmit>
    </form>
  )
}
