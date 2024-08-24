<template>
  <v-app :style="loginBackgroundStyle" id="login">
    <v-main>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col cols="11" md="6" sm="8">
            <v-card class="elevation-25 form-block">
              <v-toolbar class="d-flex justify-center" color="primary" dark flat>
                <v-toolbar-title>Formulario de ingreso</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.native.enter="login">
                  <v-text-field
                    name="mail"
                    type="text"
                    v-model="mail"
                    :filled="filled"
                    :rounded="rounded"
                    label="Correo Electrónico"
                    prepend-icon="mdi-account"
                  />
                  <v-text-field
                    id="password"
                    name="password"
                    ref="password"
                    v-model="password"
                    :filled="filled"
                    :rounded="rounded"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    label="Contraseña"
                    prepend-icon="mdi-lock"
                    @click:append="togglePassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" rounded @click="login">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
    >
      {{ snackbarOpt.text }}
      <v-btn dark text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      filled: true,
      rounded: true,
      mail: '',
      password: '',
      error: '',
      snackbar: false,
      showPassword: false,
      snackbarOpt: {
        color: 'error',
        mode: '',
        text: 'Usuario o contraseña incorrectos',
        timeout: 5000,
        x: null,
        y: 'top'
      }
    }
  },
  computed: {
    loginBackgroundStyle() {
      return {
        background: `linear-gradient(
          50deg,
          ${this.$globalConfig.colors.color1} 0%,
          ${this.$globalConfig.colors.color2} 100%
        )`
      }
    }
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.mail, this.password)
        .then(() => {
          this.$router.replace({ name: 'basedatos' })
        })
        .catch(err => {
          this.snackbar = true
          console.log(err)
        })
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>
<style lang="scss">

picture {
  display: flex;
  justify-content: center;
  width: 100%;
}

.form-block {
  max-width: 500px !important;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-img {
  width: 25%;
  text-align: center;
}

.forgot-password {
  display: block;
  margin: 1rem 1rem 0 1rem;
  text-align: right;
}
::-webkit-scrollbar {
    display: none;
}
</style>
