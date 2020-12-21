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
                  d="M6.1,11H7v7.3H6l0-5.3l-2.2,4.1H3.1L1,13.1l0,5.2H0V11h0.9l2.6,5L6.1,11z" />
            <path class="st0" :class="{cross_hide: menuActive}"
                  d="M8.6,18.3V11h4.7v0.9H9.6v2.3h3.5v0.9H9.6v2.4h3.7v0.9H8.6z" />
            <path class="st0" :class="{cross_hide: menuActive}"
                  d="M19.8,11h1v7.3H20l-4.2-5.5v5.5h-1V11h0.8l4.2,5.5V11z" />
            <path class="st0" :class="{cross_hide: menuActive}"
                  d="M23.2,17.7c-0.5-0.5-0.8-1.2-0.8-2.2V11h1.1v4.5c0,0.7,0.2,1.2,0.5,1.5c0.3,0.3,0.8,0.5,1.4,0.5
		          c0.6,0,1.1-0.2,1.4-0.5c0.3-0.3,0.5-0.9,0.5-1.5V11h1.1v4.4c0,1-0.3,1.7-0.8,2.2c-0.5,0.5-1.2,0.8-2.2,0.8
		          C24.4,18.4,23.7,18.2,23.2,17.7z M23.9,9.1H25v1h-1.1V9.1z M25.8,9.1h1.1v1h-1.1V9.1z" />
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