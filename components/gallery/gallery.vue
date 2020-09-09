<template>
    <div class="gallery flex flex-center">
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
                images: []
            }
        },
        async fetch() {
            var once = true;
            let data;

            if (this.id !== undefined) {
                data = await axios.get("http://localhost:4000/images?path=uploads/events/" + this.id);
            } else {
                data = await axios.get(this.imgPath);
            }

            if (data.data.status === true) {
                data.data.data.forEach(value => {
                    this.images.push("http://localhost:4000" + value.replace("uploads", ""));
                    if (once) {
                        this.selectedImage = "http://locahost:4000" + value.replace("uploads", "");
                        once = false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "gallery";
</style>