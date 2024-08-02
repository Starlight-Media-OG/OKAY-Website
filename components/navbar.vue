<script setup>
import { useMenuStore } from "~/store/menu.store";
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

const menuStore = useMenuStore();
const breadcrumbStore = useBreadcrumbStore();
const router = useRouter();

function toggleMenu() {
    menuStore.toggleMenu();
}

function hideMenu() {
    menuStore.hideMenu();
}

function pushToLink(link) {
    router.push(link);
}
</script>

<template>
    <header>
        <nav
            :class="{
                navigationExt: menuStore.menuActive,
                navigation: !menuStore.menuActive,
            }"
            @click="toggleMenu()"
        >
            <div class="burger">
                <div class="burger-icon">
                    <SvgBurger :menuActive="menuStore.menuActive" />
                </div>
            </div>
            <div
                class="navigation-Text"
                :class="{ navigationTextExt: menuStore.menuActive }"
            >
                <nuxt-link to="/" class="navigation-link" exact>
                    <p>Home</p>
                </nuxt-link>
                <nuxt-link to="/events" class="navigation-link">
                    <p>Events</p>
                </nuxt-link>
                <nuxt-link to="/calender" class="navigation-link">
                    <p>Kalender</p>
                </nuxt-link>
                <nuxt-link to="/news" class="navigation-link">
                    <p>News</p>
                </nuxt-link>
                <nuxt-link to="/products" class="navigation-link">
                    <p>Produkte</p>
                </nuxt-link>
                <nuxt-link to="/information" class="navigation-link">
                    <p>Über OKAY</p>
                </nuxt-link>
                <a
                    href="https://www.facebook.com/okay.ybbs/"
                    class="navigation-link"
                >
                    <p>Facebook</p>
                </a>
            </div>
        </nav>
        <div class="logo">
            <nuxt-link to="/">
                <SvgLogo big="true" aria-label="Offene Kultur Aus Ybbs" />
            </nuxt-link>
        </div>
        <div class="bg" @click="hideMenu()" v-if="menuStore.menuActive"></div>

        <div class="breadcrumbs" v-if="breadcrumbStore.steps !== 1">
            <ul class="breadcrumbs-list">
                <li
                    v-for="item in breadcrumbStore.items"
                    class="breadcrumbs-list-item"
                    @click="pushToLink(item.link)"
                    :key="item.text"
                >
                    <p class="text-item">{{ item.text }}</p>
                </li>
            </ul>
        </div>
    </header>
</template>

<style scoped lang="scss">
@import "../assets/style/variable";

@media screen and (max-width: $breakpoint-medium-max), handheld {
    @import "../assets/style/components/navbar-Mobile.scss";
}

@media screen and (min-width: $breakpoint-large) {
    @import "../assets/style/components/navbar.scss";
}
</style>
