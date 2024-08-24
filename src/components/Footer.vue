<template>
  <footer class="footer">
    <v-container>
      <div class="footer-content">
        <div class="contact-info">
          <div class="contact-item">
            <img src="../assets/facebook.png" alt="facebook logo" />
            <a :href="$globalConfig.facebook" target="_blank">
              /{{ $globalConfig.companyName }}
            </a>
          </div>
          <div class="contact-item">
            <img src="../assets/instagram.png" alt="instagram logo" />
            <a :href="$globalConfig.instagram" target="_blank">
              /{{ $globalConfig.companyName }}
            </a>
          </div>
          <div class="contact-item">
            <img src="../assets/youtube.png" alt="youtube logo" />
            <a :href="$globalConfig.youtube" target="_blank">
              /{{ $globalConfig.companyName }}
            </a>
          </div>
          <div class="contact-item">
            <img src="../assets/tiktok.png" alt="youtube logo" />
            <a :href="$globalConfig.tiktok" target="_blank">
              /{{ $globalConfig.companyName }}
            </a>
          </div>
          <div class="contact-item">
            <img src="../assets/telefono.png" alt="phone logo" />
            <a :href="'tel:' + $globalConfig.phone">
              {{ $globalConfig.phone }}
            </a>
            <div class="contact-item">
              <img src="../assets/email.png" alt="email logo" />
              <a :href="'mailto:' + $globalConfig.email">
                {{ $globalConfig.email }}
              </a>
            </div>
          </div>
          <!-- <div class="contact-item">
            <img src="../assets/web.png" alt="website logo" />
            <a :href="$globalConfig.web" target="_blank">
              {{ $globalConfig.web }}
            </a>
          </div> -->
        </div>
        <v-row justify="center">
          <p>
            <a :href="$globalConfig.map" target="_blank">
              <b> {{ $globalConfig.address }} </b>
            </a>
          </p>
        </v-row>
      </div>
    </v-container>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  font-size: 0.62rem;
  position: absolute;
  width: 100%;
  bottom: 40;
  background-color: #ffffff; /* Opcional: para destacar el pie de página */
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
  margin-bottom: 2em;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.3em;
}

.contact-item img {
  height: 2em; /* Ajusta el tamaño de los íconos */
}

a {
  text-decoration: none;
  color: inherit;
}

p {
  margin: 0;
  text-align: center;
}
</style>
