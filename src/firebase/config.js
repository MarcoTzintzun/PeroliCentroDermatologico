import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBP_SdqOD3b6_0wFvelj7riG4SyL1TKAR0',
  authDomain: 'mastercarsrrz.firebaseapp.com',
  databaseURL: 'https://mastercarsrrz-default-rtdb.firebaseio.com',
  projectId: 'mastercarsrrz',
  storageBucket: 'mastercarsrrz.appspot.com',
  messagingSenderId: '265121922021',
  appId: '1:265121922021:web:4dd1bb8e5ae99bf333cd0c'
}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

// firebase utils
export const db = getFirestore(app)
export const storage = getStorage(app)

export const formsRef = collection(db, 'forms')
export const formsRef1 = collection(db, 'forms1')
export const storageRef = ref(storage)
