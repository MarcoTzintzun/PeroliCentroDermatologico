<template>
  <v-app>
    <Navigation v-if="user"></Navigation>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from './components/Navigation.vue'

export default {
  components: { Navigation },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
<style lang="scss">
@import "./assets/css/normalize.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  box-sizing: border-box;
}

.w-1\/2 {
  flex-basis: 50%;
}

.w-1\/4 {
  flex-basis: 25%;
}

.w-70 {
  flex-basis: 70%;
}

.w-30 {
  flex-basis: 30%;
}

.w-88 {
  flex-basis: 88%;
}

.w-full {
  flex-basis: 100%;
}

.text-last-center {
  text-align-last: center !important;
}

.textarea {
  resize: none;
  line-height: 1.35;
}

.cols-2 {
  .input-block {
    flex-basis: 50%;
  }
}

.grow-1 {
  flex-grow: 1;
}

.flex-50 {
  flex: 1 0 50%;
}

.grow-4 {
  flex-grow: 4;
}

.gap-1 {
  gap: 1rem;
}

.v-navigation-drawer__content {
  .theme--dark.v-list-item,
  .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled),
  .theme--dark.v-icon,
  .theme--dark.v-btn {
    color: #ffffff !important;
  }
}
.v-toolbar {
  .theme--dark.v-icon {
    color: #ffffff !important;
  }
}

.v-speed-dial .theme--dark.v-icon {
  color: #ffffff !important;
}

</style>
