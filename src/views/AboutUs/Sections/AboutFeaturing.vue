<script setup>
// example component
import DefaultCounterCard from "../../../components/cards/counterCards/DefaultCounterCard.vue";
</script>

<template>
  <section class="pt-4 pb-6" id="count-stats">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-md-3">
          <DefaultCounterCard
            title="Pacientes Atendidos"
            description="Número total de pacientes que hemos atendido con éxito."
            :count="5234"
            :duration="10000"
          />
        </div>
        <div class="col-md-3">
          <DefaultCounterCard
            title="Horas de Tratamiento"
            description="Horas dedicadas a proporcionar cuidados y tratamientos especializados."
            :count="3400"
            suffix="+"
            :duration="10000"
          />
        </div>
        <div class="col-md-3">
          <DefaultCounterCard
            title="Consultas"
            description="Consultas realizadas por nuestro equipo de especialistas en dermatología."
            :count="24"
            suffix="/7"
            :duration="10000"
          />
        </div>
      </div>
    </div>
  </section>
</template>
