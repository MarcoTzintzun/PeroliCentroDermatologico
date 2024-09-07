<script setup>
import RotatingCard from "../../../components/rotatingCards/RotatingCard.vue";
import RotatingCardFront from "../../../components/rotatingCards/RotatingCardFront.vue";
import RotatingCardBack from "../../../components/rotatingCards/RotatingCardBack.vue";
</script>
<template>
  <section class="my-5 py-5">
    <div class="container">
      <div class="row align-items-center">
        <h2 style="text-align: center; color: #582217">Los favoritos</h2>
        <!-- Hydrofacial Card -->
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              image="https://www.doctorcherizola.com/wp-content/uploads/2023/11/Tratamiento-Hydrafacial.jpg"
              icon="spa"
              title="Hydrofacial"
              description="Tratamiento facial avanzado para una piel radiante y saludable."
            />
            <RotatingCardBack
              image="https://atderma.co/wp-content/uploads/2023/10/4.jpg"
              title="Experimenta Hydrofacial"
              description="El tratamiento Hydrofacial limpia, exfolia e hidrata tu piel con resultados visibles y duraderos. Ideal para todo tipo de pieles."
              :action="[
                {
                  route: '/agendar-cita',
                  label: 'Agendar Cita',
                },
              ]"
              extra-info="¡Descubre una piel más fresca y radiante! Ofrecemos consultas gratuitas para personalizar tu tratamiento."
            />
          </RotatingCard>
        </div>

        <!-- Nanopore Card -->
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              image="https://myplasticskin.com/img/servicios/nanopore/img00.jpg"
              icon="face"
              title="Nanopore"
              description="Tecnología avanzada para mejorar la textura y apariencia de tu piel."
            />
            <RotatingCardBack
              image="https://dracarolinaflorez.com/wp-content/uploads/2019/09/Nanopore-Stylus-rejuvenecimiento-facial.jpg"
              title="Revitaliza tu piel con Nanopore"
              description="El tratamiento Nanopore utiliza microneedling para estimular la producción de colágeno y mejorar la textura de la piel. Ideal para reducir arrugas y cicatrices."
              :action="[
                {
                  route: '/agendar-cita',
                  label: 'Agendar Cita',
                },
              ]"
              extra-info="¡Reserva una consulta para conocer cómo Nanopore puede transformar tu piel! Consulta gratuita disponible."
            />
          </RotatingCard>
        </div>

        <!-- Depilación Láser Diodo Card -->
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              image="https://laserluz.com/blog/wp-content/uploads/2022/03/como-funciona-la-depilacion-laser-de-diodo.png"
              icon="remove_circle"
              title="Depilación Láser Diodo"
              description="Solución efectiva y duradera para la eliminación del vello no deseado."
            />
            <RotatingCardBack
              image="https://staticnew-prod.topdoctors.mx/files/Image/large/30ff74ae5c2386780f640d9534b39286.jpg"
              title="Di Adiós al Vello"
              description="La depilación láser diodo ofrece resultados duraderos y confortables, ideal para una piel suave y libre de vello. Apta para todas las áreas del cuerpo."
              :action="[
                {
                  route: '/agendar-cita',
                  label: 'Agendar Cita',
                },
              ]"
              extra-info="¡Consulta gratis para tu tratamiento de depilación láser! Contáctanos para conocer más sobre nuestras promociones."
            />
          </RotatingCard>
        </div>
      </div>
    </div>
  </section>
</template>
