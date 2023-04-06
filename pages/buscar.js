import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layouts/Layout'
import { useProductos } from '../hooks/useProductos'
import DetallesProducto from '../components/DetallesProducto'

export default function Buscar() {
  const { productosDB } = useProductos('fechaCreacion')
  const [ resultadosFiltro, setResultadosFiltro ] = useState([])
  const { query: { q } } = useRouter()

  useEffect(() => {
    setResultadosFiltro([])
    const busqueda = q.toLowerCase();
    const filtro = productosDB.filter(producto => {
      return (
        producto.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(busqueda)
      )
    })
    setResultadosFiltro(filtro)
  }, [q, productosDB])
  
  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <h2>Estos son todos los productos para la búsqueda: {q}</h2>
          {
            resultadosFiltro.length ? (
              <ul className="bg-white">
              {resultadosFiltro.map(producto => (
                  <DetallesProducto
                      key={producto.id}
                      producto={producto}
                  />
                  ))}
              </ul>
            )
            :
            (
              <p>No se encontraron resultados.</p>
            )
          }
        </div>
      </div>
    </Layout>
  )
}
