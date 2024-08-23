<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

useHead({
    title: "Impressum - OKAY Ybbs",
    meta: [
        {
            name: "description",
            content: "Das Impressum von OKAY Ybbs - Offene Kultur aus Ybbs",
        },
        {
            name: "keywords",
            content: "Impressum, Vereinssitz Ybbs,",
        },
    ],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({ step: 1, text: "Startseite", link: "/" });
breadcrumbStore.addBreadcrumb({
    step: 2,
    text: "Impressum",
    link: "/impressum",
});
</script>

<template>
    <div class="flex flex-center height-100">
        <div class="row">
            <div class="row header flex flex-center">
                <h1 class="title">Impressum</h1>
            </div>
            <h2>Verein Offene Kultur Aus Ybbs</h2>
            <ul class="noStyle" style="margin-bottom: 10vh">
                <li><strong>ZVR-Zl.:</strong> 391625836</li>
                <li>
                    <strong>Vereinssitz:</strong> Sandtorgasse 3, 3370 Ybbs an
                    der Donau
                </li>
                <li><strong>E-Mail: </strong>kulturverein@okay-ybbs.at</li>
                <li class="break">
                    <strong>Erstellung der Website: </strong>Philipp Dvorak
                </li>
                <li>
                    Dieser Webauftritt ist im Zusammenhang mit einer
                    Diplomarbeit der IT-HTL Ybbs/Donau errichtet worden
                </li>
                <li class="break">
                    Informationspflicht laut §5 E-Commerce Gesetz, §14
                    Unternehmensgesetzbuch, §63 Gewerbeordnung und
                    Offenlegungspflicht laut §25 Mediengesetz.
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../../assets/style/variable.scss";

.header {
    @include font($header-font-name, 3rem, white, bold);
    margin-bottom: 5vh;

    .title {
        @media screen and (max-width: $breakpoint-medium-max) {
            font-size: 2.5rem;
            margin-left: -5vw;
        }
    }
}

h2 {
    @include font($header-font-name, 2rem, white, 600);
    margin-bottom: 1rem;
}

p {
    @include font($flow-font-name, 1rem, white);
    margin-bottom: 1.5rem;
}

ul {
    @include font($flow-font-name, 1rem, white);

    .break {
        margin-top: 1rem;
    }
}

.height-100 {
    min-height: 100vh;
}
</style>
