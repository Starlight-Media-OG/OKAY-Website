<template>
    <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 28.4 28.4" style="enable-background:new 0 0 28.4 28.4;" xml:space="preserve">
<path class="st0" d="M0.1,19.5L12,9.6c1.2-1,3.1-1,4.3,0l11.9,9.9c0.3,0.2,0,0.6-0.3,0.5l-12.7-4.2c-0.7-0.2-1.4-0.2-2.1,0L0.4,20C0.1,20.1-0.1,19.7,0.1,19.5z" v-if="direction === 'top'" />



<path class="bst0 left" d="M0.1,19.5L12,9.6c1.2-1,3.1-1,4.3,0l11.9,9.9c0.3,0.2,0,0.6-0.3,0.5l-12.7-4.2c-0.7-0.2-1.4-0.2-2.1,0L0.4,20C0.1,20.1-0.1,19.7,0.1,19.5z" v-if="direction === 'left'" />



<path class="bst0 right" d="M0.1,19.5L12,9.6c1.2-1,3.1-1,4.3,0l11.9,9.9c0.3,0.2,0,0.6-0.3,0.5l-12.7-4.2c-0.7-0.2-1.4-0.2-2.1,0L0.4,20C0.1,20.1-0.1,19.7,0.1,19.5z" v-if="direction === 'right'" />



<path class="st0 bottom" d="M0.1,19.5L12,9.6c1.2-1,3.1-1,4.3,0l11.9,9.9c0.3,0.2,0,0.6-0.3,0.5l-12.7-4.2c-0.7-0.2-1.4-0.2-2.1,0L0.4,20C0.1,20.1-0.1,19.7,0.1,19.5z" v-if="direction === 'bottom'" />



</svg>

</template>

<script>
    export default {
        name: "arrow",
        props: {
            direction: String
        }
    }
</script>

<style scoped>
    .st0 {
        fill: #ffd324;
    }

    .st1 {
        fill: #ffd324;
        stroke: #000000;
        stroke-width: 0.8433;
        stroke-miterlimit: 10;
    }

    .st2 {
        fill: #ffd324;
        stroke: #000000;
        stroke-width: 1.8974;
        stroke-miterlimit: 10;
    }

    .st3 {
        fill: #ffd324;
        stroke: #000000;
        stroke-width: 0.7014;
        stroke-miterlimit: 10;
    }

    .bst0 {
        fill: #003865;
    }

    .bst1 {
        fill: #003865;
        stroke: #000000;
        stroke-width: 0.8433;
        stroke-miterlimit: 10;
    }

    .bst2 {
        fill: #003865;
        stroke: #000000;
        stroke-width: 1.8974;
        stroke-miterlimit: 10;
    }

    .bst3 {
        fill: #003865;
        stroke: #000000;
        stroke-width: 0.7014;
        stroke-miterlimit: 10;
    }

    .left {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
    }

    .right {
        transform: rotate(90deg);
        transform-origin: 50% 50%;
    }

    .bottom {
        transform: rotate(180deg);
        transform-origin: 50% 50%;
    }
</style>