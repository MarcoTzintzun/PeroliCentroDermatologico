<template>
  <v-container class="container">
    <v-card mobile-breakpoint="700">
      <v-card-title><v-icon :style="{ color: $globalConfig.colors.color1,}">mdi-note</v-icon>Notas Creadas</v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        :loading="loading"
        :footer-props="footerProps"
        mobile-breakpoint="832"
      >
        <!-- Filters -->
        <template v-slot:top>
          <v-container fluid>
            <v-row class="justify-end">
              <v-col cols="12" sm="6">
                <v-btn color="primary" dark class="mb-2" to="/nota"><v-icon :style="{ color: $globalConfig.colors.color2,}">mdi-plus</v-icon>Nueva Nota</v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  clearable
                  solo-filled
                  hide-details
                />
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-slot:[`item.timestamp`]="{ item }">{{ item.date }}</template>
        <template v-slot:[`item.action`]="{ item }">
          <router-link :to="{ path: `nota/${item.id}`, params: { id: item.id } }">
            <v-btn
              depressed
              color="white"
              min-height="25"
              min-width="25"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </router-link>
          <v-btn
            depressed
            color="white"
            min-height="25"
            min-width="25"
            @click="deleteItem(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
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
  </v-container>
</template>

<script>
import { getForms1, updateForm1 } from '@/services/FormService'
import { mapGetters } from 'vuex'
import { serverTimestamp } from 'firebase/firestore'

export default {
  name: 'OrdersForm',
  data () {
    return {
      search: '',
      orders: [],
      loading: false,
      footerProps: {
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      },
      headers: [
        { text: 'Folio', value: 'folio' },
        { text: 'Cliente', value: 'nombre' },
        { text: 'Telefono', value: 'telefono' },
        { text: 'Unidad', value: 'unidad' },
        { text: 'Placas', value: 'placa' },
        { text: 'Fecha modificación', value: 'timestamp' },
        { text: 'Acciones', value: 'action', sortable: false }
      ],
      snackbar: false,
      snackbarOpt: {
        color: 'success',
        mode: '',
        text: 'Orden cancelada',
        timeout: 5000,
        x: null,
        y: 'top'
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  async created () {
    this.loading = true
    try {
      const querySnapshot = await getForms1()
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        const date = data.timestamp ? new Intl.DateTimeFormat('es-MX', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(data.timestamp.toDate()) : 'Fecha no disponible'
        this.orders.push({ id: doc.id, ...data, date })
      })
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    deleteItem (item) {
      const id = item.id
      this.$dialog
        .confirm({
          title: '¿Estás seguro?',
          body: 'La orden sera eliminada'
        })
        .then(async () => {
          await updateForm1(id, {
            active: false,
            canceled: serverTimestamp()
          })
          this.snackbar = true
          this.orders = this.orders.filter(item => item.id !== id)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
}

.v-select {
  font-size: 0.8rem;
  width: 120px;
  min-width: 120px;
  height: 30px;
  min-height: 30px;
  justify-content: center;
  align-items: center;
}

.v-select .v-select__selections {
  font-size: 0.75rem;
}

.v-select .v-list-item__title {
  font-size: 0.75rem;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.v-data-table__mobile-table-row:nth-child(odd),
.v-data-table__mobile-row {
  background-color: rgba(0, 0, 0, 0.05);
}

::v-deep .v-data-table tr > td:last-of-type {
  white-space: nowrap;
}
tbody td:last-child .v-btn.v-size--x-small {
  margin-inline-start: 0.5rem;
}
</style>

<style lang="scss" scoped>
::v-deep .search {
  input {
    text-align: center !important;
    padding: 8px 16px; /* Ajusta el padding para hacerlo más pequeño */
    border-radius: 25px; /* Bordes ovalados */
    border: 1px solid #ccc; /* Borde opcional */
    font-size: 14px; /* Ajusta el tamaño de la fuente para que sea más pequeño */
    width: 50%; /* Ajusta el ancho según lo que necesites */
  }

  label {
    left: 50% !important;
    transform: translateX(-50%) !important;
    font-size: 12px; /* Ajusta el tamaño de la etiqueta */
  }
}
</style>
