<template>
    <svg id="Ebene_1" style="enable-background:new 0 0 28.4 28.4;" version="1.1" viewBox="0 0 28.4 28.4"
         x="0px" xml:space="preserve"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px">

        <g>
	        <path class="st0" :class="{cross_left: menuActive}"
                  d="M27.8,6.9H0.6C0.3,6.9,0,6.6,0,6.3s0.3-0.6,0.6-0.6h27.2c0.3,0,0.6,0.3,0.6,0.6S28.1,6.9,27.8,6.9z"/>
            <path class="st0" :class="{cross_right: menuActive}"
                  d="M27.8,22.7H0.6c-0.3,0-0.6-0.3-0.6-0.6s0.3-0.6,0.6-0.6h27.2c0.3,0,0.6,0.3,0.6,0.6S28.1,22.7,27.8,22.7z" />
        </g>

        <g>
            <path class="st0" :class="{cross_hide: menuActive}"
                  d="M6.1,10.7h0.5v7H6V12l-2.5,4.7H3.1L0.6,12l0,5.8H0v-7h0.5l2.8,5.3L6.1,10.7z" />
            <path class="st0" :class="{cross_hide: menuActive}"
                  d="M7.7,17.8v-7h4.3v0.5H8.3v2.7h3.5v0.5H8.3v2.8h3.7v0.5H7.7z" />
            <path class="st0" :class="{cross_hide: menuActive}"
                  d="M18.2,10.7h0.6v7h-0.5l-4.5-6v6h-0.6v-7h0.5l4.5,6V10.7z" />
            <path class="st0" :class="{cross_hide: menuActive}"
                  d="M20.6,17.2c-0.5-0.5-0.7-1.2-0.7-2.1v-4.3h0.6v4.4c0,1.5,0.7,2.2,2.1,2.2c0.7,0,1.2-0.2,1.6-0.5
                  c0.4-0.4,0.5-0.9,0.5-1.6v-4.4h0.6v4.3c0,0.9-0.2,1.6-0.7,2.1c-0.5,0.5-1.1,0.7-2,0.7C21.7,17.9,21,17.6,20.6,17.2z M21.4,9h0.8
                  v0.7h-0.8V9z M23.1,9h0.8v0.7h-0.8V9z" />
        </g>
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