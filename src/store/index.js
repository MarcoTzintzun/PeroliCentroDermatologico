import Vue from 'vue'
import Vuex from 'vuex'

import { getForm, getForm1 } from '@/services/FormService'
import { collection, getDocs } from 'firebase/firestore'
import { db, auth } from '@/firebase/config'

Vue.use(Vuex)

// Autenticacion
auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('SET_LOGGED_IN', user)
    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified
    }
    store.commit('SET_CURRENT_USER', userData)
  }
})
// Formato de fecha
const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}
export const formatDate1 = (date = new Date()) => {
  const day = `0${date.getDate()}`.slice(-2)
  const month = date.getMonth()
  const year = date.getFullYear()

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  return `${day} de ${months[month]} del ${year}`
}
// Estado inicial de la Orden de Servicio
export const initialState = () => ({
  active: true,
  airbag: false,
  antena: false,
  backCarImageType: null,
  backCarImg: null,
  battery: false,
  brand: null,
  belt: false,
  cables: false,
  cartype: 'sedan',
  clauseCity: null,
  color: null,
  crane: null,
  delivery: null,
  departure: null,
  description1: null,
  description2: null,
  description3: null,
  description4: null,
  email: null,
  emblemas: false,
  encendedor: false,
  entry: formatDate(new Date()),
  extinguidor: false,
  folio: null,
  formattedDate: formatDate1(),
  frontCarImageType: null,
  frontCarImg: null,
  fuel: null,
  gato: false,
  handbrake: false,
  herramientas: false,
  hasInsurance: null,
  image1: null,
  image2: null,
  image3: null,
  image4: null,
  leftCarImageType: null,
  leftCarImg: null,
  lights: false,
  llantaRef: false,
  mileage: null,
  model: null,
  name: null,
  observations: null,
  oil: false,
  phone: null,
  plate: null,
  policyCompany: null,
  policyNumber: null,
  rfc: null,
  rightCarImageType: null,
  rightCarImg: null,
  serialNum: null,
  signatureClient: null,
  signatureCompany: null,
  sparePartsDelivery: null,
  stability: null,
  status: 'Recibido',
  stereo: false,
  tapetes: false,
  tapones: false,
  temperature: false,
  triangulos: false,
  workToDo: null,
  checkairbag: true,
  // ChekinPreterminadis
  checkengine: true,
  checkabs: true,
  checkoil: true,
  checkbattery: true,
  checkbelt: true,
  checkhandbrake: true,
  checklights: true,
  checkstability: true,
  checktemperature: true
})
// Estado inicial de la Nota de Venta
export const initialState1 = () => ({
  folio: null,
  fecha: formatDate(new Date()),
  nombre: null,
  telefono: null,
  correo: null,
  domicilio: null,
  unidad: null,
  modelo: null,
  kilometraje: null,
  placa: null,
  serie: null,
  observaciones: null,
  iva: false,
  tarjeta: false,
  efectivo: false,
  transferencia: false,
  firma: null,
  articulos: Array.from({ length: 15 }, () => ({
    cantidad: null,
    descripcion: '',
    precio: null,
    importe: null
  })),
  subtotal: 0,
  includeIva: false,
  anticipo: null,
  total: 0
})
// Maneja la logica del formulario
const ordenModule = {
  namespaced: true,
  state: () => ({
    info: initialState(),
    imagesToDelete: []
  }),

  getters: {
    form(state) {
      return state.info
    },
    imagesToDelete(state) {
      return state.imagesToDelete
    }
  },
  mutations: {
    SET_FORM(state, form) {
      state.info = form
    },
    RESET_FORM_STATE(state) {
      const newState = initialState()
      state.info = {}
      Object.keys(newState).forEach(key => {
        Vue.set(state.info, key, newState[key])
      })
      Vue.set(state, 'imagesToDelete', [])
    },
    SET_IMG(state, payload) {
      state.info[`image${payload.img}`] = payload.data
    },
    DEL_IMG(state, id) {
      state.info[`image${id}`] = null
    },
    PUSH_TO_DELETE(state, img) {
      if (!state.imagesToDelete.includes(img)) {
        state.imagesToDelete.push(img)
      }
    },
    SET_NEW_FOLIO(state, payload) {
      state.info.folio = payload || 1
    },
    SET_DATE(state, payload) {
      state.info.entry = payload
    }
  },
  actions: {
    reset({ commit }) {
      commit('RESET_FORM_STATE')
    },
    async getFolio({ commit }) {
      try {
        const formsCollectionRef = collection(db, 'forms')
        const querySnapshot = await getDocs(formsCollectionRef)
        // El nuevo número de folio es el conteo de documentos + 1
        const nextFolio = querySnapshot.size + 1
        commit('SET_NEW_FOLIO', nextFolio)
      } catch (error) {
        console.error('Error al obtener el número de folio:', error)
      }
    },
    async getDate({ commit }) {
      const date = new Date()
      const formattedDate = new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)
      commit('SET_DATE', formattedDate)
    },
    async fetchForm({ _, commit }, id) {
      const { idForm, formData } = await getForm(id)
      formData.id = idForm
      if (!('cartype' in formData)) {
        formData.cartype = 'sedan'
      }
      if (!('rightCarImageType' in formData)) {
        formData.rightCarImageType = 'sedan-right'
      }
      if (!('frontCarImageType' in formData)) {
        formData.frontCarImageType = 'sedan-front'
      }
      if (!('backCarImageType' in formData)) {
        formData.backCarImageType = 'sedan-back'
      }
      if (!('leftCarImageType' in formData)) {
        formData.leftCarImageType = 'sedan-left'
      }
      commit('SET_FORM', formData)
    },
    changeImage({ commit }, image) {
      commit('SET_IMG', image)
    },
    deleteImage({ commit }, image) {
      commit('DEL_IMG', image)
    },
    addImagesToDelete({ commit }, imageName) {
      commit('PUSH_TO_DELETE', imageName)
    }
  }
}

