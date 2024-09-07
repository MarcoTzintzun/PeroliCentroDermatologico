<script setup>
// example component
import HorizontalTeamCard from "../../../components/cards/teamCards/HorizontalTeamCard.vue";

// images
import doctor1 from "@/assets/img/bruce-mars.jpg";
import doctor2 from "@/assets/img/charles1.jpg";
import doctor3 from "@/assets/img/charles.jpg";
import doctor4 from "@/assets/img/bruce-mars1.jpg";
</script>

<template>
  <section class="pb-5 position-relative bg-white mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-center mb-5 mt-5">
          <h3 class="text-dark z-index-1 position-relative">
            Conoce a Nuestros Doctores
          </h3>
          <p class="text-dark opacity-8 mb-0">
            Nuestro equipo de expertos está dedicado a ofrecer el mejor cuidado para tu piel. Cada doctor aporta una gran experiencia y un compromiso con la excelencia.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4"
            :image="doctor1"
            :profile="{ name: 'Dra. Emma Roberts', link: 'javascript:;' }"
            :position="{ label: 'Dermatóloga', color: 'warning' }"
            description="La Dra. Roberts es conocida por su experiencia en dermatología estética y tiene años de experiencia en mejorar la salud de la piel."
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="doctor2"
            :profile="{ name: 'Dr. William Pearce', link: 'javascript:;' }"
            :position="{ label: 'Dermatólogo Clínico', color: 'warning' }"
            description="El Dr. Pearce se especializa en dermatología clínica y tiene una sólida formación en el tratamiento de una amplia gama de condiciones de la piel."
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="doctor3"
            :profile="{ name: 'Dra. Ivana Flow', link: 'javascript:;' }"
            :position="{ label: 'Dermatóloga Cosmética', color: 'warning' }"
            description="La Dra. Flow se enfoca en procedimientos estéticos y es conocida por sus enfoques innovadores para la rejuvenecimiento de la piel."
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5 z-index-2"
            :image="doctor4"
            :profile="{ name: 'Dr. Marquez Garcia', link: 'javascript:;' }"
            :position="{ label: 'Dermatólogo Pediátrico', color: 'warning' }"
            description="El Dr. Garcia es un experto en dermatología pediátrica, dedicado a ofrecer cuidados especializados para pacientes jóvenes."
          />
        </div>
      </div>
    </div>
  </section>
</template>
