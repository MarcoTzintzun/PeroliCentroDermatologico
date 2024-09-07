<template>
  <div class="promo-container">
    <div class="promo-wrapper">
      <div class="promo-item" v-for="(promo, index) in promotions" :key="index">
        <span>{{ promo }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const promotions = [
  "¡20% de descuento en tratamientos faciales!",
  "Consulta gratuita en tu primera visita.",
  "Promoción especial en depilación láser.",
  "Aprovecha nuestras ofertas de paquetes de tratamiento.",
  "Revisa nuestros nuevos servicios y precios especiales.",
];
</script>

<style scoped>
.promo-container {
  width: 100%;
  overflow: hidden;
  background-color: #582217;
  padding: 10px 0;
  z-index: 10;
}

.promo-wrapper {
  display: flex;
  white-space: nowrap;
  animation: marquee 30s linear infinite;
}

.promo-item {
  display: inline-block;
  padding: 0 10px;
  font-size: 20px;
  text-transform: uppercase;
  color: #ffffff;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
