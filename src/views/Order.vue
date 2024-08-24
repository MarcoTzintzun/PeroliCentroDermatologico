<template>
  <div>
    <!-- page-1-->
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
            <h2 class="title-text__form-title font-weight-bold">ORDEN DE SERVICIO</h2>
            <label>
              <input
                class="folio"
                inputmode="numeric"
                @keypress="isInteger"
                type="text"
                v-model="form.folio"
              />
            </label>
          </div>

        </header>
        <main class="content">
          <div class="input-block justify-end -mt-4 mb-1 ml-">
            <p class="w-1/2 text-center" style="line-height: 1;">
              DATOS DEL CLIENTE
            </p>
          </div>
          <div class="page__row gap-1">
            <TextInput
              class="flex-grow-1"
              label="Marca:"
              v-model.trim="form.brand"
              id="brand"
            />
            <div class="input-block flex-grow-1">
              <label>Ingreso:</label>
              <flat-pickr
                class="text-field"
                id="entry"
                ref="ingreso"
                v-model="form.entry"
                :config="{ dateFormat: 'd/m/Y', disableMobile: true }"
              />
            </div>
          </div>
          <div class="page__row gap-1">
            <TextInput
              class-block="grow-1"
              label="Modelo:"
              id="model"
              v-model="form.model"
            />
            <TextInput class="grow-1" label="Color:" id="color" v-model="form.color" />
            <div class="input-block flex-50">
              <label class="departure">Salida:</label>
              <flat-pickr
                class="text-field"
                id="entry"
                ref="salida"
                v-model="form.departure"
                :config="{ dateFormat: 'd/m/Y', disableMobile: true }"
              />
            </div>
          </div>
          <div class="page__row gap-1">
            <TextInput
              class="grow-1"
              label="Kilometraje:"
              id="mileage"
              v-model.trim="form.mileage"
              text="Hola"
            />
            km
            <TextInput
              class="grow-1"
              label="Placas:"
              id="plate"
              v-model.trim="form.plate"
              @input="form.plate = form.plate.toUpperCase()"
            />
            <TextInput
              class="flex-50"
              label="Nombre:"
              id="name"
              v-model.trim="form.name"
            />
          </div>
          <div class="page__row gap-1">
            <TextInput
              class="flex-50 flex-shrink-1"
              label="Número de serie:"
              id="serial"
              v-model.trim="form.serial"
            />
            <TextInput
              class="flex-10 flex-shrink-1"
              label="Año:"
              id="serial"
              v-model.trim="form.year"
            />
            <TextInput
              class="flex-50"
              label="Teléfono"
              id="phone"
              v-model.trim="form.phone"
            />
          </div>
          <div class="page__row">
            <div class="input-block w-1/2">
              <span>Ingreso en grua:</span>
              <div class="d-flex mx-auto">
                <div class="radio">
                  <label for="gruaY">Sí</label>
                  <input
                    class="radio"
                    type="radio"
                    name="grua"
                    value="si"
                    ref="gruaY"
                    v-model="form.crane"
                    id="gruaY"
                  />
                </div>
                <div class="radio">
                  <label for="gruaN">No</label>
                  <input
                    class="radio"
                    type="radio"
                    name="grua"
                    value="no"
                    ref="gruaN"
                    v-model="form.crane"
                    id="gruaN"
                  />
                </div>
              </div>
            </div>
            <TextInput
              class-block="w-1/2"
              class-input="w-80"
              label="Email:"
              id="email"
              v-model.trim="form.email"
            />
          </div>
          <div class="page__row text-area-block">
            <h2>TRABAJO A REALIZAR</h2>
            <textarea class="work-to-do" v-model="form.workToDo" ref="trabajo"></textarea>
          </div>
          <div class="page__row text-area-block">
            <h2 class="mw-title">OBSERVACIONES</h2>
            <textarea
              class="observations"
              v-model="form.observations"
              ref="observaciones"
            ></textarea>
          </div>
          <div class='page__row lights-block'>
            <!-- Panel emergente -->
            <v-dialog v-model='showEditPanel' max-width='500px'>
              <v-card>
                <v-card-title>
                  <span class='headline'>Editar Opciones</span>
                </v-card-title>
                <v-card-subtitle>
                  <v-row>
                    <v-col
                      v-for='(icon, index) in icons'
                      :key='index'
                      class='d-flex flex-column align-center'
                      cols='2'
                    >
                      <div :class="icon.class" class='icon-image'></div>
                      <v-checkbox
                        v-model="form['check' + icon.key]"
                      />
                   </v-col>
                  </v-row>
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click='showEditPanel = false'>Cancelar</v-btn>
                  <v-btn color='primary' @click='saveChanges'>Aceptar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div class="page__row lights-block">
            <button class='no-print' @click="showEditPanel = !showEditPanel">
              <v-icon>mdi-pencil</v-icon>
            </button>
            <div v-for="(icon, index) in selectedIcons" :key="index">
            <input
              :class="[
                'icon',
                icon.class,
                { 'icon-on': form[icon.key] }
              ]"
              type="checkbox"
              v-model="form[icon.key]"
            />
          </div>
          </div>
          <div class="page__row" style="margin-bottom: 0;">
            <div class="w-70">
              <table class="table">
                <thead class="center-align">
                  <tr>
                    <th class="bg-grey mw-title" colspan="4">INVENTARIO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gato</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.gato" />
                    </td>
                    <td>Antena</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.antena" />
                    </td>
                  </tr>
                  <tr>
                    <td>Herramientas</td>
                    <td>
                      <input
                        class="checkbox"
                        type="checkbox"
                        v-model="form.herramientas"
                      />
                    </td>
                    <td>Emblemas</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.emblemas" />
                    </td>
                  </tr>
                  <tr>
                    <td>Triángulos</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.triangulos" />
                    </td>
                    <td>Tapones de rueda</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.tapones" />
                    </td>
                  </tr>
                  <tr>
                    <td>Tapetes</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.tapetes" />
                    </td>
                    <td>Cables</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.cables" />
                    </td>
                  </tr>
                  <tr>
                    <td>Llanta refacción</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.llantaRef" />
                    </td>
                    <td>Estéreo</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.stereo" />
                    </td>
                  </tr>
                  <tr>
                    <td>Extintor</td>
                    <td>
                      <input
                        class="checkbox"
                        type="checkbox"
                        v-model="form.extinguidor"
                      />
                    </td>
                    <td>Encendedor</td>
                    <td>
                      <input class="checkbox" type="checkbox" v-model="form.encendedor" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="fuel-gauge">
              <v-gauge
                :options="gaugeOptions"
                height="75"
                width="125"
                :minValue="0"
                :gaugeValueClass="gaugeValueClass"
                :value="form.fuel"
                :maxValue="100"
              ></v-gauge>
              <div class="empty-fuel">E</div>
              <div class="full-fuel">F</div>
              <div class="range-container">
                <v-slider
                  v-model="form.fuel"
                  step="1"
                  color="red"
                  track-color="rgba(0, 0, 0, 0.25)"
                ></v-slider>
              </div>
            </div>
          </div>
          <div
            class="page__row"
            style="margin-bottom: 0; position: relative; line-height: 2"
          >
            <div class="text-center font-weight-bold flex-grow-1">
              <span>Daños preexistentes del vehículo</span>
            </div>
            <div
              class="w-12 no-print d-flex"
              style="position: absolute; right: 0; top: 0;"
            >
              <v-icon
                style="font-size: 1.25rem; color: red;"
                v-if="carCanvasLock"
                @click="handleCarCanvasLock"
                >mdi-lock
              </v-icon>
              <v-icon style="font-size: 1.25rem; color:green;" v-else @click="handleCarCanvasLock"
                >mdi-lock-open
              </v-icon>
              <select
                class="select"
                style="font-size: 0.55rem;"
                id="cartype"
                name="cartype"
                v-model="form.cartype"
                @change="changeCarImage"
              >
                <option value="sedan">SEDAN</option>
                <option value="pickup">PICKUP</option>
                <option value="suv">SUV</option>
              </select>
            </div>
          </div>
          <div class="page__row car-title">
            <span class="car-title__item" @click="clearCarCanvas('right', $event)">
              Lado derecho
            </span>
            <span class="car-title__item" @click="clearCarCanvas('front', $event)">
              Frente
            </span>
            <span class="car-title__item" @click="clearCarCanvas('back', $event)">
              Detrás
            </span>
            <span class="car-title__item" @click="clearCarCanvas('left', $event)">
              Lado izquierdo
            </span>
          </div>
          <div class="page__row">
            <div :class="['car', `${form.cartype}-right`]">
              <VueSignaturePad
                :key="carkey"
                ref="rightCar"
                :options="{ ...carPadOptions, onEnd: () => handleDrawPoint('right') }"
                height="125px"
              />
            </div>
            <div :class="['car', `${form.cartype}-front`]">
              <VueSignaturePad
                :key="carkey"
                ref="frontCar"
                :options="{ ...carPadOptions, onEnd: () => handleDrawPoint('front') }"
                height="125px"
              />
            </div>
            <div :class="['car', `${form.cartype}-back`]">
              <VueSignaturePad
                :key="carkey"
                ref="backCar"
                :options="{ ...carPadOptions, onEnd: () => handleDrawPoint('back') }"
                height="125px"
              />
            </div>
            <div :class="['car', `${form.cartype}-left`]">
              <VueSignaturePad
                :key="carkey"
                ref="leftCar"
                :options="{ ...carPadOptions, onEnd: () => handleDrawPoint('left') }"
                height="125px"
              />
            </div>
          </div>
          <div class="page__row sign-block">
            <div class="input-block sign-wrapper">
              <div class="signature-img-block" @click="open('client')">
                <!--suppress HtmlRequiredAltAttribute -->
                <img class="signature-img" :src="form.signatureClient" />
              </div>
              <p contenteditable="true">{{ form.name }}</p>
            </div>
            <div class="input-block sign-wrapper">
              <div class="signature-img-block" @click="open('company')">
                <!--suppress HtmlRequiredAltAttribute -->
                <img class="signature-img" :src="form.signatureCompany" />
              </div>
              <p class="text-small">{{ $globalConfig.companyName }}</p>
            </div>
          </div>
          <div class="qr-container1">
            <a :href="$globalConfig.qrReference" target="_blank" rel="noopener noreferrer">
              <img :src="$globalConfig.qrImage" alt="QR Code">
            </a>
          </div>
        </main>
        <!-- <Footer/> -->
      </div>
    </section>
    <!-- page2-->
    <section class="page pt-7">
      <div class="inner">
        <header class="text-center">
          <h3>ESTADO DEL VEHÍCULO</h3>
        </header>
        <main class="content">
          <div class="images-container">
            <div class="bg-grey">Imagen</div>
            <div class="bg-grey">Descripción</div>
            <ImagePreview
              :image="form.image1"
              img="1"
              v-on:update:image="form.image1 = $event.data"
              v-on:delete:image="form.image1 = null"
              v-on:add-image-to-delete="addImagesToDelete('image1')"
            />
            <div class="description-block">
              <textarea
                class="description"
                cols="30"
                rows="10"
                v-model="form.description1"
              ></textarea>
            </div>
            <ImagePreview
              :image="form.image2"
              img="2"
              v-on:update:image="form.image2 = $event.data"
              v-on:delete:image="form.image2 = null"
              v-on:add-image-to-delete="addImagesToDelete('image2')"
            />
            <div class="description-block">
              <textarea
                class="description"
                cols="30"
                rows="10"
                v-model="form.description2"
              ></textarea>
            </div>
            <ImagePreview
              :image="form.image3"
              img="3"
              v-on:update:image="form.image3 = $event.data"
              v-on:delete:image="form.image3 = null"
              v-on:add-image-to-delete="addImagesToDelete('image3')"
            />
            <div class="description-block">
              <textarea
                class="description"
                cols="30"
                rows="10"
                v-model="form.description3"
              ></textarea>
            </div>
            <ImagePreview
              :image="form.image4"
              img="4"
              v-on:update:image="form.image4 = $event.data"
              v-on:delete:image="form.image4 = null"
              v-on:add-image-to-delete="addImagesToDelete('image4')"
            />
            <div class="description-block">
              <textarea
                class="description"
                cols="30"
                rows="10"
                v-model="form.description4"
              ></textarea>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </section>
    <!-- Pagina3-->
    <section class="page page3">
      <div class="inner">
        <div class="logo-container">
          <img src="../assets/logo.png" alt="logo" class="logo-img" />
          <div class="date">{{ form.formattedDate }}</div>
        </div>
        <div class="container">
          <h1>Términos y Condiciones</h1>
          <p>Gracias por confiar en {{ $globalConfig.companyName }}. Al utilizar nuestros servicios de restauración, modificación y mecánica automotriz, acepta los siguientes términos y condiciones. Por favor, léalos con atención.</p>

          <h2>1. Servicios de Restauración y Mecánica Automotriz</h2>
          <p>Ofrecemos una variedad de servicios de restauración, mecánica y modificación de vehículos bajo los más altos estándares de calidad. Los detalles específicos de los servicios pueden variar según la disponibilidad y el estado del vehículo.</p>

          <h2>2. Política de Programación y Cancelación de Servicios</h2>
          <p>Todos los servicios deben ser programados con anticipación. Las cancelaciones que se realicen con menos de 24 horas de aviso podrían estar sujetas a cargos adicionales.</p>

          <h2>3. Precios, Métodos de Pago y Condiciones</h2>
          <p>El pago se efectuará al finalizar el servicio. Aceptamos pagos en efectivo, tarjetas de crédito y débito. Los precios están sujetos a cambios sin previo aviso.</p>

          <h2>4. Garantía de Calidad y Exención de Responsabilidad</h2>
          <p>Nos esforzamos por entregar servicios de alta calidad. Sin embargo, no nos hacemos responsables por daños indirectos o incidentales que puedan surgir durante o después del servicio. El cliente debe proporcionar información precisa sobre su vehículo.</p>

          <h2>5. Nuestros Valores y Compromiso con la Excelencia</h2>
          <p>Nuestro trabajo está guiado por los valores fundamentales de calidad, responsabilidad, respeto, pasión y honestidad. Estos principios aseguran un servicio excepcional y la satisfacción de nuestros clientes.</p>
          <div class="qr-container">
            <p>Visita nuestras redes:</p>
            <a :href="$globalConfig.qrReference" target="_blank" rel="noopener noreferrer">
              <img :src="$globalConfig.qrImage" alt="QR Code">
            </a>
          </div>
        </div>
        <article class="content">
          <div class="page__row sign-block">
            <div class="input-block sign-wrapper">
              <div class="signature-img-block" @click="open('company')">
                <img class="signature-img" :src="form.signatureCompany" />
              </div>
              <p contenteditable="true">EL PRESTADOR DEL SERVICIO</p>
            </div>
            <div class="input-block sign-wrapper">
              <div class="signature-img-block" @click="open('client')">
                <img class="signature-img" :src="form.signatureClient" />
              </div>
              <p>EL CONSUMIDOR</p>
            </div>
          </div>
        </article>
        <Footer />
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
import VGauge from 'vgauge'
import flatPickr from 'vue-flatpickr-component'
import { Spanish } from 'flatpickr/dist/l10n/es'
import 'flatpickr/dist/flatpickr.css'
import trimCanvas from 'trim-canvas'
import { getDownloadURL, ref, uploadString, deleteObject } from 'firebase/storage'
import { serverTimestamp } from 'firebase/firestore'
import { auth, storage } from '@/firebase/config'
import { initialState } from '@/store'
import { saveForm, updateForm } from '@/services/FormService'
import ImagePreview from '@/components/ImagePreview'
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
    VGauge,
    Footer,
    ImagePreview,
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
      initialS: { ...initialState() }
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
      title: 'Máster Cars RRZ ',
      companyName: 'Máster Cars RRZ ',
      carkey: 'sedan',
      carCanvasLock: true,
      dialog: false,
      date: null,
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
      airbag: false,
      engine: false,
      abs: false,
      oil: false,
      battery: false,
      belt: false,
      handbrake: false,
      lights: false,
      stability: false,
      temperature: false,
      checkairbag: false,
      checkengine: false,
      checkabs: false,
      checkoil: false,
      checkbattery: false,
      checkbelt: false,
      checkhandbrake: false,
      checklights: false,
      checkstability: false,
      checktemperature: false,
      checkbrakepad: false,
      checkbulb: false,
      checkeml: false,
      checkfl: false,
      checkltp: false,
      checknbrakepad: false,
      checkndiesel: false,
      checknexteriorlight: false,
      checknfault: false,
      checknfront: false,
      checknhill: false,
      checknpower: false,
      checknpress: false,
      checknservice: false,
      checknsidelight: false,
      checknsteering: false,
      checknwater: false,
      checkparking: false,
      icons: [
        { key: 'airbag', class: 'icon-airbag' },
        { key: 'engine', class: 'icon-engine' },
        { key: 'abs', class: 'icon-abs' },
        { key: 'oil', class: 'icon-oil' },
        { key: 'battery', class: 'icon-battery' },
        { key: 'belt', class: 'icon-cinturon' },
        { key: 'handbrake', class: 'icon-frenodemano' },
        { key: 'lights', class: 'icon-lights' },
        { key: 'stability', class: 'icon-stability' },
        { key: 'temperature', class: 'icon-temperature' },
        { key: 'brakepad', class: 'icon-brakepad' },
        { key: 'bulb', class: 'icon-bulb' },
        { key: 'eml', class: 'icon-eml' },
        { key: 'fl', class: 'icon-fl' },
        { key: 'ltp', class: 'icon-ltp' },
        { key: 'nbrakepad', class: 'icon-nbrakepad' },
        { key: 'ndiesel', class: 'icon-ndiesel' },
        { key: 'nexteriorlight', class: 'icon-nexteriorlight' },
        { key: 'nfault', class: 'icon-nfault' },
        { key: 'nfront', class: 'icon-nfront' },
        { key: 'nhill', class: 'icon-nhill' },
        { key: 'npower', class: 'icon-npower' },
        { key: 'npress', class: 'icon-npress' },
        { key: 'nservice', class: 'icon-nservice' },
        { key: 'nsidelight', class: 'icon-nsidelight' },
        { key: 'nsteering', class: 'icon-nsteering' },
        { key: 'nwater', class: 'icon-nwater' },
        { key: 'parking', class: 'icon-parking' }
      ],
      ...gauge,
      ...pad,
      ...signature
    }
  },
  watch: {
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
    ...mapGetters('orden', ['form', 'imagesToDelete']),
    ...mapGetters(['user']),
    selectedIcons() {
      return this.icons.filter(icon => this.form['check' + icon.key])
    }
  },
  async created() {
    window.onbeforeunload = () => 'You have unsaved changes!'
    window.onresize = () => {
      if (this.form.rightCarImg) {
        this.$refs.rightCar.fromDataURL(this.form.rightCarImg, {
          width: 186,
          height: 125
        })
      }
      if (this.form.frontCarImg) {
        this.$refs.frontCar.fromDataURL(this.form.frontCarImg, {
          width: 186,
          height: 125
        })
      }
      if (this.form.backCarImg) {
        this.$refs.backCar.fromDataURL(this.form.backCarImg, {
          width: 186,
          height: 125
        })
      }
      if (this.form.leftCarImg) {
        this.$refs.leftCar.fromDataURL(this.form.leftCarImg, {
          width: 186,
          height: 125
        })
      }
    }
    window.onafterprint = () => {}
    window.onbeforeprint = () => {}
    if (this.id) {
      this.edit = true
      this.$store.dispatch('orden/fetchForm', this.id).then(() => {
        if ('rightCarImg' in this.form) {
          this.$refs.rightCar.fromDataURL(this.form.rightCarImg, {
            width: 186,
            height: 125
          })
        }
        if ('frontCarImg' in this.form) {
          this.$refs.frontCar.fromDataURL(this.form.frontCarImg)
        }
        if ('backCarImg' in this.form) {
          this.$refs.backCar.fromDataURL(this.form.backCarImg)
        }
        if ('leftCarImg' in this.form) {
          this.$refs.leftCar.fromDataURL(this.form.leftCarImg)
        }
        this.initialS = { ...this.form }
      })
    } else {
      await this.$store.dispatch('orden/getFolio')
    }
  },
  mounted() {
    this.lockCarSignature()
    this.addKeyPressEventToInputs()
  },
  async beforeDestroy() {
    await this.$store.dispatch('orden/reset')
    this.initialS = {}
  },
  destroyed() {
    window.onresize = null
    window.onbeforeunload = null
  },
  methods: {
    ...mapActions('orden', ['fetchForm', 'addImagesToDelete']),
    handleDrawPoint(lado) {
      const pad = this.$refs[`${lado}Car`]
      const ctx = pad.signaturePad._ctx

      const lastPoint = pad.signaturePad._lastPoints[0]

      ctx.beginPath()
      ctx.arc(lastPoint.x, lastPoint.y, 15, 0, 2 * Math.PI)
      ctx.fillStyle = pad.signaturePad.penColor
      ctx.fill()
    },
    saveChanges() {
      this.showEditPanel = false
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
    handleCarCanvasLock() {
      if (this.carCanvasLock === true) {
        this.unlockCarSignature()
      } else {
        this.lockCarSignature()
      }
    },
    lockCarSignature() {
      this.carCanvasLock = true
      this.$refs.rightCar.lockSignaturePad()
      this.$refs.frontCar.lockSignaturePad()
      this.$refs.backCar.lockSignaturePad()
      this.$refs.leftCar.lockSignaturePad()
    },
    unlockCarSignature() {
      this.carCanvasLock = false
      this.$refs.rightCar.openSignaturePad()
      this.$refs.frontCar.openSignaturePad()
      this.$refs.backCar.openSignaturePad()
      this.$refs.leftCar.openSignaturePad()
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
        company: 'signatureCompany',
        client: 'signatureClient'
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
        await updateForm(id, payload)
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
      console.log('Save')
      if (this.processing) return
      console.log('Paso Save')
      this.processing = true
      this.lockCarSignature()
      console.log('Paso Save')

      const dataCarRight = this.$refs.rightCar.saveSignature()
      const dataCarFront = this.$refs.frontCar.saveSignature()
      const dataCarBack = this.$refs.backCar.saveSignature()
      const dataCarLeft = this.$refs.leftCar.saveSignature()

      const NUM_IMAGES = 4

      let obj = {
        timestamp: serverTimestamp()
      }
      if (!dataCarRight.isEmpty) {
        obj.rightCarImg = dataCarRight.data
      }
      if (!dataCarFront.isEmpty) {
        obj.frontCarImg = dataCarFront.data
      }
      if (!dataCarBack.isEmpty) {
        obj.backCarImg = dataCarBack.data
      }
      if (!dataCarLeft.isEmpty) {
        obj.leftCarImg = dataCarLeft.data
      }
      if (this.edit) {
        obj = {
          ...this.form,
          ...obj
        }
        try {
          await updateForm(this.id, obj)
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
          ...this.form,
          ...obj
        }
        let id = ''
        try {
          const docRef = await saveForm(obj)
          id = docRef.id
          await this.uploadCarImages(id, NUM_IMAGES)
          this.redirect = true
          this.showSnackBar()
          console.log('Save')
          setTimeout(() => this.$router.push('ordenes'), 1000)
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
        'name',
        'model',
        'color',
        'mileage',
        'plate',
        'entry',
        'departure',
        'phone'
      ]
      return fields.some(element => this.initialS[element] !== this.form[element])
    }
  },
  async beforeRouteLeave(to, from, next) {
    if (from.name === 'order' && to.name === 'edit-order') {
      next()
    } else if (from.name === 'edit-order' && to.name === 'order') {
      await this.$store.dispatch('orden/reset')
      await this.$store.dispatch('orden/getFolio')
      this.initialS = initialState()
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
          this.$store.dispatch('orden/reset')
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
  margin-left: 1rem;
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
  height: 2rem;
  margin-left: 1rem;
}

input[type='checkbox'],
input[type='radio'] {
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
  margin-bottom: 8px;

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
    background: #dedede;
    text-align: center;
    font-size: 0.55rem;
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
.icon-image {
  width: 60px;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
}

.icon-airbag {
  background-image: url('../assets/airbag.svg');
}

.icon-engine {
  background-image: url('../assets/motor.svg');
}

.icon-abs {
  background-image: url('../assets/abs.svg');
}

.icon-oil {
  background-image: url('../assets/oil.svg');
}

.icon-battery {
  background-image: url('../assets/battery.svg');
}

.icon-cinturon {
  background-image: url('../assets/cinturon.svg');
}

.icon-frenodemano {
  background-image: url('../assets/frenodemano.svg');
}

.icon-lights {
  background-image: url('../assets/lights.svg');
}

.icon-stability {
  background-image: url('../assets/stability.svg');
}

.icon-temperature {
  background-image: url('../assets/temperature.svg');
}

.icon-brakepad {
  background-image: url('../assets/Brake_pad.svg');
}

.icon-bulb {
  background-image: url('../assets/bulb.svg');
}

.icon-eml {
  background-image: url('../assets/eml.svg');
}

.icon-fl {
  background-image: url('../assets/fog-light.svg');
}

.icon-ltp {
  background-image: url('../assets/ltp.svg');
}

.icon-nbrakepad {
  background-image: url('../assets/nbrakepad.svg');
}

.icon-ndiesel {
  background-image: url('../assets/ndiesel.svg');
}

.icon-nexteriorlight {
  background-image: url('../assets/nexteriorlight.svg');
}

.icon-nfault {
  background-image: url('../assets/nfault.svg');
}

.icon-nfront {
  background-image: url('../assets/nfront.svg');
}

.icon-nhill {
  background-image: url('../assets/nhill.svg');
}

.icon-npower {
  background-image: url('../assets/npower.svg');
}

.icon-npress {
  background-image: url('../assets/npress.svg');
}

.icon-nservice {
  background-image: url('../assets/nservice.svg');
}

.icon-nsidelight {
  background-image: url('../assets/nsidelight.svg');
}

.icon-nsteering {
  background-image: url('../assets/nsteering.svg');
}

.icon-nwater {
  background-image: url('../assets/nwater.svg');
}

.icon-parking {
  background-image: url('../assets/parking.svg');
}

.icon-on {
  filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%)
    contrast(97%);
}

.lights-block {
  div {
    width: 10%;

    img {
      width: 100%;
    }
  }
  .icon {
    height: 50px;
    width: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
    border: none;
    background-position: center;
  }

}

// fuel styles
.fuel-gauge {
  text-align: center;
  width: 165px;
  margin: auto;
  display: grid;
  grid-template-rows: 75px 1fr 1fr;
  grid-template-columns: repeat(10, 16px);
  grid-template-areas:
    'gauge gauge gauge gauge gauge gauge gauge gauge gauge gauge'
    '. empty . . .  . . . full .'
    'slider slider slider slider slider slider slider slider slider slider';

  div:first-of-type {
    grid-area: gauge;
  }

  .range-container {
    grid-area: slider;

    .v-input__slot {
      margin-bottom: 0;
    }

    .v-messages {
      display: none;
    }
  }

  .empty-fuel {
    grid-area: empty;
    justify-self: end;
  }

  .full-fuel {
    grid-area: full;
    justify-self: start;
  }

  .gauge-value {
    border: 1px solid red;
    font-size: 0;
  }

  ::v-deep .gauge-title {
    display: none;
  }
}

.car {
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 25%;
}

.sedan-right {
  background-image: url('../assets/right-sedan.jpg');

  ::v-deep canvas {
    clip-path: polygon(
      3.06% 60.4%,
      6.61% 37.2%,
      14.06% 35.4%,
      27.61% 27.8%,
      46% 26.8%,
      59.48% 28%,
      72.09% 40.6%,
      84.73% 42.4%,
      96% 44%,
      99% 58%,
      96.45% 66.4%,
      86.85% 66.8%,
      79.27% 75.6%,
      71.27% 68.8%,
      31.89% 67.6%,
      23.24% 74.4%,
      15.81% 68.2%
    );
  }
}

.sedan-front {
  background-image: url('../assets/front-sedan.jpg');

  ::v-deep canvas {
    clip-path: polygon(
      7.09% 101%,
      4.55% 66.4%,
      6% 40%,
      0% 35%,
      11.12% 22.6%,
      25.96% 0.4%,
      55.18% 3.4%,
      73.08% 5.6%,
      81.52% 24%,
      94.79% 30%,
      90.33% 46.2%,
      90.39% 61.2%,
      90.33% 102%,
      79.14% 104.8%,
      74.57% 93.2%,
      21.7% 92.8%,
      20.75% 101%
    );
  }
}

.sedan-back {
  background-image: url('../assets/back-sedan.jpg');

  ::v-deep canvas {
    clip-path: polygon(
      7.09% 101%,
      4.55% 66.4%,
      6% 40%,
      0% 35%,
      11.12% 22.6%,
      25.96% 0.4%,
      55.18% 3.4%,
      73.08% 5.6%,
      81.52% 24%,
      94.79% 30%,
      90.33% 46.2%,
      90.39% 61.2%,
      90.33% 102%,
      79.14% 104.8%,
      74.57% 93.2%,
      21.7% 92.8%,
      20.75% 101%
    );
  }
}

.sedan-left {
  background-image: url('../assets/left-sedan.jpg');

  ::v-deep canvas {
    clip-path: polygon(
      2.52% 66.8%,
      5% 47%,
      27.48% 41.8%,
      44.61% 28.8%,
      65.91% 27.8%,
      80.39% 35.8%,
      97.97% 40.8%,
      98.48% 66.6%,
      86.52% 69.2%,
      78.55% 76%,
      67.52% 70.8%,
      29.94% 72.6%,
      15.33% 76.4%
    );
  }
}

.pickup-right {
  background-image: url('../assets/right-pickup.png');

  ::v-deep canvas {
    clip-path: polygon(
      0.48% 63.6%,
      4.55% 37.2%,
      34.67% 41%,
      37.92% 28.6%,
      46% 26.8%,
      63.6% 25.6%,
      75.19% 38.2%,
      84.73% 41.6%,
      96% 44%,
      100.03% 57.2%,
      100.57% 68.8%,
      92% 75.6%,
      84.42% 78.8%,
      74.36% 71.2%,
      33.44% 70%,
      23.24% 83.2%,
      13.23% 72.2%
    );
  }
}

.pickup-front {
  background-image: url('../assets/front-pickup.png');

  ::v-deep canvas {
    clip-path: polygon(
      7.09% 101%,
      4.55% 66.4%,
      4.45% 40%,
      5.15% 19.8%,
      14.73% 14.6%,
      23.38% 0.4%,
      36.62% -4.6%,
      70.5% -3.2%,
      84.1% -0.8%,
      93.24% 14.8%,
      94.97% 31%,
      97.61% 50.8%,
      94.45% 102.8%,
      79.14% 104.8%,
      77.15% 90%,
      23.25% 91.2%,
      20.75% 101%
    );
  }
}

.pickup-back {
  background-image: url('../assets/back-pickup.png');

  ::v-deep canvas {
    clip-path: polygon(
      7.09% 101%,
      4.55% 66.4%,
      4.45% 40%,
      5.15% 19.8%,
      14.73% 14.6%,
      23.38% 0.4%,
      36.62% -4.6%,
      70.5% -3.2%,
      84.1% -0.8%,
      93.24% 14.8%,
      94.97% 31%,
      97.61% 50.8%,
      94.45% 102.8%,
      79.14% 104.8%,
      77.15% 90%,
      23.25% 91.2%,
      20.75% 101%
    );
  }
}

.pickup-left {
  background-image: url('../assets/left-pickup.png');

  ::v-deep canvas {
    clip-path: polygon(
      -2.1% 67.6%,
      3.52% 43.6%,
      23.85% 37.8%,
      35.34% 26.2%,
      57.34% 23.6%,
      63.08% 37.6%,
      75.19% 38.2%,
      84.73% 41.6%,
      96% 44%,
      100.03% 57.2%,
      100.57% 68.8%,
      87.36% 70%,
      76.17% 80.4%,
      67.14% 72.8%,
      25.19% 71.6%,
      18.6% 81.6%,
      8.59% 76.2%
    );
  }
}

.suv-right {
  background-image: url('../assets/right-suv.png');

  ::v-deep canvas {
    clip-path: polygon(
      -1.07% 70%,
      0.94% 35.6%,
      10.44% 14.6%,
      44.62% 12.6%,
      58.89% 14.8%,
      63.6% 25.6%,
      75.19% 38.2%,
      89.88% 38.4%,
      99.51% 45.2%,
      99.54% 76%,
      88.91% 80.4%,
      81.33% 90.8%,
      66.11% 79.2%,
      33.44% 77.2%,
      20.15% 91.2%,
      11.17% 75.4%
    );
  }
}

.suv-front {
  background-image: url('../assets/front-suv.png');

  ::v-deep canvas {
    clip-path: polygon(
      15.85% 101.8%,
      13.31% 68.8%,
      12.18% 46.4%,
      6.7% 28.6%,
      20.4% 12.2%,
      31.11% -2.8%,
      79.26% -4%,
      86.68% 20.8%,
      99.43% 28.4%,
      91.36% 47%,
      93.49% 68.4%,
      90.32% 103.6%,
      80.17% 104.8%,
      77.15% 90%,
      30.47% 90.4%,
      27.96% 99.4%
    );
  }
}

.suv-back {
  background-image: url('../assets/back-suv.png');

  ::v-deep canvas {
    clip-path: polygon(
      10.7% 100.2%,
      10.22% 71.2%,
      9.09% 48%,
      6.7% 28.6%,
      20.4% 12.2%,
      31.11% -2.8%,
      75.65% 0%,
      83.07% 17.6%,
      95.82% 28.4%,
      89.81% 47%,
      88.85% 72.4%,
      90.32% 103.6%,
      76.56% 103.2%,
      72.51% 90%,
      26.35% 89.6%,
      23.84% 100.2%
    );
  }
}

.suv-left {
  background-image: url('../assets/left-suv.png');

  ::v-deep canvas {
    clip-path: polygon(
      -1.07% 74.8%,
      0.42% 42%,
      23.84% 33%,
      41.53% 15.8%,
      74.87% 10.8%,
      90.92% 14.4%,
      96.84% 29.4%,
      100.7% 50.4%,
      99.54% 76%,
      88.91% 80.4%,
      81.33% 90.8%,
      66.11% 79.2%,
      33.44% 77.2%,
      20.15% 91.2%,
      11.17% 80.2%
    );
  }
}

.car-title {
  &__item {
    width: 25%;
    text-align: center;
    font-size: small;
    cursor: pointer;
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

.page3 {
  page-break-inside: avoid;
  page-break-after: avoid;
  margin-bottom: 0;
  margin: 0 auto 0;
  font-size: 0.675rem;
  &:last-of-type {
    margin-bottom: var(--margin-last-page);
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
    box-shadow: 0 0 0 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  input {
    font: inherit;
    text-align: center;
    border-bottom: 1px solid hsl(0, 0%, 0%);
  }

  h2 {
    font-size: 1rem;
    text-align: left;
  }

  p {
    max-width: 100%;
    font-size: 13px;
  }

  .insurance-radio {
    display: inline-block;
    width: 0.5rem;
    height: 1em;
    position: relative;
    cursor: pointer;

    input[type='radio'] {
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
      border: none;
      position: absolute;
    }
  }
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
    border-bottom: 1px solid #222;
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
      margin-bottom: -50px !important;
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
