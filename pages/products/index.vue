<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

useHead({
    title: "Produkte - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "description",
            content:
                "Alle Produkte werden hier angezeigt, zu diesen zählen hauptsächlich Bücher",
        },
        {
            name: "keywords",
            content: "Bücher, Shop, Produkte",
        },
    ],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({
    step: 1,
    text: "Startseite",
    link: "/",
});
breadcrumbStore.addBreadcrumb({
    step: 2,
    text: "Produkte",
    link: "/products",
});

const { data: products } = await useFetch(`${useRuntimeConfig().public.baseURL}/produkte`);
const defaultImage = useRuntimeConfig().public.defaultImage;
</script>

<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="svgGraphic">
                <img src="/animations/products.gif" alt="Buch Animation" />
            </div>
            <div class="flex-break"></div>
            <div class="title">
                <h1>Produkte</h1>
            </div>
        </section>
        <section class="content" style="margin-left: auto; margin-right: auto">
            <div
                class="cards flexWrap"
                v-for="product in products"
                :key="product.prodId"
            >
                <product-card
                    :imgPath="
                        product.bilder_path == null
                            ? defaultImage
                            : product.bilder_path + '/plakat.jpg'
                    "
                    :id="product.prodId"
                    :preis="product.preis"
                    :title="product.bezeichnung"
                />
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/style/variable.scss";

main {
    overflow: hidden;

    .header {
        z-index: -98;

        h1 {
            font-size: 20vh;

            @media screen and (max-width: $breakpoint-medium-max) {
                font-size: 10vh;
            }
        }
    }

    .svgGraphic {
        margin-top: 5vh;
        z-index: -99;

        @media screen and (max-width: $breakpoint-medium-max) {
            display: none;
        }
    }
}

.content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-items: center;
    width: $width;
    margin-top: 20vh;
}

.flexWrap {
    @media screen and (min-width: $breakpoint-medium-max) {
        width: calc(#{$width} / 4);
        margin-left: 5vw;
    }
    width: $width;
}
</style>
