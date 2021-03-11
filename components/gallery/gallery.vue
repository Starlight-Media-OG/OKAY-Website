<template>
<div>
    <button @click="refresh">Refresh Page!</button>
    <div v-if="imageGallery == null" class="gallery flex flex-center">
        <div class="slider flex flex-center row error">
            Es sind noch keine Bilder hinzugefügt worden!
        </div>
    </div>
    <div v-else class="gallery flex flex-center">
        <div class="slider flex flex-center row">
            <div class="row">
                <div v-for="(image, index) in imageGallery" :key="index" class="col flex flex-center">
                    <img v-if="isImage(image)" :src="image" alt="Bild von der Ausstellung"
                         @click="selectedImage = image"/>
                    <video v-if="!isImage(image)" :src="image"
                           @click="selectedImage = image">
                    </video>
                </div>
            </div>
        </div>
        <div class="preview flex flex-center">
            <img v-if="isImage(selectedImage)" :src="selectedImage" alt="Preview Image of Slider" class="image"/>
            <video v-if="!isImage(selectedImage)" :src="selectedImage" class="image"
                   controls></video>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "gallery",
    props: {
        imgPath: String,
        id: String,
        type: String
    },
    data() {
        return {
	        selectedImage: "",
	        updateView: false,
            imageGallery: null
        }
    },
    methods: {
        isImage: function (path) {
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
        refresh() {
            this.$nuxt.refresh()
        },
        contains: function (string, arr) {
            const tmp = [];
            for (const check of arr) {
                if (string.includes(check)) {
                    tmp.push(true);
                } else {
                    tmp.push(false)
                }
            }

            if (tmp.includes(true)) {
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
            if (this.imgPath === null || this.imgPath === "") throw 'Bilder Path is null';
            if (this.id !== undefined && this.imgPath !== null || this.imgPath !== "") {
                switch (this.type) {
                    case "event":
                        data = await axios.get(process.env.baseImage + "/images?path=uploads/events/" + this.id + "/");
                        break;
                    case "news":
                        data = await axios.get(process.env.baseImage + "/images?path=uploads/news/" + this.id + "/");
                        break;
                    case "products":
                        data = await axios.get(process.env.baseImage + "/images?path=uploads/products/" + this.id + "/");
                        break;
                }
            }

            if (data.status < 400 && data.data.data !== null && data.data.date !== {}) {
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
        } catch (err) {
            this.images = null;
        }
    	console.log("End of Fetch Method: " + this.images + " \n Pfad zu den Bildern: " + this.imgPath);
    },
    fetchOnServer: false,
    watch: {
        images: function() {
            console.log("IMAGES UPDATED");
            this.imageGallery = this.images;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "gallery";
</style>
