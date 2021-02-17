<template>
    <div class="gallery flex flex-center" v-if="this.images !== null">
        <div class="slider flex flex-center row">
            <div class="row">
                <div v-for="image in images" :key="image" class="col flex flex-center">
                    <img :src="image" alt="Bild von der Ausstellung" @click="selectedImage = image" v-if="isImage(image)" />
                    <video :src="image" alt="Video von der Ausstellung" @click="selectedImage = image" v-if="!isImage(image)">
                    </video>
                </div>
            </div>
        </div>
        <div class="preview flex flex-center">
            <img :src="selectedImage" alt="Preview Image of Slider" class="image" v-if="isImage(selectedImage)" />
            <video :src="selectedImage" alt="Preview Video for the Slider" class="image" v-if="!isImage(selectedImage)" controls></video>
        </div>
    </div>
    <div class="gallery flex flex-center" v-else>
      <div class="slider flex flex-center row error">
        Für das Event sind noch keine Bilder hinzugefügt worden
      </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "gallery",
        props: {
            imgPath: String,
            id: String
        },
        data() {
            return {
                selectedImage: "",
                images: null
            }
        },
        methods: {
          isImage: function(path) {
            let isImage = true;

            isImage = this.contains(path, [
              ".jpg",
              ".jpeg",
              ".bmp",
              ".png",
              ".svg",
              ".ico",
              ".gif"
            ]);

            return isImage;
          },
          contains: function (string, arr) {
            const tmp = [];
            for (const check of arr) {
              if(string.includes(check)) {
                tmp.push(true);
              } else {
                tmp.push(false)
              }
            }

            if(tmp.includes(true)) {
              return true;
            } else {
              return false;
            }
          }
        },
        async fetch() {
            let selectOneImage = true;
            let data;

            try {
              if (this.id !== undefined) {
                data = await axios.get(process.env.baseImage + "/images?path=uploads/events/" + this.id + "/");
              } else {
                data = await axios.get(this.imgPath);
              }

              if (data.status === 200) {
                this.images = [];
                let tmp = "server/uploads";
                data.data.data.forEach(item => {
                  this.images.push(process.env.baseImage + item.replace(tmp, ''));
                  if (selectOneImage) {
                    this.selectedImage = process.env.baseImage + item.replace(tmp, "");
                    selectOneImage = false;
                  }
                });
              }
            } catch(err) {
              this.images = null;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "gallery";
</style>