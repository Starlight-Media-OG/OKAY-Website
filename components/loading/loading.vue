<script setup>
import { useNuxtApp } from "nuxt/dist/app/nuxt";

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
    loading.value = true;
});
nuxtApp.hook("page:finish", () => {
    loading.value = false;
});
</script>

<template>
    <div v-if="loading" class="loading-page">
        <img src="/animations/Loading-Animation.gif" alt="Lade Animation" />
    </div>
</template>

<style scoped lang="scss">
.loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 200;

    img {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
}
</style>
