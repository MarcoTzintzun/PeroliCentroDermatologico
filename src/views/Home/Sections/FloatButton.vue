<template>
  <div>
    <div class="fab-container" :class="{ 'fab-opened': fabOpened }">
      <button class="fab-button" @click="toggleFab">
        <i v-if="!fabOpened" class="fas fa-plus"></i>
        <i v-else class="fas fa-times"></i>
      </button>

      <div v-if="fabOpened" class="fab-actions">
        <a href="https://wa.me/1234567890" target="_blank" class="fab-action" title="WhatsApp">
          <i class="fab fa-whatsapp"></i>
        </a>
        <a href="https://maps.app.goo.gl/DK5bmkXS5gCNzQkd9" target="_blank" class="fab-action" title="Ubicación">
          <i class="fas fa-map-marker-alt"></i>
        </a>
        <button class="fab-action" @click="scrollToTop" title="Volver arriba">
          <i class="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fabOpened = ref(false);

const toggleFab = () => {
  fabOpened.value = !fabOpened.value;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999; /* Alto z-index para que siempre esté encimado */
}

.fab-button {
  background-color: #582217;
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.fab-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 70px;
  right: 0;
}

.fab-action {
  background-color: #582217;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  text-decoration: none;
  font-size: 20px;
}

.fab-opened .fab-button {
  transform: rotate(90deg);
}

.fab-actions {
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: all 5s ease-in-out; /* Aumenté el tiempo a 0.5s */
}

.fab-opened .fab-actions {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition: all 5s ease-in-out; /* Aumenté el tiempo a 0.5s */
}
</style>
