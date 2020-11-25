<template>
    <div class="gallery flex flex-center" v-if="this.images !== null">
        <div class="slider flex flex-center row">
            <div class="row">
                <div v-for="image in images" :key="image" class="col flex flex-center">
                    <img :src="image" alt="Bild von der Ausstellung" @click="selectedImage = image" />
                </div>
            </div>
        </div>
        <div class="preview flex flex-center">
            <img :src="selectedImage" alt="Preview Image of Slider" class="image" />
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
        async fetch() {
            let selectOneImage = true;
            let data;

            try {
              if (this.id !== undefined) {
                data = await axios.get("http://server.okay-ybbs.at:4000/images?path=uploads/events/" + this.id + "/");
              } else {
                data = await axios.get(this.imgPath);
              }

              if (data.status === 200) {
                this.images = [];
                let tmp = "server/uploads";
                data.data.data.forEach(item => {
                  this.images.push('http://server.okay-ybbs.at:4000' + item.replace(tmp, ''));
                  if (selectOneImage) {
                    this.selectedImage = "http://server.okay-ybbs.at:4000" + item.replace(tmp, "");
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