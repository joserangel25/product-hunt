import React, { useContext } from 'react'
import { FirebaseContext } from '../firebase'

export const useFirebaseContext = () => {
  return useContext(FirebaseContext)
}