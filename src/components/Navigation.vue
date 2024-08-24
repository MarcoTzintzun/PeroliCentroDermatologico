<template>
  <div class="no-print">
    <!-- Panel de navegación -->
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      dark
      app
      temporary
      @mouseenter="openDrawer"
      @mouseleave="startCloseTimer"
      ref="drawer"
    >
      <v-list>
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-content><v-list-item-title
            class="text-center"
            :style="{
              color: $globalConfig.colors.color2,
              fontWeight: 600,
              textTransform: 'uppercase'
            }"
          >
              Panel Administración
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon :style="{color: $globalConfig.colors.color3}">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content :style="{color: $globalConfig.colors.color3}">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Barra de aplicación -->
    <v-app-bar app color="primary" dense dark class="no-print">
      <v-app-bar-nav-icon
        @mouseenter="openDrawer"
        @mouseleave="startCloseTimer"
      />
      <v-toolbar-title />
      <v-btn
        outlined
        class="mr-12"
        :style="{ backgroundColor: $globalConfig.colors.color1, borderRadius: '1rem', color: $globalConfig.colors.color2 }"
        @click="basedatos"
      >
        Inicio
      </v-btn>

      <v-spacer />
      <span :style="{color: $globalConfig.colors.color2}"> Hola!, {{ user.email }}</span>
      <v-menu bottom left :offset-y="true" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-list-item-avatar>
            <img v-on="on" src="https://previews.123rf.com/images/alexutemov/alexutemov1604/alexutemov160400446/54588479-la-construcci%C3%B3n-de-la-silueta-del-trabajador-y-constructor-de-la-ocupaci%C3%B3n-de-la-silueta-de-los.jpg"  alt="avatar"/>
          </v-list-item-avatar>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-btn text @click="logout">Logout </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { auth } from '@/firebase/config'

export default {
  data() {
    return {
      drawer: false, // Inicialmente cerrado
      miniVariant: false,
      closeTimer: null, // Temporizador para cerrar el drawer
      items: [
        {
          title: 'Ordenes de servicio',
          icon: 'mdi-format-list-bulleted',
          link: '/ordenes'
        },
        {
          title: 'Notas de venta',
          icon: 'mdi-note',
          link: '/notas'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$store.dispatch('clearDataUser')
          this.$router.push('/login')
        })
        .catch()
    },
    basedatos() {
      this.$router.push('/basedatos', () => {})
    },
    openDrawer() {
      this.drawer = true
      this.clearCloseTimer()
    },
    startCloseTimer() {
      this.clearCloseTimer() // Limpia cualquier temporizador existente
      this.closeTimer = setTimeout(() => {
        this.drawer = false
      }, 3500) // Cierra después de medio segundo
    },
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    }
  }
}
</script>

<style>
@media print {
  .no-print {
    display: none;
  }
}
</style>
