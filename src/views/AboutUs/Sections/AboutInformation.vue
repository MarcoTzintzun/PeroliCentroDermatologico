<script setup>
// example components
import DefaultInfoCard from "../../../components/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../../../components/cards/blogCards/CenteredBlogCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="row justify-content-start">
            <DefaultInfoCard
              color="info"
              icon="local_hospital"
              title="Centro de Excelencia"
              description="Nuestro centro dermatológico se dedica a proporcionar el mejor cuidado para tu piel, combinando tecnología avanzada y experiencia profesional."
            />
            <DefaultInfoCard
              color="info"
              icon="verified_user"
              title="Especialistas Certificados"
              description="Contamos con un equipo de dermatólogos altamente calificados y certificados, comprometidos con la excelencia en el tratamiento de diversas condiciones de la piel."
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="medical_services"
              title="Servicios Completos"
              description="Desde consultas generales hasta tratamientos estéticos avanzados, ofrecemos una gama completa de servicios para satisfacer todas tus necesidades dermatológicas."
            />
            <DefaultInfoCard
              color="info"
              icon="star"
              title="Atención Personalizada"
              description="Cada paciente recibe una atención personalizada, con un plan de tratamiento adaptado a sus necesidades específicas para asegurar los mejores resultados posibles."
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://img.freepik.com/foto-gratis/mujer-que-trabaja-tecnologia-cerca_23-2148925509.jpg?t=st=1725428311~exp=1725431911~hmac=9c3045490957d7cd1787f0b0ef52fe62004c17c498466a12d32558484a142a3f&w=740"
            title="Nuestra Misión y Visión"
            description="En nuestro centro, nos esforzamos por brindar un cuidado integral y personalizado, con un enfoque en la salud y bienestar de la piel. Descubre más sobre nuestra misión y visión para el futuro."
          />
        </div>
      </div>
    </div>
  </section>
</template>
