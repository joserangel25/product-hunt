import DetallesProducto from "../components/DetallesProducto";
import Layout from "../components/layouts/Layout";

import { useProductos } from "../hooks/useProductos";

export default function Populares() {

  const { productosDB } = useProductos('votos')
  
  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
              {productosDB.map(producto => (
                  <DetallesProducto
                      key={producto.id}
                      producto={producto}
                  />
              ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}