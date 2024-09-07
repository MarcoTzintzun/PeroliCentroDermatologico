<template>
  <div class="container text-center">
    <div class="row align-items-center">
      <div class="col-md-6 mb-4 mb-md-0">
        <h2 class="font-weight-bolder">{{ doctor.name }}</h2>
        <h5 class="text-muted">{{ doctor.level }}</h5>
        <p class="text-dark mt-3">
          {{ doctor.description }}
        </p>
      </div>
      <div class="col-md-6">
        <img
          :src="doctor.photo"
          alt="Doctora Fundadora"
          class="img-fluid rounded-circle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const doctor = {
  name: "Dra. Ana Martínez",
  level: "Especialista en Dermatología",
  description:
    "La Dra. Ana Martínez es una destacada especialista en dermatología con más de 15 años de experiencia en el tratamiento de una amplia variedad de afecciones de la piel. Como fundadora de Peroli Centro Dermatológico, ha trabajado incansablemente para proporcionar soluciones avanzadas y personalizadas para el cuidado de la piel, combinando su conocimiento profundo con un enfoque empático hacia cada paciente. Su compromiso con la excelencia y la innovación la ha consolidado como una líder respetada en su campo.",
  photo:
    "https://americapasos.com/wp-content/uploads/2023/07/unnamed-1-1-1-1.jpg", // URL de la imagen
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
	margin-bottom: 15px;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

h2,
h5,
p {
  text-align: center;
}

img {
  max-width: 90%;
  height: auto;
}
</style>
