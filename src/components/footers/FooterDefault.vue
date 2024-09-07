<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";

const brand = {
  name: "Peroli Centro Dermatológico",
  logo: logoDark,
  route: "/",
};

const socials = [
  {
    icon: '<i class="fab fa-facebook-f text-lg"></i>',
    link: "https://www.facebook.com/CentroDermaPeroli/",
  },
  {
    icon: '<i class="fab fa-instagram text-lg"></i>',
    link: "https://www.instagram.com/CentroDermaPeroli/",
  },
];
</script>

<template>
  <footer class="footer pt-5 mt-5 bg-light">
    <div class="container">
      <div class="row">
        <!-- Brand Section -->
        <div class="col-md-4 mb-4 text-center text-md-start">
          <a :href="brand.route">
            <img :src="brand.logo" class="footer-logo img-fluid" alt="Logo" />
          </a>
          <h5 class="font-weight-bolder mt-3">{{ brand.name }}</h5>
        </div>

        <!-- Social Media Links -->
        <div class="col-md-4 mb-4 text-center text-md-start">
          <h6 class="font-weight-bolder mb-3">Síguenos</h6>
          <div class="d-flex justify-content-center justify-content-md-start">
            <a
              v-for="{ icon, link } of socials"
              :key="link"
              :href="link"
              target="_blank"
              class="me-3"
            >
              <span v-html="icon"></span>
            </a>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="col-md-4 mb-4 text-center text-md-start">
          <h6 class="font-weight-bolder mb-3">Contáctanos</h6>
          <div
            class="d-flex flex-column align-items-center align-items-md-start"
          >
            <p class="mb-2">
              <a href="tel:352 111 8347" class="text-dark text-decoration-none">
                <i class="fas fa-phone-alt me-2"></i> 352 111 8347
              </a>
            </p>
            <p class="mb-2">
              <a
                href="mailto:dermaperoli@gmail.com"
                class="text-dark text-decoration-none"
              >
                <i class="fas fa-envelope me-2"></i> dermaperoli@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://maps.app.goo.gl/DK5bmkXS5gCNzQkd9"
                target="_blank"
                class="text-dark text-decoration-none"
              >
                <i class="fas fa-map-marker-alt me-2"></i> Gran Via, Gral.
                Enrique Ramírez 48-Local 4, Plaza, 59300 La Piedad de Cabadas,
                Mich.
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="text-center mt-5">
        <p class="text-dark text-sm font-weight-normal">
          Todos los derechos reservados. Copyright ©
          {{ new Date().getFullYear() }}
          Peroli Centro Dermatológico
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.footer-logo {
  max-width: 150px;
}

h5,
h6 {
  margin: 0;
  color: #343a40;
}

.list-unstyled {
  margin: 0;
  padding: 0;
}

.list-unstyled li {
  display: inline;
}

.text-dark {
  color: #343a40;
}

.text-decoration-none {
  text-decoration: none;
}

@media (min-width: 768px) {
  .footer-logo {
    max-width: 200px;
  }
}
</style>
