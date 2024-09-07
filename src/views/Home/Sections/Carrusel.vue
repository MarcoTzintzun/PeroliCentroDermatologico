<template>
  <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <!-- Indicators -->

    <ol class="carousel-indicators">
      <li
        v-for="(image, index) in images"
        :key="index"
        :data-bs-target="'#carouselExample'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
      ></li>
    </ol>

    <!-- Carousel Items -->
    <div class="carousel-inner">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="carousel-item"
        :class="{ active: index === 0 }"
      >
        <div class="carousel-image-wrapper">
          <div
            class="page-header min-vh-75"
            :style="`background-image: url(${image.src})`"
            loading="lazy"
          >
            <div class="carousel-overlay"></div>
            <div class="container">
              <div class="row">
                <div class="col-lg-7 text-center mx-auto position-relative">
                  <h1
                    class="text-white pt-3 mt-n5 me-2"
                    :style="{ display: 'inline-block ' }"
                  >
                    {{ image.title }}
                  </h1>
                  <p
                    class="lead text-white px-5 mt-3"
                    :style="{ fontWeight: '500' }"
                  >
                    {{ image.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <a
      class="carousel-control-prev"
      href="#carouselExample"
      role="button"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExample"
      role="button"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
</template>

<script setup>
const images = [
  {
    src: "https://img.freepik.com/foto-gratis/vista-lateral-hermosa-mujer-sonriente-complaciendo-algunos-cuidados-personales_23-2148655772.jpg?t=st=1725425475~exp=1725429075~hmac=89f2e0ce6f8664d805e43fb60c62f34ad003a281eaaedbda4ce0a7715bb7f446&w=1800",
    title: "Peroli",
    description:
      "Centro Dermatológico: Cuidado experto para una piel saludable y radiante.",
  },
  {
    src: "https://img.freepik.com/foto-gratis/doctora-diagnosticando-melanoma-cuerpo-paciente_23-2149365764.jpg?t=st=1725425455~exp=1725429055~hmac=4a31a24f509c40bd7f153a3f17046a8d94479256da8892bc24f3a806a1ecb272&w=1480",
    title: "Tratamientos Especializados",
    description:
      "Ofrecemos una variedad de tratamientos dermatológicos adaptados a tus necesidades.",
  },
  {
    src: "https://img.freepik.com/foto-gratis/equipo-laboratorio-trabajando-juntos_23-2148939071.jpg?t=st=1725425428~exp=1725429028~hmac=b8fb5acbceec9f8b2ae15b4391f043ce69f166305f80644ae174c8f8df269a29&w=1480",
    title: "Tecnología Avanzada",
    description:
      "Equipados con la última tecnología para ofrecer los mejores resultados.",
  },
  {
    src: "https://img.freepik.com/foto-gratis/doctores-mirando-notas-portapapeles_23-2148757359.jpg?w=1480&t=st=1725425362~exp=1725425962~hmac=c9a7d936e636566249cbc0655fab016d3c0df3ad003c2b383c0dbb8be3ad5dea",
    title: "Profesionales Experimentados",
    description:
      "Nuestro equipo está compuesto por dermatólogos altamente calificados.",
  },
  {
    src: "https://img.freepik.com/foto-gratis/vista-lateral-amigas-disfrutando-cuidado-piel_23-2148655787.jpg?t=st=1725425512~exp=1725429112~hmac=adfa536ef18e29af62f224f333b7a5754d112c25a1391cc64798f9916826e4a2&w=1480",
    title: "Cuidados Personalizados",
    description:
      "Nos enfocamos en ofrecer un cuidado personalizado para cada paciente.",
  },
];
</script>

<style scoped>
.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: drop-shadow(
    5px 5px 10px rgba(0, 0, 0, 0.87)
  ); /* Añadir una sombra para mejor visibilidad */
	padding: 10%;
}

.carousel-indicators {
  bottom: 50px; /* Ajusta la posición desde la parte inferior */
}

@media (min-width: 768px) {
  .carousel-indicators {
    bottom: 50px; /* Ajusta la posición en pantallas más grandes */
  }
}

.page-header {
  background-size: cover;
  background-position: center;
  position: relative; /* Asegura que el overlay y el contenido estén correctamente posicionados */
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.249); /* Fondo oscuro semitransparente */
  z-index: 1; /* Asegura que el overlay esté por encima de la imagen */
}

.page-header .container {
  position: relative;
  z-index: 2; /* Asegura que el contenido esté por encima del overlay */
}
</style>
