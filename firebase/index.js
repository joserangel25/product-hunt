import firebase from "./firebase";
import { collection, addDoc } from "firebase/firestore";

//Context
import FirebaseContext from "./context";

//Acciones en la base de datos
const agregarProductoDB = async (producto) => {
  return await addDoc(collection(firebase.db, 'productos'), producto)
}


export {
  FirebaseContext,
  agregarProductoDB,
}
export default firebase;