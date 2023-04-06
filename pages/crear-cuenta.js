import React, { useState } from "react";
import Router from "next/router";
import { css } from '@emotion/react' 
import Layout from "../components/layouts/Layout";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";

//Firebase
import firebase from "../firebase";

import { useValidacion } from "../hooks/useValidacion";
import validarCrearCuenta from "../validaciones/validacionCrearCuenta";

export default function CrearCuenta() {

  const [ error, setError ] = useState('')

  const INITIAL_STATE = {
    nombre: '',
    email: '',
    password: ''
  };

  const crearCuenta = async () => {
    console.log('creando la cuenta...')
    try {
      await firebase.registrarUsuario(nombre, email, password)
      Router.push('/')
    } catch (error) {
      console.log('hubo un error al crear el usuario', error.message) 
      setError(error.message)
    }
  }

  const { valoresInputs, 
          errores,
          handleChangeInputs,
          handleSubmit } = useValidacion(INITIAL_STATE, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valoresInputs;
  
  return (
    <Layout>
      <>
        <h1 css={css`
          text-align: center;
          margin-top: 5rem;
        `}>Crear Cuenta
        </h1>
        
        <Formulario
          onSubmit={handleSubmit}
        >
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
              placeholder="Ej. Jose Rangel"
              value={nombre}
              onChange={handleChangeInputs} 
            />
          </Campo>
          {
            errores.email && <Error>{errores.email}</Error>
          }
          <Campo
            error={errores.email}
          >
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Ej. correo@correo.com"
              value={email}
              onChange={handleChangeInputs}  
            />
          </Campo>

          {
            errores.password && <Error>{errores.password}</Error>
          }
          <Campo
            error={errores.password}
          >
            <label htmlFor="password">Pasword</label>
            <input 
              type="password" 
              name="password" 
              id="password"  
              value={password}
              onChange={handleChangeInputs} 
            />
          </Campo>

          <InputSubmit type="submit" value='Crear cuenta' />
          {
            error && <Error>{error}</Error>
          }
        </Formulario>

      </>
    </Layout>
  )
}
