<template>
  <div class="map-container">
		<h2 style="text-align: center; color: #582217; margin-bottom: 2%;">¿Como llegar?</h2>
    <iframe
      :src="mapUrl"
      width="85%"
      height="400"
      frameborder="0"
      allowfullscreen
      aria-hidden="false"
      tabindex="0"
    ></iframe>
    <div class="map-info">
      <a :href="mapLink" target="_blank" class="text-dark text-decoration-none">
        <i class="fas fa-map-marker-alt me-2" style="color: #582217"></i>
        Gran Via, Gral. Enrique Ramírez 48-Local 4, Plaza, 59300 La Piedad de
        Cabadas, Mich.
      </a>
    </div>
  </div>
</template>

<script setup>
const mapUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14963.637478755629!2d-102.0319202!3d20.3453624!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842c1fbb4122b05d%3A0xba58b8673e271f64!2sCentro%20Dermatol%C3%B3gico%20Peroli!5e0!3m2!1ses!2smx!4v1725417043361!5m2!1ses!2smx";
const mapLink = "https://maps.app.goo.gl/DK5bmkXS5gCNzQkd9";
</script>

<style scoped>
.map-container {
  width: 100%;
  text-align: center;
}

.map-info {
  margin-top: 10px;
}

.text-dark {
  color: #343a40;
}

.text-decoration-none {
  text-decoration: none;
}

.text-decoration-none:hover {
  text-decoration: underline;
}

.fas.fa-map-marker-alt {
  color: #007bff;
}
</style>
