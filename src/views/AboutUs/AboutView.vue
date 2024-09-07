<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import DefaultNavbar from "../../components/navbars/NavbarDefault.vue";
import DefaultFooter from "../../components/footers/FooterDefault.vue";

//dep
import Typed from "typed.js";

//sections
import Information from "./Sections/AboutInformation.vue";
import AboutTeam from "./Sections/AboutTeam.vue";
import Featuring from "./Sections/AboutFeaturing.vue";

const body = document.getElementsByTagName("body")[0];
//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>
<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <DefaultNavbar :sticky="true" />
      </div>
    </div>
  </div>
  <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-75"
      :style="{
        backgroundImage: `url(https://img.freepik.com/foto-gratis/modelos-multietnicos-tres-mujeres-jovenes-ojos-cerrados-tops-negros-pie-juntos-sobre-fondo-blanco_197531-31841.jpg?t=st=1725426871~exp=1725430471~hmac=bccf55b941d287d518aa1c11084fa384911b2d78135455addea87e6a5ad501ed&w=1480)`,
      }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">
              Conoce a nuestro <span class="text-white" id="typed"></span>
            </h1>
            <div id="typed-strings">
              <h1>equipo</h1>
              <h1>especializado</h1>
              <h1>en dermatología</h1>
            </div>
            <p class="lead mb-4 text-white opacity-8">
              En nuestro centro dermatológico, nos apasiona ofrecer atención de
              calidad y soluciones innovadoras para el cuidado de la piel.
              Nuestro equipo está compuesto por expertos dedicados a brindarte
              los mejores resultados en cada tratamiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <Information />
    <AboutTeam />
    <Featuring />
  </div>
  <DefaultFooter />
</template>
