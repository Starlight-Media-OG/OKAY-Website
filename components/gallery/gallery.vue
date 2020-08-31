<template>
    <div class="gallery flex flex-center">
        <div class="slider flex flex-center">
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
            path: String,
            id: String
        },
        data() {
            return {
                selectedImage: "",
                images: []
            }
        },
        async fetch() {
            let data = await axios.get("http://localhost:4000/images?path=uploads/" + this.id);
            if (data.data.status === true) {
                data.data.data.forEach(value => {
                    this.images.push("http://localhost:4000" + value.replace("uploads", ""));
                    this.selectedImage = "http://localhost:4000" + value.replace("uploads", "");
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "gallery";
</style>