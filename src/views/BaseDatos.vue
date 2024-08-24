<template>
<v-app
  :style="{
    backgroundImage: `url(${$globalConfig.fondo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '94.7vh',
    margin: '0',
    padding: '0',
  }"
  id="basedatos"
>
  <div class="container">
    <p class="title1">¡Bienvenido!</p>
    <p class="title2">{{ $globalConfig.companyName }}</p>
    <div class="spacer"></div>
    <div class="buttons">
      <router-link to="/ordenes">
        <v-btn class="btn1">
          <v-icon>mdi-format-list-bulleted</v-icon>Orden de servicio
        </v-btn>
      </router-link>
      <router-link to="/notas">
        <v-btn class="btn1">
          <v-icon>mdi-note</v-icon>Presupuesto/Nota de Venta
        </v-btn>
      </router-link>
    </div>
  </div>
</v-app>
</template>

<script>
export default {
  name: 'basedatos'
}
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.title2 {
  font-size: 2.5rem;
  color: #ffffff;
  background-color: #ffffff00;
  border-radius: 1rem;
  font-weight: 900;
  padding: 0.5rem;
}

.title1 {
  font-size: 5rem;
  color: #ffffff;
  background-color: #ffffff00;
  border-radius: 1rem;
  font-weight: 900;
  padding: 0.5rem;
}

.spacer {
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10rem;
  margin-bottom: 10rem;
}

.btn1 {
  background-color: #ffffff;
  color: #000000;
}
</style>
