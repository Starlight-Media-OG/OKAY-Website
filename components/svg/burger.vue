<template>
    <svg id="Ebene_1" style="enable-background:new 0 0 28.4 28.4;" version="1.1" viewBox="0 0 28.4 28.4"
         x="0px" xml:space="preserve"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px">
        <path class="st0":class="{cross_left: menuActive}"
              d="M27.8,6.9H0.6C0.3,6.9,0,6.6,0,6.3s0.3-0.6,0.6-0.6h27.2c0.3,0,0.6,0.3,0.6,0.6S28.1,6.9,27.8,6.9z"/>
        <path class="st0" :class="{cross_right: menuActive}"
              d="M27.8,22.7H0.6c-0.3,0-0.6-0.3-0.6-0.6s0.3-0.6,0.6-0.6h27.2c0.3,0,0.6,0.3,0.6,0.6S28.1,22.7,27.8,22.7z"/>
        <path class="st0" :class="{cross_hide: menuActive}"
              d="M20.4,14.8h-20c-0.2,0-0.4-0.3-0.4-0.6s0.2-0.6,0.4-0.6h20c0.2,0,0.4,0.3,0.4,0.6S20.7,14.8,20.4,14.8z"/>
    </svg>
</template>

<script>
    export default {
        name: "burger",
        props: {
            menuActive: Boolean
        }
    }
</script>

<style lang="scss" scoped>
    .st0 {
        fill: #FFFFFF;
        opacity: 1;
        transition: all 1s;
    }

    .cross {
        transition: all 1s;
        &_left {
            transform: translateY(25%) translateX(-25%) rotate(45deg);
            transform-origin: center center;
        }
        &_right {
            transform:  translateX(-60%) translateY(0%) rotate(-45deg);
            transform-origin: center top;
        }
        &_hide {
            opacity: 0;
        }
    }
</style>