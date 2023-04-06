import React, { useState, useEffect } from 'react'

export const useValidacion = (initialState, validar, fn) => {

  const [ valoresInputs, setValoresInputs ] = useState(initialState);
  const [ errores, setErrores ] = useState({});
  const [ submitForm, setSubmitForm ]= useState(false);

  useEffect(() => {
   if(submitForm){
    const noErrores = Object.keys(errores).length === 0;

    if(noErrores){
      fn() //funcion que se ejecuta
    }
    setSubmitForm(false)
   }
  }, [errores]) 

  const handleChangeInputs = (e) => {
    setValoresInputs({
      ...valoresInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const erroresValidacion = validar(valoresInputs)
    setErrores(erroresValidacion)
    setSubmitForm(true)
  }

  return {
    valoresInputs,
    errores,
    handleSubmit,
    handleChangeInputs
  }
  
}