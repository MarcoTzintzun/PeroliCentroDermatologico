<script setup>
import DefaultReviewCard from "@/components/cards/reviewCards/DefaultReviewCard.vue";
</script>

<template>
  <section class="py-7">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <h2 class="mb-0">Reseñas de nuestros pacientes</h2>
          <h2 class="text-gradient text-success mb-3">
            Confiado por miles de personas
          </h2>
          <p class="lead">
            Nuestros pacientes nos recomiendan por la calidad de nuestros
            tratamientos y la atención personalizada.
          </p>
        </div>
      </div>
      <div class="row mt-6">
        <DefaultReviewCard
          name="María López"
          date="Hace 1 día"
          review='"Excelente servicio, los resultados fueron mejores de lo que esperaba. ¡Recomendado!"'
          :rating="5.0"
        />
        <DefaultReviewCard
          class="ms-md-auto"
          color="bg-warning"
          name="Carlos Pérez"
          date="Hace 1 semana"
          review='"El personal es muy profesional y me sentí muy bien atendido durante todo el tratamiento."'
          :rating="5.0"
        />

        <DefaultReviewCard
          name="Ana Martínez"
          date="Hace 3 semanas"
          review='"Definitivamente volveré. Los tratamientos son efectivos y el lugar es muy cómodo."'
          :rating="5.0"
        />
      </div>
    </div>
  </section>
</template>
