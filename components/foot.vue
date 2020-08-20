<template>
    <footer class="footer flex flex-center">
        <div class="scrollTop" @click="scrollTop">
            <arrow class="arrow" direction="top" />
        </div>
        <div class="navigation flex flex-center v-space-between">
            <div class="facebook">
                <fb />
            </div>
            <div class="first-row space-between">
                <nuxt-link to="/" class="footer-nav">Home</nuxt-link>
                <nuxt-link to="/news" class="footer-nav">News</nuxt-link>
                <nuxt-link to="/events" class="footer-nav">Events</nuxt-link>
                <nuxt-link to="/calender" class="footer-nav">Kalender</nuxt-link>
                <nuxt-link to="/products" class="footer-nav">Produkte</nuxt-link>
                <nuxt-link to="/information" class="footer-nav">Über OKAY</nuxt-link>
            </div>
            <div class="second-row space-between">
                <a class="footer-nav-2">Datenschutz</a>
                <a class="footer-nav-2">Wo sind wir</a>
                <a class="footer-nav-2">Impressum</a>
            </div>
            <div class="copyright flex flex-center">
                <p class="row text-center logo"><logo /></p>
                <p class="row text-center logo name">Offene Kultur aus Ybbs</p>
                <p class="row text-center copyright-text">&copy; Copyright 2010 - 2017 okay-ybbs.at</p>
                <p class="row text-center copyright-text">Alle Rechte vorbehalten</p>
            </div>
        </div>
    </footer>
</template>

<script>
    import arrow from '~/components/svg/arrow.vue';
    import fb from '~/components/svg/fb.vue';
    import logo from '~/components/svg/logo.vue';

    export default {
        name: "foot",
        components: {
            arrow, fb, logo
        }, methods: {
            scrollTop: function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/style/components/footer';
</style>