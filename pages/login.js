import React, { useState } from "react";
import Router from "next/router";
import { css } from '@emotion/react' 
import Layout from "../components/layouts/Layout";
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario";

//Firebase
import firebase from "../firebase";

import { useValidacion } from "../hooks/useValidacion";
import validarIniciarSesion from "../validaciones/validarIniciarSesion";

export default function Login() {

  const [ error, setError ] = useState('')

  const INITIAL_STATE = {
    email: '',
    password: ''
  };

  const iniciarSesion = async () => {
    try {
      const user = await firebase.iniciarSesion(email, password)
      console.log(user)
      Router.push('/')
    } catch (error) {
      console.log('hubo un error al iniciar sesión', error.message) 
      setError(error.message)
    }
  }

  const { valoresInputs, 
          errores,
          handleChangeInputs,
          handleSubmit } = useValidacion(INITIAL_STATE, validarIniciarSesion, iniciarSesion);

  const { email, password } = valoresInputs;
  
  return (
    <Layout>
      <>
        <h1 css={css`
          text-align: center;
          margin-top: 5rem;
        `}>Iniciar sesión
        </h1>
        
        <Formulario
          onSubmit={handleSubmit}
        >
          
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

          <InputSubmit type="submit" value='Iniciar sesión' />
          {
            error && <Error>{error}</Error>
          }
        </Formulario>

      </>
    </Layout>
  )
}
