
const globalConfig = {
  companyName: 'Máster Cars RRZ',
  address: 'Avenida Maestro 307 Col. Matamoros, 58240 Morelia, Michoacán',
  addressLine1: 'Avenida Maestro 307 Col. Matamoros, 58240 Morelia, Michoacán',
  addressLine2: 'Suc 1: Perif. de la República 7365, Fracc. Defensores de Puebla, 58146, Morelia, Michoacán',
  map: 'https://maps.app.goo.gl/GknZRJr2qQCmfUUT6',
  logoImage: require('@/assets/logo.png'),
  qrImage: require('@/assets/qr.jpg'),
  fondo: require('@/assets/fondo.jpg'),
  qrReference: 'https://www.facebook.com/MecanicaMasterCarsRRZ',
  facebook: 'https://www.facebook.com/MecanicaMasterCarsRRZ',
  instagram: 'https://www.instagram.com/master.cars2019/',
  youtube: 'https://www.youtube.com/@mastercarsr.r.zmastercarsr9962',
  tiktok: 'https://www.tiktok.com/@mastercars68',
  phone: '443 845 0995',
  phone1: '443 128 2935',
  phone2: '443 116 5752',
  email: 'master.cars2019@gmail.com',
  web: '',
  colors: {
    color1: 'black',
    color2: 'white',
    color3: '#ffff',
    color4: '#fff'
  }
}

// Asi se mandarian llamar
/* <template>
  <div>
    <h1>{{ $globalConfig.companyName }}</h1>
    <img :src="$globalConfig.logoImage" alt="Logo">
    <p>Dirección: {{ $globalConfig.address }}</p>
    <p>Teléfono: {{ $globalConfig.phone }}</p>
    <p>Correo: {{ $globalConfig.email }}</p>
    <img :src="$globalConfig.qrImage" alt="QR Code">
    <a :href="$globalConfig.facebook">Facebook</a>
    <a :href="$globalConfig.instagram">Instagram</a>
    <a :href="$globalConfig.youtube">YouTube</a>
    <div :style="{ backgroundColor: $globalConfig.colors.color1 }">Color 1</div>
    <!-- ...otros colores -->
  </div>
</template> */
export default globalConfig
