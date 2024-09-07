<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault from "../../components/navbars/NavbarDefault.vue";
import DefaultFooter from "../../components/footers/FooterDefault.vue";
import Header from "../../components/Header.vue";

import PresentationCounter from "./Sections/PresentationCounter.vue";
import PresentationTestimonials from "./Sections/PresentationTestimonials.vue";
import PresentationInformation from "./Sections/PresentationInformation.vue";
import PromotionalBanner from "./Sections/PromotionalBanner.vue";
import LocationMap from "./Sections/LocationMap.vue";
import DoctorReview from "./Sections/DoctorReview.vue";
import FloatButton from "./Sections/FloatButton.vue";
import Carrusel from "./Sections/Carrusel.vue";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>
  <Header>
    <Carrusel />
  </Header>
  <div
    class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6"
    style="z-index: 1"
  >
    <PromotionalBanner />
    <PresentationCounter />
    <PresentationInformation />
    <DoctorReview />
    <LocationMap />
    <PresentationTestimonials />
  </div>
  <DefaultFooter />
  <FloatButton />
</template>
