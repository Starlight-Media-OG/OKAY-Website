<script setup>
const loc = ref(false);
const news = ref(false);

const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const modalToggle = () => {
    loc.value = !loc.value;
};

const showNewsletter = () => {
    news.value = !news.value;
};
</script>

<template>
    <footer class="footer flex flex-center">
        <div class="scrollTop flex flex-center" @click="scrollTop">
            <SvgArrow class="arrow" direction="top" />
        </div>
        <div class="navigation flex flex-center v-space-between">
            <div class="row facebook" style="height: 50px">
                <a href="https://www.facebook.com/okay.ybbs/" target="_blank">
                    <SvgFb />
                </a>
            </div>
            <div class="first-row space-between">
                <nuxt-link to="/" class="footer-nav"> Home </nuxt-link>
                <nuxt-link to="/news" class="footer-nav"> News </nuxt-link>
                <nuxt-link to="/events" class="footer-nav"> Events </nuxt-link>
                <nuxt-link to="/calender" class="footer-nav">
                    Kalender
                </nuxt-link>
                <nuxt-link to="/products" class="footer-nav">
                    Produkte
                </nuxt-link>
                <nuxt-link to="/information" class="footer-nav">
                    Über OKAY
                </nuxt-link>
            </div>
            <div class="second-row space-between">
                <nuxt-link to="/dsgvo" class="footer-nav-2">
                    Datenschutz
                </nuxt-link>
                <a class="footer-nav-2" @click="modalToggle()">Wo sind wir</a>
                <a class="footer-nav-2" @click="showNewsletter()">Newsletter</a>
                <nuxt-link to="/impressum" class="footer-nav-2">
                    Impressum
                </nuxt-link>
            </div>
            <div class="row copyright flex flex-center">
                <p class="row text-center logo name">Offene Kultur aus Ybbs</p>
                <p class="row text-center copyright-text">
                    &copy; Copyright 2021 -
                    {{ new Date().getFullYear() }} okay-ybbs.at
                </p>
                <p class="row text-center copyright-text">
                    Alle Rechte vorbehalten
                </p>
            </div>
        </div>

        <div class="modal flex flex-center" v-if="loc">
            <div class="content flex flex-center">
                <div class="close row" @click="modalToggle()">x</div>
                <div class="location row">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.4865047943445!2d15.081797615838893!3d48.17797715632491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477243125e8fe727%3A0xfb655a4c282044b3!2sHerrengasse%2015%2C%203370%20Ybbs%20an%20der%20Donau!5e0!3m2!1sde!2sat!4v1606489095766!5m2!1sde!2sat"
                        frameborder="0"
                        style="border: 0; height: 100%; width: 100%"
                        allowfullscreen=""
                        aria-hidden="false"
                        tabindex="0"
                    ></iframe>
                </div>
            </div>
        </div>

        <NewsletterPopupNewsletterPopUp
            :show="news"
            @toggle:show="() => (news = !news)"
        />
    </footer>
</template>

<style scoped lang="scss">
@import "../assets/style/components/footer";
</style>
