import React, { useState, useEffect } from 'react'
import { useFirebaseContext } from './useFirebaseContext'

export const useProductos = (orden) => {
  const { firebase } = useFirebaseContext()
  const [ productosDB, setProductosDB ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    firebase.obtenerProductosFB(orden)
      .then(setProductosDB)
      .catch(console.log)
      .finally(() => setLoading(!loading))
  }, [])

  return {
    productosDB,
    loading
  }
}