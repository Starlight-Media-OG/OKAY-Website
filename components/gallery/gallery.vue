<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRuntimeConfig, useFetch } from '#app';

const props = defineProps({
    imgPath: String,
    id: String,
    type: String,
});

const selectedImage = ref('');
const imageGallery = ref([]);

const isImage = (path) => {
    return ['.jpg', '.jpeg', '.bmp', '.png', '.svg', '.ico', '.gif'].some(ext => path.includes(ext));
};

const isVideo = (path) => {
    return ['.mov', '.avi', '.mp4'].some(ext => path.includes(ext));
};

const fetchImages = async () => {
    const config = useRuntimeConfig();
    let url = '';

    if (!props.imgPath) throw 'Bilder Path is null';
    if (props.id && props.imgPath) {
        switch (props.type) {
            case 'event':
                url = `${config.public.baseImage}/images?path=uploads/events/${props.id}/`;
                break;
            case 'news':
                url = `${config.public.baseImage}/images?path=uploads/news/${props.id}/`;
                break;
            case 'products':
                url = `${config.public.baseImage}/images?path=uploads/products/${props.id}/`;
                break;
        }
    }

    const { data, error } = await useFetch(url);

    if (error.value) {
        imageGallery.value = null;
    } else {
        const tmp = 'uploads';
        const images = data.value.data.map(item => config.public.baseImage + item.replace(tmp, ''));
        console.log(images);
        imageGallery.value = images;
        selectedImage.value = images[0];
    }
};

onMounted(fetchImages);
</script>

<template>
    <div>
        <div v-if="imageGallery == null" class="gallery flex flex-center">
            <div class="slider flex flex-center row error">
                Es sind noch keine Bilder hinzugefügt worden!
            </div>
        </div>
        <div v-else class="gallery flex flex-center">
            <div class="slider flex flex-center row">
                <div class="row">
                    <div
                        v-for="(image, index) in imageGallery"
                        :key="index"
                        class="col flex flex-center"
                    >
                        <img
                            v-if="isImage(image)"
                            :src="image"
                            alt="Bild von der Ausstellung"
                            @click="selectedImage = image"
                        />
                        <video
                            v-if="isVideo(image)"
                            :src="image"
                            @click="selectedImage = image"
                        ></video>
                    </div>
                </div>
            </div>
            <div class="preview flex flex-center">
                <img
                    v-if="isImage(selectedImage)"
                    :src="selectedImage"
                    alt="Preview Image of Slider"
                    class="image"
                />
                <video
                    v-if="isVideo(selectedImage)"
                    :src="selectedImage"
                    class="image"
                    controls
                ></video>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "gallery";
</style>