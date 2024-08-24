<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="4" class="d-flex justify-center no-print">
        <v-switch
          v-model="form.isNotaDeVenta"
          :label="form.isNotaDeVenta ? 'Nota de Venta' : 'Presupuesto'"
          active-color="success"
          inactive-color="red"
          inset
        ></v-switch>
      </v-col>
    </v-row>
    <section class="page">
      <div class="inner">
        <header class="title-block">
          <Logo />
          <div class="text-center">
            <h1>{{ $globalConfig.companyName }}</h1>
            <p class="address-line">{{ $globalConfig.addressLine1 }}</p>
            <p class="address-line">{{ $globalConfig.addressLine2 }}</p>
          </div>
          <div class="title-text">

      <!-- Título dinámico -->
      <h2 class="title-text__form-title font-weight-bold">
        {{ form.isNotaDeVenta ? 'NOTA DE VENTA' : 'PRESUPUESTO' }}
      </h2>
            <label>
              <input
                class="folio"
                type="number"
                @keypress="isInteger"
                v-model="form.folio"
              />
            </label>
            <div style="padding-top: 1rem;">
              <label>Autorecepción:</label>
              <flat-pickr
                style="text-align: center;"
                id="fecha"
                ref="fecha"
                v-model="form.fecha"
                :config="{ dateFormat: 'd/m/Y', disableMobile: true }"
              />
            </div>
          </div>
        </header>
        <main class="content">
          <div class="receipt-content">
            <div class="page__row gap-1">
              <TextInput
                class="flex-grow-1"
                label="Nombre:"
                v-model.trim="form.nombre"
                id="nombre"
              />
              <TextInput
                class="flex-grow-1"
                label="Telefono:"
                v-model.trim="form.telefono"
                id="telefono"
              />
            </div>
            <div class="page__row gap-1">
              <TextInput
                class="grow-1"
                label="Domicilio:"
                v-model.trim="form.domicilio"
                id="domicilio"
              />
            </div>
            <div class="page__row grow-1">
              <TextInput
                class="grow-1"
                label="Unidad:"
                id="unidad"
                v-model.trim="form.unidad"
              />
              <TextInput
                class-block="grow-1"
                label="Modelo:"
                id="modelo"
                v-model="form.modelo"
              />
              <TextInput
                label="Kilometraje:"
                id="kilometraje"
                v-model.trim="form.kilometraje"
              />
              km
            </div>
            <div class="page__row gap-1">
              <TextInput
                class="grow-1"
                label="Placas:"
                id="placa"
                v-model.trim="form.placa"
                @input="form.placa = form.placa.toUpperCase()"
              />
              <TextInput
                class="flex-50 flex-shrink-1"
                label="Serie:"
                id="serie"
                v-model.trim="form.serie"
              />
            </div>
            <div class="page__row text-area-block">
              <h2 class="bg-grey mw-title">OBSERVACIONES</h2>
              <textarea
                class="observations"
                v-model="form.observaciones"
                ref="observaciones"
              ></textarea>
            </div>
            <div style="width: 100%;">
              <table class="table">
                <thead class="center-align">
                  <tr>
                    <th style="text-align: center; text-transform: uppercase;">Cantidad</th>
                    <th style="text-align: center; text-transform: uppercase;">Descripción de la Refacción</th>
                    <th style="text-align: center; text-transform: uppercase;">Precio</th>
                    <th style="text-align: center; text-transform: uppercase;">Importe</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Generar 15 filas vacías para el usuario -->
                  <tr v-for="(articulo, index) in form.articulos" :key="index">
                    <td style="width: 10%;">
                      <input
                        type="number"
                        v-model.number="articulo.cantidad"
                        @input="calculateImporte(articulo)"
                        min="0"
                        style="text-align: center;"
                      >
                    </td>
                    <td>
                      <input
                        type="text"
                        v-model="articulo.descripcion"
                        style="text-align: center;"
                      >
                    </td>
                    <td style="width: 10%;">
                      <input
                        type="number"
                        v-model.number="articulo.precio"
                        @input="calculateImporte(articulo)"
                        min="0"
                        step="0.5"
                        style="text-align: center;"
                      >
                    </td>
                    <td style="width: 10%;">{{ formatCurrency(articulo.importe) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Totales -->
            <div style="margin-top: 20px;">
              <table class="table small-table" style="float: right; width: 20%;">
                <tbody>
                  <tr>
                    <td class="gray-column">Subtotal:</td>
                    <td style="width: 50%;">{{ formatCurrency(form.subtotal) }}</td>
                  </tr>
                  <tr>
                    <td class="gray-column">
                      <label>
                        I.V.A:
                        <input type="checkbox" v-model="form.includeIva" @change="calculateTotals">
                      </label>
                    </td>
                    <td>{{ formatCurrency(form.iva) }}</td>
                  </tr>
                  <tr>
                    <td class="gray-column">Anticipo:</td>
                    <td style="text-align: center;">
                      <input
                        type="number"
                        v-model.number="form.anticipo"
                        @input="calculateTotals"
                        min="0"
                        step="0.5"
                        placeholder="0.00"
                        style="text-align: center;"
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="gray-column">Total:</td>
                    <td style="font-weight: bolder;">{{ formatCurrency(form.total) }}</td>
                  </tr>
                </tbody>
                <div>
              </div>
              </table>
            </div>
            <div class="page__row sign-block">
              <div class="input-block sign-wrapper">
                <p>Al firmar de conformidad acepto a mi entera satisfacción el servicio que estoy contratando de manera profesional con {{ $globalConfig.companyName }}. Así, como sus términos y condiciones.</p>
                <div class="page__row" style="margin-bottom: 0; position: relative; line-height: 2">
                <label style="display: inline-block; margin-right: 10px;">
                    <input type="checkbox" v-model="form.transferencia">
                    Transferencia
                  </label>
                  <label style="display: inline-block; margin-right: 10px;">
                    <input type="checkbox" v-model="form.efectivo" >
                    Efectivo
                  </label>
                  <label style="display: inline-block; margin-right: 10px;">
                    <input type="checkbox" v-model="form.tarjeta" >
                    Tarjeta
                  </label>
                </div>
                <div class="signature-img-block" @click="open('firma')">
                  <!--suppress HtmlRequiredAltAttribute -->
                  <img class="signature-img" :src="form.firma" />
                </div>
                <p class="text-small">Firma de Conformidad</p>
              </div>
            </div>
          </div>
          <Footer/>
        </main>
      </div>
    </section>
    <v-dialog v-model="canvasSignature" max-width="600">
      <v-card>
        <v-toolbar dark="dark" color="primary">
          <v-btn icon="icon" dark="dark" @click="canvasSignature = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Firma:</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon="icon" @click="undo">
              <v-icon>mdi-undo</v-icon>
            </v-btn>
            <v-btn icon="icon" @click="clear">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon="icon" @click="saveSignature">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line="three-line" subheader="subheader">
          <!--suppress HtmlUnknownTag -->
          <VueSignaturePad
            id="signature"
            width="100%"
            height="70vh"
            ref="signaturePad"
            :options="signatureOptions"
          />
        </v-list>
      </v-card>
    </v-dialog>
    <v-speed-dial
      class="no-print"
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      fixed="fixed"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark="dark" fab="fab">
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-cloud-upload</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab="fab"
        dark="dark"
        small="small"
        color="green save-btn"
        @click="save"
        :disabled="processing"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn fab="fab" dark="dark" small="small" color="indigo print-btn">
        <v-icon @click="print">mdi-printer</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-snackbar
      v-model="snackbar"
      :bottom="snackbarOpt.y === 'bottom'"
      :color="snackbarOpt.color"
      :left="snackbarOpt.x === 'left'"
      :multi-line="snackbarOpt.mode === 'multi-line'"
      :right="snackbarOpt.x === 'right'"
      :timeout="snackbarOpt.timeout"
      :top="snackbarOpt.y === 'top'"
      :vertical="snackbarOpt.mode === 'vertical'"
      >{{ snackbarOpt.text }}
      <v-btn dark="dark" text="text" @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import flatPickr from 'vue-flatpickr-component'
import { Spanish } from 'flatpickr/dist/l10n/es'
import 'flatpickr/dist/flatpickr.css'
import trimCanvas from 'trim-canvas'
import { getDownloadURL, ref, uploadString, deleteObject } from 'firebase/storage'
import { serverTimestamp } from 'firebase/firestore'
import { auth, storage } from '@/firebase/config'
import { initialState1 } from '@/store'
import { saveForm1, updateForm1 } from '@/services/FormService'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'
import TextInput from '@/components/TextInput'

export default {
  name: 'OrderForm',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  components: {
    TextInput,
    flatPickr,
    Footer,
    Logo
  },
  data() {
    const gauge = {
      gaugeValueClass: 'gauge-value',
      value: 35,
      gaugeOptions: {
        fontSize: 0,
        angle: 0, // The span of the gauge arc
        lineWidth: 0.44, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
          length: 0.6, // // About gauge radius
          strokeWidth: 0.04, // The thickness
          color: '#FF142C' // Fill color
        },
        limitMax: false, // If false, max value increases automatically if value > maxValue
        limitMin: false, // If true, the min value of the gauge will be fixed
        colorStart: '#FFFFFF', // Colors
        colorStop: '#FFFFFF', // just experiment with them
        strokeColor: '#FFFFFF', // to see, which ones work best for you
        generateGradient: true,
        highDpiSupport: true, // High resolution support
        // renderTicks be Optional
        renderTicks: {
          divisions: 4,
          divWidth: 3.3,
          divLength: 0.62,
          divColor: '#333333',
          subDivisions: 3,
          subLength: 0.5,
          subWidth: 0.7,
          subColor: '#666666'
        }
      },
      initialS: { ...initialState1() }
    }
    const pad = {
      carPadOptions: {
        penColor: '#ff000060',
        minWidth: '15',
        maxWidth: '15'
      }
    }
    const signature = {
      signatureOptions: {
        dotSize: 1,
        minWidth: 1,
        maxWidth: 1
      },
      canvasSignature: false,
      signatureType: null
    }
    return {
      isNotaDeVenta: true,
      articulos: Array.from({ length: 15 }, () => ({
        cantidad: 0,
        descripcion: '',
        precio: 0,
        importe: 0
      })),
      subtotal: 0,
      iva: 0,
      includeIva: false,
      anticipo: 0,
      total: 0,
      top: false,
      right: true,
      bottom: true,
      left: false,
      direction: 'top',
      redirect: false,
      fab: false,
      hover: false,
      transition: 'slide-y-reverse-transition',
      snackbar: false,
      processing: false,
      snackbarOpt: {},
      calOptions: {
        dateFormat: 'd/m/Y',
        locale: Spanish
      },
      showEditPanel: false,
      ...gauge,
      ...pad,
      ...signature
    }
  },
  watch: {
    articulos: {
      handler() {
        this.calculateTotals()
      },
      deep: true
    },
    'form.folio': function(newVal, oldVal) {
      const num = Number(newVal)
      if (num && num !== Number(oldVal)) {
        this.form.folio = String(num).padStart(6, '0')
      }
    }
  },
  filters: {
    asFolio(value) {
      return value.padStart(6, '0')
    }
  },
  computed: {
    ...mapGetters('nota', ['form', 'imagesToDelete']),
    ...mapGetters(['user']),
    selectedIcons() {
      return this.icons.filter(icon => this.form['check' + icon.key])
    }
  },
  async created() {
    window.onbeforeunload = () => 'You have unsaved changes!'
    window.onafterprint = () => {}
    window.onbeforeprint = () => {}
    if (this.id) {
      this.edit = true
      this.$store.dispatch('nota/fetchForm', this.id).then(() => {
        this.initialS = { ...this.form }
      })
    } else {
      await this.$store.dispatch('nota/getFolio')
    }
  },
  mounted() {
    this.addKeyPressEventToInputs()
  },
  async beforeDestroy() {
    await this.$store.dispatch('nota/reset')
    this.initialS = {}
  },
  destroyed() {
    window.onresize = null
    window.onbeforeunload = null
  },
  methods: {
    ...mapActions('nota', ['fetchForm', 'addImagesToDelete']),
    handleDrawPoint(lado) {
      const pad = this.$refs[`${lado}Car`]
      const ctx = pad.signaturePad._ctx

      const lastPoint = pad.signaturePad._lastPoints[0]

      ctx.beginPath()
      ctx.arc(lastPoint.x, lastPoint.y, 15, 0, 2 * Math.PI)
      ctx.fillStyle = pad.signaturePad.penColor
      ctx.fill()
    },
    async saveChanges() {
      this.showEditPanel = false
      const formToSave = {
        ...this.form,
        items: this.items,
        subtotal: this.subtotal,
        iva: this.iva,
        total: this.total,
        timestamp: serverTimestamp()
      }
      if (this.id) {
        await updateForm1(this.id, formToSave)
      } else {
        await saveForm1(formToSave)
      }
      this.showSnackBar({ text: 'Formulario guardado con éxito' })
    },
    calculateImporte(articulo) {
      articulo.importe = articulo.cantidad * articulo.precio
      this.calculateTotals()
    },
    calculateTotals() {
      this.form.subtotal = this.form.articulos.reduce((sum, articulo) => sum + articulo.importe, 0)
      this.form.iva = this.form.includeIva ? this.form.subtotal * 0.16 : 0
      this.form.total = this.form.subtotal + this.form.iva - this.form.anticipo
    },
    formatCurrency(value) {
      return value ? `$${value.toFixed(2)}` : '-'
    },
    addKeyPressEventToInputs() {
      const inputs = document.getElementsByTagName('input')
      let index = 1
      for (const x of inputs) {
        if (x.readOnly) continue
        x.tabIndex = index++
        x.onkeypress = e => {
          this._handleKeyPress(e)
        }
      }
    },
    _handleKeyPress(e) {
      if (e.keyCode === 13) {
        e.preventDefault()
        const next = e.target.tabIndex + 1
        const nextTab = document.querySelector(`[tabIndex="${next}"]`)
        if (nextTab) {
          nextTab.focus()
        }
      }
    },
    showSnackBar({
      color = 'success',
      mode = '',
      text = 'Información guardada',
      timeout = 5000,
      x = null,
      y = 'top'
    } = {}) {
      this.snackbarOpt = {
        color,
        mode,
        text,
        timeout,
        x,
        y
      }
      this.snackbar = true
    },
    onEnd(side) {
      if (Object.keys(this.$refs).length === 0) return
      const { isEmpty, data } = this.$refs[`${side}Car`].saveSignature()
      if (!isEmpty) this.form[`${side}CarImg`] = data
    },
    isPhone(event) {
      const key = event.key
      const oldValue = event.target.value
      const newValue = oldValue + key
      if (!/[\d ()-]$/.test(newValue)) return event.preventDefault()
    },
    isNumber(event) {
      const oldValue = event.target.value
      const newValue = oldValue + event.key
      if (!/^\d+\.?\d*$/.test(newValue)) return event.preventDefault()
    },
    isInteger(event) {
      const key = event.key
      if (!/\d/.test(key)) return event.preventDefault()
    },
    open(type) {
      this.signatureType = type
      this.canvasSignature = true
      this.$nextTick().then(() => this.$refs.signaturePad.resizeCanvas())
    },
    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    clear() {
      this.$refs.signaturePad.clearSignature()
    },
    changeCarImage($event) {
      const value = $event.target.value
      const carShapes = ['right', 'front', 'back', 'left']
      carShapes.forEach(
        shape => (this.form[`${shape}CarImageType`] = `${value}-${shape}`)
      )
      this.carkey = value
      this.carCanvasLock = false
    },
    async saveSignature() {
      trimCanvas(this.$refs.signaturePad.$refs.signaturePadCanvas)
      const { data } = this.$refs.signaturePad.saveSignature()
      this.clear()
      this.canvasSignature = false
      const signatures = {
        firma: 'firma'
      }
      this.form[signatures[`${this.signatureType}`]] = data
    },
    clearCarCanvas(side) {
      switch (side) {
        case 'right':
          this.$refs.rightCar.clearSignature()
          this.form.rightCarImg = null
          break
        case 'front':
          this.$refs.frontCar.clearSignature()
          this.form.frontCarImg = null
          break
        case 'back':
          this.$refs.backCar.clearSignature()
          this.form.backCarImg = null
          break
        case 'left':
          this.$refs.leftCar.clearSignature()
          this.form.leftCarImg = null
          break
      }
    },
    async uploadCarImages(id, NUM_IMAGES) {
      for (let i = 1; i <= NUM_IMAGES; i++) {
        if (this.form[`image${i}`] && 'dataURL' in this.form[`image${i}`]) {
          await this.uploadCarImage(id, i, this.form[`image${i}`])
        }
      }
    },
    async uploadCarImage(id, idImg, payload) {
      // upload images
      const imgName = `${id}-image${idImg}`
      const storageRef = ref(storage, imgName)
      await uploadString(storageRef, payload.dataURL, 'data_url')
      const url = await getDownloadURL(storageRef)
      const property = `image${idImg}`
      const obj = {
        [property]: {
          name: payload.name,
          imgURL: url
        }
      }
      await this.updateCarImageURL(id, obj)
    },
    async updateCarImageURL(id, payload) {
      try {
        await updateForm1(id, payload)
        this.snackbar = true
      } catch (err) {
        console.error(err)
      }
    },
    async deleteImage(id, image) {
      const storageRef = ref(storage, `${id}-${image}`)
      try {
        await deleteObject(storageRef)
        const payload = {
          image: null
        }
        await this.updateCarImageURL(id, payload)
      } catch (err) {
        console.error(err)
      }
    },
    async save() {
      if (this.processing) return
      this.processing = true

      const NUM_IMAGES = 4

      let obj = {
        timestamp: serverTimestamp()
      }
      if (this.edit) {
        obj = {
          ...this.form,
          ...obj
        }
        try {
          await updateForm1(this.id, obj)
          this.showSnackBar()
        } catch (err) {
          console.log(err)
          this.showSnackBar({
            color: 'red',
            text: 'Error al actualizar información'
          })
        }
        await this.uploadCarImages(this.id, NUM_IMAGES)
        this.imagesToDelete.forEach(img => {
          this.deleteImage(this.id, img)
        })
        setTimeout(() => {
          this.redirect = true
          this.$router.back()
        }, 1000)
      } else {
        console.log('Save')
        // Guardar formato
        obj = {
          uid: auth.currentUser.uid,
          active: true,
          articulos: this.articulos,
          ...this.form,
          ...obj
        }
        let id = ''
        try {
          const docRef = await saveForm1(obj)
          id = docRef.id
          await this.uploadCarImages(id, NUM_IMAGES)
          this.redirect = true
          this.showSnackBar()
          console.log('Save')
          setTimeout(() => this.$router.push('notas'), 1000)
        } catch {
          this.showSnackBar({
            color: 'red',
            text: 'Error al guardar información'
          })
        }
      }
    },
    print() {
      window.print()
    },
    checkChanges() {
      const fields = [
        'nombre',
        'domicilio',
        'fecha',
        'telefono',
        'modelo',
        'kilometraje',
        'placa',
        'serie',
        'observaciones',
        'tarjeta',
        'efectivo',
        'transferencia',
        'firma'
      ]
      return fields.some(element => this.initialS[element] !== this.form[element])
    }
  },
  async beforeRouteLeave(to, from, next) {
    if (from.name === 'nota' && to.name === 'edit-nota') {
      next()
    } else if (from.name === 'edit-nota' && to.name === 'nota') {
      await this.$store.dispatch('nota/reset')
      await this.$store.dispatch('nota/getFolio')
      this.initialS = initialState1()
      this.edit = false
      this.$refs.rightCar.clearSignature()
      this.$refs.frontCar.clearSignature()
      this.$refs.backCar.clearSignature()
      this.$refs.leftCar.clearSignature()
      next()
    } else if (this.checkChanges() && !this.redirect) {
      this.$dialog
        .confirm({
          title: '¿Estás seguro?',
          body: 'La información no guardada se perderá'
        })
        .then(() => {
          this.$store.dispatch('nota/reset')
          next()
        })
        .catch(() => {
          next(false)
        })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.table th {
  border: 1px solid #b8b8b8;
  padding: 8px;
  background-color: #ddd;
}

.bg-grey {
  background-color: #ffffff;
}

.center-align {
  text-align: center;
}

.small-table td {
  border: 1px solid #b8b8b8;
  padding: 8px;
  padding: 8px;
}
.small-table .gray-column {
  text-align: left;
  background-color: #ddd; /* Color de fondo gris para la columna específica */
  font-weight: 900;
}

.small-table{
  width: 200px;
}

input[type="number"], input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  padding: 4px;
}

.receipt-content {
  background-color: #fdfdfd; /* Color de fondo similar al papel */
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  width: "100%";
  padding: 1.2rem;
  border: 3px solid #e0e0e0; /* Bordes ligeros para el contorno */
}

.text-right {
  text-align: right;
}

.page {
  --page-width: 21.59cm;
  --page-height: 27.94cm;
  --page-inner-width: calc(100% - 7mm - 7mm);
  --page-inner-height: calc(100% - 1cm - 1cm);
  --page-inner-margin: 7mm;
  --page-inner-top: 1cm;
  --page-color: #fff;
  --margin-first-page: 2em;
  --margin-last-page: 2em;
  --input-text-color: #222;
  --light-grey: #dedede;
  --small: 0.65rem;
  page-break-inside: avoid;
  page-break-after: auto;
  position: relative;
  font-family: Poppins, sans-serif;
  font-size: 0.7rem;
  width: var(--page-width);
  min-width: var(--page-width);
  height: var(--page-height);
  min-height: var(--page-height);
  background: var(--page-color);
  margin: 0 auto var(--margin-last-page);
  box-shadow: 1px 5px 15px #707070;

  &:first-of-type {
    margin-top: var(--margin-first-page);
  }

  &:last-of-type {
    margin-bottom: var(--margin-last-page);
  }

  .inner {
    position: relative;
    width: var(--page-inner-width);
    height: var(--page-inner-height);
    margin: 0 var(--page-inner-margin);
    top: var(--page-inner-top);
  }

  input[type='text'],
  input[type='tel'],
  input[type='email'] {
    padding-inline-start: 10px;
  }

  input[type='date'] {
    -webkit-padding-start: 6%;
    width: 100px;
    text-align: center;
  }

  input[type='date']::-webkit-inner-spin-button {
    display: none;
    appearance: none;
  }

  // Change Autocomplete styles in Chrome
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
    box-shadow: 0 0 0 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  p {
    margin: 0;
  }
}

.logo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  background-color: #ffffff;
}

.logo-img {
  height: 80px;
  width: 200px; /* Ajusta el tamaño para hacer la imagen cuadrada, si es necesario */
  object-fit: cover; /* Cubre el contenedor, recortando la imagen si es necesario */
  background-color: #ffffff;
}

.date {
  font-family: 'Arial', sans-serif; /* Puedes cambiar el tipo de letra aquí */
  font-weight:600;
  font-size: 14px; /* Ajusta el tamaño de la fuente según sea necesario */
}

.text-field {
  color: var(--input-text-color);
  width: 100%;
  border: none;
  padding: 0;
  border-bottom: 1px solid #d4d4d4;
  outline: none;

  &focus {
    border-bottom: 1px solid #26a69a;
    box-shadow: 0 1px 0 0 #26a69a;
  }
}

.work-to-do {
  height: 3rem;
}

.container {

.qr-container {
    text-align: center;
    margin-top: 1rem;
}

.qr-container img {
    max-width: 100%; /* Asegura que el QR se ajuste al contenedor */
    height: 200px;
}
}
.qr-container1 {
    text-align: center;
}

.qr-container1 img {
    max-width: 100%; /* Asegura que el QR se ajuste al contenedor */
    height: 70px;
}

.observations {
  height: 3rem;
  margin-left: 1rem;
}

input[type='checkbox'],
input[type='radio'] {
  &:checked {
    background: black;
  }
  appearance: none;
  border: 1px solid #222;
  padding: 0.4em;
  margin-inline-start: 4mm;
  font-size: 0.7rem;
  outline: none;
}

::v-deep .logo {
  width: 25%;

  img {
    max-width: 90%;
  }
}

.radio {
  &:checked {
    background: black;
  }
}

.checkbox {
  &:checked {
    background: black;
  }
}

.bg-grey {
  background: var(--light-grey);
  padding: 0.3em 0;
}

.content {
  width: 100%;
}

.departure {
  padding-right: 0.45rem;
}

.select {
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  padding: 5px;
  border: 1px solid #f2f2f2;
  border-radius: 2px;
  -webkit-appearance: menulist;
}

.sign-block {
  justify-content: space-around;
}

input.five-padding-start {
  padding-inline-start: 5px;
}

.page__row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  .input-blocklast-of-type {
    margin-inline-start: 1rem;
  }
}

.input-block {
  display: flex;
  align-items: flex-end;

  label,
  span {
    white-space: nowrap;
  }

  input {
    text-align: center;
  }

  .radio {
    &:first-of-type {
      margin-inline-end: 1rem;
    }
  }
}

.title-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  p {
    font-size: 12px;
  }

  .folio {
    text-align: center;
    color: #f00;
    font-weight: 700;
    width: 100%;
    border: none;
    border-bottom: 1px solid #d4d4d4;
    outline: none;
  }

  .title-text__form-title {
    font-size: 1rem;
    font-weight: normal;
  }

  .title-text {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 25%;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;

  tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  td {
    padding: 0.2em;
    text-align: center;
  }
}

.text-area-block {
  flex-direction: column;
  justify-content: center;

  h2 {
    width: 100%;
    background: #ddd;
    text-align: center;
    font-size: 0.7rem;
    padding: 0.3em 0;
  }

  textarea {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    width: 100%;
    resize: none;
    overflow: hidden;
    line-height: 1.4;
  }
}

.signature-img-block {
  margin-inline-start: 5px;
  width: 240px;
  height: 70px;
  border-bottom: 1px solid #222;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.signature-img {
  max-height: 100%;
}

.date {
  text-align: end;
  padding: 0 0.75rem;
  font-size: small;
}

.v-centered {
  align-items: center;
}

.description {
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 0.8rem;
  resize: none;
}

.sign-wrapper {
  flex-direction: column;
  align-items: center;
}

.bottom-page {
  position: absolute;
  bottom: 90px;
  width: 100%;
}

.images-container {
  display: grid;
  grid-template-columns: 380px 1fr;
  grid-template-rows: auto repeat(4, 210px);
  justify-items: center;
  align-items: center;
  border-bottom: 1px solid lightgray;
  border-left: 1px solid lightgray;

  & .v-text-field--solo {
    border-radius: 0;
  }

  div {
    border-top: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    text-align: end;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .clear-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

@media print {
  .no-print {
    display: none !important;
  }
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  input {
    border: none;
    box-shadow: none;
    outline: none;
  }
  .page input[type='date'] {
    font-family: Roboto sans-serif;
    font-size: 11px;
  }
  .page {
    margin: 0 auto 0;
    box-shadow: none !important;

    &:first-of-type {
      margin-top: -50px !important;
    }

    &:last-of-type {
      margin-bottom: 0 !important;
    }
  }
  .title {
    padding-top: 1.2cm;
  }
  .images-container ::v-deep .v-input__append-inner,
  .images-container ::v-deep .v-text-field__details {
    display: none;
  }
  .img-container ::v-deep button {
    display: none;
  }
  .images-container .v-btn {
    display: none;
  }
  .content .range-container {
    display: none;
  }
  @page {
    margin: 0;
    padding: 0;
    size: 21.59cm 27.94cm;
  }
}
</style>
