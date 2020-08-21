<template>
    <div class="gallery">
        <div class="preview">
            <img :src="image.fullPath" alt="Preview Image of Slider" />
        </div>
        <div class="slider">
            <div class="row">
                <img v-for="image in images" :key="fullPath" :src="image.fullPath" alt="Bild von der Ausstellung" @click="this.selectedImage = image.fullPath" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "gallery",
        props: {
            path: String
        },
        data() {
            selectedImage: String
            images: [];
        },
        methods: {
            importAll: function (r) {
                r.keys().forEach(key => (this.images.push({ pathFull: key(r), pathShort: key, })));
            }
        },
        mounted() {
            this.importAll(require.context(this.path, true, /\.png$/));
        }
    }
</script>

<style scoped lang="scss">
    @import "gallery";
</style>