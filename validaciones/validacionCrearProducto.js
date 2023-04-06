export default function validarCrearProducto(valores) {

  let errores = {};

  // Validar el nombre del producto
  if(!valores.nombre) {
      errores.nombre = "El Nombre es obligatorio";
  }
  // Validar la empresa
  if(!valores.empresa) {
    errores.empresa = "La empresa es obligatorio";
  }

  // validar la url
  if(!valores.url) {
    errores.url = 'La URL del producto es obligatoria';
  } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
      errores.url = "URL mal formateada o no válida"
  }

  // Validar la empresa
  if(!valores.descripcion) {
    errores.descripcion = "Es obligatorio agregar una descripcion al producto";
  }

  return errores;
}