<script setup>
let ie = ref(false);

onMounted(() => {
    if (
        window.navigator.userAgent.indexOf("MSIE") != -1 ||
        !!navigator.userAgent.match(/Trident.*rv\:11\./)
    ) {
        ie.value = true;
    }
});
</script>

<template>
    <div v-if="!ie">
        <navbar class="nav" />
        <slot />
        <foot class="foot" />
    </div>
    <div v-else-if="ie" class="flex flex-center">
        <main class="flex flex-center" style="width: 80vw; height: 100vh">
            <h4
                class="row flex flex-center"
                style="
                    font-size: 2rem;
                    font-family: &quot;Source Serif Pro&quot;, serif;
                "
            >
                Wir unterstützen den Internet Explorer nicht mehr!
            </h4>
            <p
                class="row flex flex-center"
                style="
                    font-family: 'Nunito Sans', sans-serif;
                    text-align: center;
                "
            >
                Da der Internet Explorer ab dem 15. Juni 2022 auch von Microsoft
                nicht mehr unterstützt wird, bitten wir Sie auf einen anderen
                Browser zu wechseln, dadurch können Sie unsere Webseite im
                vollem Ausmaß bestaunen.
            </p>
            <div class="link center" style="margin-top: 5vh">
                <a
                    href="microsoft-edge:http://okay-ybbs.at"
                    class="further-link"
                >
                    <em class="underline">Ab zum Microsoft Edge</em>
                </a>
            </div>
        </main>
    </div>
</template>

<style lang="scss">
@import "../assets/style/variable.scss";

@media screen and (max-width: $breakpoint-small-max), handheld {
    @import "../assets/style/style-Mobile.scss";
}

@media screen and (min-width: $breakpoint-medium) and (max-width: $breakpoint-large-max) {
    @import "../assets/style/style-Tablet.scss";
}

@media screen and (min-width: $breakpoint-xlarge) {
    @import "../assets/style/style-PC.scss";
}

@media print {
    .nav,
    .foot {
        display: none;
    }
}
</style>
