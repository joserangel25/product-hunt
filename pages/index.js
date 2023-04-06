import DetallesProducto from "../components/DetallesProducto";
import Layout from "../components/layouts/Layout";
import Loader from "../components/ui/Loader";

import { useProductos } from "../hooks/useProductos";

export default function Home() {

  const { productosDB, loading } = useProductos('fechaCreacion')
  
  return (
    <Layout>

          {
            loading ?  <Loader />

            :
            (
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
            )
          }
      
    </Layout>
  )
}
