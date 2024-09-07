<script setup>
import DefaultCounterCard from "../../../components/cards/counterCards/DefaultCounterCard.vue";
</script>

<template>
  <section class="pt-3 pb-4" id="count-stats">
    <div class="container">
      <div class="row">
        <div class="col-lg-9 z-index-2 border-radius-xl mx-auto py-3">
          <div class="row">
            <div class="col-md-4 position-relative">
              <DefaultCounterCard
                title="Pacientes Satisfechos"
                description="Desde consultas rutinarias hasta tratamientos avanzados, confiamos en nuestra experiencia."
                :count="1000"
                suffix="+"
                :duration="3000"
                divider="vertical"
              />
            </div>
            <div class="col-md-4 position-relative">
              <DefaultCounterCard
                title="Tratamientos Ofrecidos"
                description="Desde cuidado de la piel hasta soluciones especializadas, cubrimos todas tus necesidades dermatológicas."
                :count="50"
                suffix="+"
                :duration="3000"
                divider="vertical"
              />
            </div>
            <div class="col-md-4">
              <DefaultCounterCard
                title="Años de Experiencia"
                description="Más de una década brindando atención experta y personalizada para una piel más saludable."
                :count="10"
                :duration="3000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
