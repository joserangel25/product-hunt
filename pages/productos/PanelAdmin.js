import React from 'react'
import Router, { useRouter } from 'next/router'
import { useFirebaseContext } from '../../hooks/useFirebaseContext';

import { css } from '@emotion/react';
import Boton from '../../components/ui/Boton';


export default function PanelAdmin({producto}) {

  const { usuario, firebase } =  useFirebaseContext()
  const  { query: { id } } = useRouter()

  const handleClickEliminarProducto = async () => {
    if(!usuario){
      return Router.push('/login')
    }

    if(usuario.uid !== producto?.creador?.id){
      return Router.push('/')
    }

    const decision = confirm('Está seguro de querer eleminar este producto?')

    if(decision){
      await Promise.all([firebase.eliminarProducto(id), firebase.eliminarFotoDeFBStorage(producto.imagen.nameImage)])
      Router.push('/')
    }
  }
  
  return (
    <div
      css={css`
        width: 100%;
        padding: 2rem .5rem;
        background-color: #EEE;
        text-align: center
      `}
    >

      <span>Administra la publicación</span>

      <div
        css={css`
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 5px
      `}
      >
        <button>Editar</button>
        <button
          onClick={handleClickEliminarProducto}
        >Eliminar</button>
      </div>
    
    </div>
  )
}
