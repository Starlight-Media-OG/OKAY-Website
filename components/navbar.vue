<template>
    <header>
        <nav :class="{navigationExt: menuActive, navigation: !menuActive}">
            <div class="burger" @click="toggleMenu">
                <div class="burger-icon">
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
        </nav>
        <div class="logo">
            <nuxt-link to="/">
                <logo/>
            </nuxt-link>
        </div>
        <div class="bg" @click="hideMenu" v-if="menuActive">
        </div>

        <div class="breadcrumbs" v-if="breadcrumbs !== 1">
            <ul class="breadcrumbs-list">
                <li v-for="item in breadcrumbsText" class="breadcrumbs-list-item">
                    <p class="text-item"><nuxt-link class="ignoreTag" :to="item.link">{{item.text}}</nuxt-link></p>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
import burger from '~/components/svg/burger.vue';
import logo from '~/components/svg/logo.vue';
import {mapGetters, mapMutations} from 'vuex';

export default {
    name: "navbar",
    components: {
        burger, logo
    },
    computed: mapGetters({
        menuActive: 'menu/get',
        breadcrumbs: 'breadcrumbs/getSteps',
        breadcrumbsText: 'breadcrumbs/get'
    }),
    methods: {
        ...mapMutations({
            toggleMenu: 'menu/toggle',
            hideMenu: 'menu/hide'
        })
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