<template>
    <footer class="footer flex flex-center">
        <div class="scrollTop flex flex-center" @click="scrollTop">
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
                <nuxt-link to="/dsgvo" class="footer-nav-2">Datenschtuz</nuxt-link>
                <a class="footer-nav-2" @click="modalToggle()">Wo sind wir</a>
                <nuxt-link to="/impressum" class="footer-nav-2">Impressum</nuxt-link>
            </div>
            <div class="copyright flex flex-center">
                <p class="row text-center logo"><logo /></p>
                <p class="row text-center logo name">Offene Kultur aus Ybbs</p>
                <p class="row text-center copyright-text">&copy; Copyright 2010 - 2017 okay-ybbs.at</p>
                <p class="row text-center copyright-text">Alle Rechte vorbehalten</p>
            </div>
        </div>

        <div class="modal flex flex-center" v-if="modal">
            <div class="content flex flex-center">
                <div class="close row" @click="modalToggle">
                    x
                </div>
                <div class="location row">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2237.182600328895!2d15.082669391312585!3d48.1782284178683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477243125aa481b3%3A0xc8f999996dfaa3b9!2sHerrengasse%2023%2C%203370%20Ybbs%20an%20der%20Donau!5e0!3m2!1sde!2sat!4v1598121958973!5m2!1sde!2sat" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0" class="frame"></iframe>
                </div>
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
            },
            modalToggle: function () {
                this.modal = !this.modal;
            }
        }, data() {
            return {
                modal: false
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/style/components/footer';
</style>