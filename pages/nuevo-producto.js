import React, { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { css } from '@emotion/react' 
import Layout from "../components/layouts/Layout";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";

//Firebase
import firebase, { FirebaseContext } from "../firebase";

import { useValidacion } from "../hooks/useValidacion";
import validarCrearProducto from "../validaciones/validacionCrearProducto";


export default function NuevoProducto() {

  const [ error, setError ] = useState('')
  const [ cargando, setCargando ] = useState(false)
  const [ imagenState, setImagenState ] = useState(null)
  const { usuario, agregarProductoDB } = useContext(FirebaseContext)


  const INITIAL_STATE = {
    nombre: '',
    empresa: '',
    url: '',
    descripcion: ''
  };

  //Hook de routing de next
  const router = useRouter();


  useEffect(() => {
    //TODO: como hacer rutas privadas en Next
    // console.log(usuario)
    // if(!usuario){
    //   Router.push('/')
    // }
  }, [])
  


  const { valoresInputs, 
          errores,
          handleChangeInputs,
          handleSubmit } = useValidacion(INITIAL_STATE, validarCrearProducto, crearProducto);

  const { nombre, empresa, url, descripcion } = valoresInputs;

  async function crearProducto(){
    if(!usuario){
      setError('No estás logueado. Por favor inicia sesión para luego agregar un producto')
      setTimeout(() => {
        router.push('/')
      }, 1000);

      return
    }

    if(!imagenState){
      setError('Debes seleccionar una imagen')
      return
    }
    
    setCargando(true)
    try {
    // crear el objeto de nuevo producto 
      const producto = {
        nombre, 
        empresa, 
        url,
        imagen: await firebase.subirFotoAFBStorage(imagenState),
        descripcion,
        votos: {
          cantidadVotos: 0,
          usuariosQueVotaron: []
        },
        comentarios: [],
        fechaCreacion: Date.now(),
        creador: {
          id: usuario.uid,
          nombre: usuario.displayName
        },
      }
      await agregarProductoDB(producto)
      alert('Se guardó el producto correctamente!')
      router.push('/')
    } catch (error) {
      console.log(error)
      setError('Hubo un error al guardar el producto. Comuníquese con el administrador del servicio!')
    } finally {
      setCargando(false)
    }
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setImagenState(newFile);
  };

  
  
  return (
    <Layout>
      <>
        <h1 css={css`
          text-align: center;
          margin-top: 2rem;
        `}>Agrega un nuevo producto
        </h1>
        
        <Formulario
          onSubmit={handleSubmit}
        >
          <fieldset>
            <legend>Información general</legend>
          
          {
            errores.nombre && <Error>{errores.nombre}</Error>
          }
          <Campo
            error={errores.nombre}
          >
            <label htmlFor="nombre">Nombre</label>
            <input 
              type="text" 
              name="nombre" 
              id="nombre" 
              placeholder="Ej. Zapatos de goma inflables"
              value={nombre}
              onChange={handleChangeInputs}  
            />
          </Campo>

          {
            errores.empresa && <Error>{errores.empresa}</Error>
          }
          <Campo
            error={errores.empresa}
          >
            <label htmlFor="empresa">Empresa</label>
            <input 
              type="text" 
              name="empresa" 
              id="empresa" 
              placeholder="Ej. Nike"
              value={empresa}
              onChange={handleChangeInputs}  
            />
          </Campo>

          {/* {
            errores.imagen && <Error>{errores.imagen}</Error>
          } */}
          <Campo
            // error={errores.imagen}
          >
            <label htmlFor="imagen">Imagen</label>
            <input 
              type="file"
              accept="image/jpg" 
              name="imagen" 
              id="imagen"
              onChange={handleFileChange}  
            />
          </Campo>

          {
            errores.url && <Error>{errores.url}</Error>
          }
          <Campo
            error={errores.url}
          >
            <label htmlFor="url">Url</label>
            <input 
              type="url" 
              name="url" 
              id="url"
              placeholder="Ej. www.nike.com.co"
              value={url}
              onChange={handleChangeInputs}  
            />
          </Campo>
          </fieldset>

          <fieldset>
            <legend>Sobre tu producto</legend>

            {
              errores.descripcion && <Error>{errores.descripcion}</Error>
            }
            <Campo
              error={errores.descripcion}
            >
              <label htmlFor="descripcion">Descripcion</label>
              <textarea
                name="descripcion" 
                id="descripcion"
                value={descripcion}
                onChange={handleChangeInputs}  
              />
          </Campo>

          </fieldset>

          

          <InputSubmit
            css={css`margin-bottom: 2rem;`} 
            type="submit" 
            value={cargando ? 'Agregando producto...' : 'Crear Producto'} 
            disabled={cargando} 
          />
          {
            error && <Error>{error}</Error>
          }
        </Formulario>

      </>
    </Layout>
  )
}