const notaModule = {
  namespaced: true,
  state: () => ({
    info: initialState1(),
    imagesToDelete: []
  }),

  getters: {
    form(state) {
      return state.info
    },
    imagesToDelete(state) {
      return state.imagesToDelete
    }
  },
  mutations: {
    SET_FORM(state, form) {
      state.info = form
    },
    RESET_FORM_STATE(state) {
      const newState = initialState1()
      state.info = {}
      Object.keys(newState).forEach(key => {
        Vue.set(state.info, key, newState[key])
      })
      Vue.set(state, 'imagesToDelete', [])
    },
    SET_IMG(state, payload) {
      state.info[`image${payload.img}`] = payload.data
    },
    DEL_IMG(state, id) {
      state.info[`image${id}`] = null
    },
    PUSH_TO_DELETE(state, img) {
      if (!state.imagesToDelete.includes(img)) {
        state.imagesToDelete.push(img)
      }
    },
    SET_NEW_FOLIO(state, payload) {
      state.info.folio = payload || 1
    },
    SET_DATE(state, payload) {
      state.info.entry = payload
    }
  },
  actions: {
    reset({ commit }) {
      commit('RESET_FORM_STATE')
    },
    async getFolio({ commit }) {
      try {
        const formsCollectionRef = collection(db, 'forms1')
        const querySnapshot = await getDocs(formsCollectionRef)
        // El nuevo número de folio es el conteo de documentos + 1
        const nextFolio = querySnapshot.size + 1
        commit('SET_NEW_FOLIO', nextFolio)
      } catch (error) {
        console.error('Error al obtener el número de folio:', error)
      }
    },
    async getDate({ commit }) {
      const date = new Date()
      const formattedDate = new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)
      commit('SET_DATE', formattedDate)
    },
    async fetchForm({ _, commit }, id) {
      const { idForm, formData } = await getForm1(id)
      formData.id = idForm
      commit('SET_FORM', formData)
    },
    changeImage({ commit }, image) {
      commit('SET_IMG', image)
    },
    deleteImage({ commit }, image) {
      commit('DEL_IMG', image)
    },
    addImagesToDelete({ commit }, imageName) {
      commit('PUSH_TO_DELETE', imageName)
    }
  }
}

// Principal
const store = new Vuex.Store({
  state: {
    currentUser: null,
    logged: null
  },
  getters: {
    user(state) {
      return state.currentUser
    }
  },
  mutations: {
    SET_LOGGED_IN(state, val) {
      state.loggedIn = val
    },
    SET_CURRENT_USER(state, val) {
      state.currentUser = val
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null)
      if (user) {
        commit('SET_CURRENT_USER', {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        })
      } else {
        commit('SET_CURRENT_USER', null)
      }
    },
    setUser({ commit }, user) {
      commit('SET_CURRENT_USER', user)
    },
    clearDataUser({ commit }) {
      commit('SET_CURRENT_USER', null)
    }
  },
  modules: {
    orden: ordenModule,
    nota: notaModule
  }
})

export default store
