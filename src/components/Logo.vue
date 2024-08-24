<template>
  <div class="logo">
    <img :src="$globalConfig.logoImage" alt="logo" />
  </div>
</template>

<style lang="css">
.logo {
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 100%;
  height: auto;
}
</style>
