<template>
    <nav>
        <div :class="{navigationExt: menuActive, navigation: !menuActive}">
            <div class="burger" @click="menuActive = !menuActive">
                <div class="burger-icon" >
                    <burger :menuActive="menuActive"/>
                </div>
            </div>
            <div class="navigation-Text" :class="{navigationTextExt: menuActive}">
                <nuxt-link to="/" class="navigation-link" exact><p>Home</p></nuxt-link>
                <nuxt-link to="/news" class="navigation-link"><p>News</p></nuxt-link>
                <nuxt-link to="/calender" class="navigation-link"><p>Kalender</p></nuxt-link>
                <nuxt-link to="/events" class="navigation-link"><p>Events</p></nuxt-link>
                <nuxt-link to="/products" class="navigation-link"><p>Produkte</p></nuxt-link>
                <nuxt-link to="/information" class="navigation-link"><p>Über OKAY</p></nuxt-link>
            </div>
        </div>
        <div class="logo">
            <nuxt-link to="/"><logo /></nuxt-link>
        </div>
    </nav>
</template>

<script>
    import burger from '~/components/svg/burger.vue';
    import logo from '~/components/svg/logo.vue';

    export default {
        name: "navbar",
        components: {
            burger, logo
        },
        data() {
            return {
                menuActive: false
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/style/variable';

    @media screen and (max-width: $breakpoint-medium-max), handheld {
        @import '../assets/style/components/navbar-Mobile.scss';
    }

    @media screen and (min-width: $breakpoint-large) {
        @import '../assets/style/components/navbar.scss';
    }
</style>