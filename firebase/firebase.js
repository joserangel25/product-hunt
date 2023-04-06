import { initializeApp } from 'firebase/app';
import {  getAuth, 
          createUserWithEmailAndPassword, 
          updateProfile, 
          signInWithEmailAndPassword, 
          signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { firebaseConfig } from './config';

//TODO: cambiar de Firestore Database a RealTime Database


class Firebase {

  constructor(){
    const firebaseApp = initializeApp(firebaseConfig)
    this.auth = getAuth()
    this.db = getFirestore(firebaseApp)
    this.storage = getStorage(firebaseApp)
  }

  //Registrar usuario
  async registrarUsuario(nombre, email, password){
    const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password)

    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre
    })
  };

  //Autenticar usuario (iniciar sesion)
  async iniciarSesion(email, password){
    return await signInWithEmailAndPassword(this.auth, email, password)
  }

  //Cerrar la sesión de un usuario
  
  async cerrarSesion(){
    await signOut(this.auth)
  }

  //Subir imagen a la Storage de Firebase
  async subirFotoAFBStorage(file){
    const storageRef = ref(this.storage, 'productos/' + file.name);

    try {
      const res = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef)
      return {
        url,
        nameImage: res.metadata.name
      }

    } catch (error) {
      console.log(error, 'error al subir la imagen al servidor')
    }
  }

  async eliminarFotoDeFBStorage(imagenName){
    // Create a reference to the file to delete
    const desertRef = ref(this.storage, `productos/${imagenName}`);

    // Delete the file
    return await deleteObject(desertRef)
  }
  
  //Obtener todos los productos que están en la base de Datos
  async obtenerProductosFB(orden){
    //Manera simple de obtener los documentos de una Colección
    // const snapshot = await getDocs(collection(this.db, 'productos'));
   
    // const productos = snapshot.docs.map(doc => {
    //   return {
    //     id: doc.id,
    //     ...doc.data()
    //   }
    // })
    // return productos

    //2da manera para incluir un orden en la petición.
    const productosRef = collection(this.db, 'productos');
    const q = query(productosRef, orderBy(orden, 'desc'));

    const querySnapshot = await getDocs(q);
    let productos = [];
    querySnapshot.forEach((doc) => {
      productos.push({
        id: doc.id,
        ...doc.data()
      })
    });
    return productos
  }

  //Obtener la información de un producto por su ID
  async obtenerProductoById(id){
    const docRef = doc(this.db, `productos/${id}`)
    const docSnap = await getDoc(docRef)
    let resultado;
    if(docSnap.exists()){
      resultado = {
        id,
        ...docSnap.data()
      }
    } else {
      resultado = { msg: 'No existe el producto con ese ID' }
    }
    return resultado
  }

  //Incrementar votos de un producto
  async votarProducto(id, votos){
    const docRef = doc(this.db, `productos/${id}`)
    await updateDoc(docRef, { votos })
  }

  //Aregar comentario a un producto
  async agregarComentario(id, comentarios){
    const docRef = doc(this.db, `productos/${id}`)
    await updateDoc(docRef, { comentarios })
  }

  //Eliminar producto de la DB
  async eliminarProducto(id){
    await deleteDoc(doc(this.db, 'productos', id)) 
  }
}

const firebase = new Firebase();
export default firebase;