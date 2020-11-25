<template>
<div v-if="loading" class="loading-page">
    <img src="/animations/Loading-Animation.gif" alt="Lade Animation">
</div>
</template>

<script>
export default {
    name: "loading",
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
}
</script>

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