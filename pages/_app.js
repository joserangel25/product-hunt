import firebase, { FirebaseContext, agregarProductoDB } from '../firebase'
import useAutenticacion from '../hooks/useAutenticacion'

import '../styles/globals.css'
import '../styles/Loader.css'

function MyApp({ Component, pageProps }) {
  const usuario = useAutenticacion()

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario,
        agregarProductoDB,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
