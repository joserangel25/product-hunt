import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

//Context
import { useFirebaseContext } from '../../hooks/useFirebaseContext'

//Components
import Layout from '../../components/layouts/Layout'
import Error404 from '../../components/Error404'

//Emotion
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton'
import PanelAdmin from './PanelAdmin';
import Loader from '../../components/ui/Loader';

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

export default function Producto() {
  const { query: { id } } = useRouter()
  const { firebase, usuario } = useFirebaseContext()
  const [ loading, setLoading ] = useState(true)
  const [ producto, setProducto ] = useState({})
  const [ comentario, setComentario ] = useState('')

  const router = useRouter()

  useEffect(() => {
    if(id){
       firebase.obtenerProductoById(id)
        .then(prod => {
          setProducto(prod)
        })
        .catch(console.log)
        .finally(() => setLoading(false))
      
    }    
  }, [id])

  const { comentarios, fechaCreacion, descripcion, empresa, nombre, url, imagen, votos, creador } = producto;

  const usuarioVoto = () => votos.usuariosQueVotaron.includes(usuario.uid)

  //Votar por un producto
  const handleClickVotarProducto = () => {

    if(!usuario){
      return router.push('/login')
    }

    if(usuarioVoto()){
      console.log('No puedes volver a votar')
      return 
    }

    const nuevoVotos = {
      cantidadVotos: votos.cantidadVotos + 1,
      usuariosQueVotaron: [...votos.usuariosQueVotaron, usuario.uid]
    }

    //Actualizar en la DB
    firebase.votarProducto(id, nuevoVotos)

    setProducto({
      ...producto,
      votos: nuevoVotos
    })
  }

  //Fuciones para los comentarios

  const handleSubmitAgregarComentario = async (e) => {
    e.preventDefault()

    if(!comentario || !usuario){
      console.log('No se puede continuar')
      return
    }

    const comentarioNuevo = {
      mensaje: comentario,
      usuarioId: usuario.uid,
      usuarioNombre: usuario.displayName
    }

    const nuevosComentarios = [
      ...comentarios,
      comentarioNuevo
    ]

    //Se agrega el comentario a la DB
    await firebase.agregarComentario(id, nuevosComentarios)

    setProducto({
      ...producto,
      comentarios: nuevosComentarios
    })
    setComentario('')
  }

  const esCreador = (comentUserId) => comentUserId === creador?.id

  return (
    <Layout>
      { loading && ( <Loader /> ) 
      }

      { (!loading && producto.id) && (
        <div className='contenedor'>
          <h1 css={css`
              text-align: center;
              text-transform: uppercase;
          `}>{nombre} </h1>

          <ContenedorProducto>

            <div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <p>Publicado: hace { formatDistanceToNow( new Date(fechaCreacion), {locale: es} )} </p>
                <p>Por: <span css={css`font-weight: bold`}>{creador.nombre}</span> de {empresa} </p>
              </div>
              <img 
              css={css`max-height: 500px; width: 100%; object-fit: cover`}
              src={imagen.url} />
              <p>{descripcion}</p>

              {
                usuario && (
                  <>
                    <h2>Agrega un comentario</h2>
                    <form
                      onSubmit={handleSubmitAgregarComentario}
                    >
                      <Campo>
                        <input 
                          type='text'
                          name='mensaje'
                          placeholder='Escribe lo que piensas sobre este producto!'
                          value={comentario}
                          onChange={e => setComentario(e.target.value)}
                        />
                      </Campo>
                      <InputSubmit
                        type='submit'
                        value='agregar comentario'
                      />
                    </form>
                  </>
                )
              }

              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >Comentarios</h2>
              <ul>
                {
                  comentarios.length ? (
                    comentarios.map((coment, i) => (
                      <li 
                        key={`${coment.usuarioId}-${i}`}
                        css={css`
                            border: 1px solid #e1e1e1;
                            padding: 2rem;
                        `}
                    >
                        <p>{coment.mensaje}</p>
                        <p>Escrito por: 
                            <span
                                css={css`
                                    font-weight:bold;
                                `}
                            >
                            {''} {coment.usuarioNombre}
                            </span>
                        </p>
                        { esCreador( coment.usuarioId ) && <CreadorProducto>Es Creador</CreadorProducto> }
                    </li>
                    ))
                  )
                  :
                  (
                    <li>No hay comentarios sobre este producto.</li>
                  )
                }
              </ul>
            </div>

            <aside>
              {
                creador.id === usuario?.uid && <PanelAdmin producto={producto} />
              }
              <Boton
                target='_blank'
                bgColor
                href={url}
              >
                Visitar Url

              </Boton>

              <p>{votos.cantidadVotos} Votos</p>

              {
                usuario && (
                  <Boton
                    onClick={handleClickVotarProducto}
                    disabled={usuarioVoto()}
                  
                  >
                    Votar
                  </Boton>
                )
              }
            </aside>

          </ContenedorProducto>
        </div>
      ) }

      { (!loading && !producto.id) && <Error404>{producto.msg}</Error404> }
    </Layout>
  )
}
