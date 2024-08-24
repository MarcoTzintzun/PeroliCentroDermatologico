import {
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc
} from 'firebase/firestore'
import { auth, db, formsRef, formsRef1 } from '@/firebase/config'

// Consulta a forms(Ordenes de Servicio)
async function getFolio () {
  const q = query(
    formsRef,
    where('uid', '==', auth.currentUser.uid),
    orderBy('timestamp', 'desc'),
    limit(1)
  )
  const querySnapshot = await getDocs(q)
  let data = {}
  if (querySnapshot.docs.length) {
    data = querySnapshot.docs[0].data()
  }

  if (+data.folio) {
    return `00000${+data.folio + 1}`.slice(-6)
  } else {
    return '000001'
  }
}

async function getForms (isActive = true) {
  const q = query(
    formsRef,
    where('active', '==', isActive),
    where('uid', '==', auth.currentUser.uid),
    orderBy('timestamp', 'desc')
  )
  return await getDocs(q)
}

async function getForm (id) {
  const formRef = doc(db, 'forms', id)
  const docSnap = await getDoc(formRef)
  return { idForm: docSnap.id, formData: docSnap.data() }
}

async function updateForm (id, data) {
  const formRef = doc(db, 'forms', id)
  return updateDoc(formRef, data)
}

function saveForm (payload) {
  return addDoc(formsRef, payload)
}

// Consulta a forms1 (Notas de venta)
async function getFolio1 () {
  const q = query(
    formsRef1,
    where('uid', '==', auth.currentUser.uid),
    orderBy('timestamp', 'desc'),
    limit(1)
  )
  const querySnapshot = await getDocs(q)
  let data = {}
  if (querySnapshot.docs.length) {
    data = querySnapshot.docs[0].data()
  }

  if (+data.folio) {
    return `00000${+data.folio + 1}`.slice(-6)
  } else {
    return '000001'
  }
}

async function getForms1 (isActive = true) {
  const q = query(
    formsRef1,
    where('active', '==', isActive),
    where('uid', '==', auth.currentUser.uid),
    orderBy('timestamp', 'desc')
  )
  return await getDocs(q)
}

async function getForm1 (id) {
  const formRef = doc(db, 'forms1', id)
  const docSnap = await getDoc(formRef)
  return { idForm: docSnap.id, formData: docSnap.data() }
}

async function updateForm1 (id, data) {
  const formRef = doc(db, 'forms1', id)
  return updateDoc(formRef, data)
}

function saveForm1 (payload) {
  return addDoc(formsRef1, payload)
}

export { getFolio, getForm, getForms, updateForm, saveForm, getFolio1, getForm1, getForms1, updateForm1, saveForm1 }
