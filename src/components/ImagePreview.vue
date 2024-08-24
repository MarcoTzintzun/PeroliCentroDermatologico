<template>
  <div class="img-container">
    <v-btn
      :absolute="true"
      :x-small="true"
      :fab="true"
      :color="getShowPreview ? 'white' : ''"
      :class="{ 'top-right': getShowPreview }"
      @click.native="openFileDialog('file')"
    >
      <v-icon dark>mdi-cloud-upload</v-icon>
    </v-btn>
    <v-btn
      v-show="getShowPreview"
      :absolute="true"
      :x-small="true"
      :fab="true"
      :color="getShowPreview ? 'white' : ''"
      :class="{ 'top-left': getShowPreview }"
      @click="openImageNewTab"
    >
      <v-icon dark>mdi-open-in-new</v-icon>
    </v-btn>
    <v-btn
      v-show="getShowPreview"
      :absolute="true"
      :x-small="true"
      :fab="true"
      :color="getShowPreview ? 'white' : ''"
      :class="{ 'bottom-left': getShowPreview }"
      @click="deleteImage"
    >
      <v-icon dark>mdi-delete</v-icon>
    </v-btn>
    <v-img
      :src="getSavedImg"
      max-width="100%"
      max-height="100%"
      contain
      :ref="'image' + img"
      :lazy-src="getSavedImg"
      v-show="getShowPreview"
    />
    <v-file-input
      v-model="file"
      accept="image/*"
      ref="file"
      style="display: none"
      @change="onFileChange"
    />
  </div>
</template>

<script>
import { downscaleImage } from '@/utils'

export default {
  name: 'ImagePreview',
  props: {
    img: {
      required: true
    },
    image: {}
  },
  data() {
    return {
      file: null,
      showPreview: false,
      imagePreview: '',
      btnClass: '',
      scaledImg: ''
    }
  },
  computed: {
    getSavedImg() {
      if (this.image && 'imgURL' in this.image) {
        return this.image.imgURL
      }
      return this.imagePreview
    },
    getScaledImg() {
      if (this.image && 'imgURL' in this.image) {
        return this.image.imgURL
      }
      return this.scaledImg
    },
    getShowPreview() {
      return this.image || this.showPreview
    }
  },
  methods: {
    openFileDialog(ref) {
      this.$refs[ref].$refs.input.click()
    },
    deleteImage() {
      this.showPreview = false
      this.imagePreview = ''
      this.scaledImg = ''
      this.$refs.file.clearableCallback()
      this.$emit('delete:image')
      if (this.image && 'imgURL' in this.image) {
        this.$emit('add-image-to-delete')
      }
    },
    onFileChange() {
      const reader = new FileReader()
      /*
        Add an event listener to the reader that when the file
        has been loaded, we flag the show preview as true and set the
        image to be what was read from the reader.
      */
      reader.addEventListener(
        'load',
        async e => {
          const imageDataURL = e.currentTarget.result
          const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
          const imageType = iOS ? 'image/jpeg' : 'image/webp'
          const scaledImgDataURL = await downscaleImage(imageDataURL, 640, imageType)
          this.scaledImg = scaledImgDataURL
          this.$emit('update:image', {
            img: this.img,
            data: {
              name: this.file.name,
              dataURL: scaledImgDataURL
            }
          })
          this.showPreview = true
          this.imagePreview = reader.result
        },
        false
      )
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
      }
    },
    openImageNewTab() {
      const data = this.scaledImg || this.getScaledImg
      const w = window.open('about:blank')
      const image = new Image()
      image.src = data
      setTimeout(function() {
        w.document.write(image.outerHTML)
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.img-container {
  position: relative;
}

.top-right {
  right: 0;
  top: 0;
}

.top-left {
  left: 0;
  top: 0;
}

.bottom-left {
  bottom: 0;
  left: 0;
}
</style>
