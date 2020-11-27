<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="col-3 title">
                Produkte
            </div>
            <div class="svgGraphic">
                <img src="/animations/products.gif" alt="Buch Animation">
            </div>
        </section>
        <section class="content">
            <div class="cards flexWrap" v-for="product in products" :key="product.prodId">
                <product-card :imgPath="product.bilder_path + '/plakat.jpg'" :id="product.prodId" :preis="product.preis"
                              :title="product.bezeichnung"/>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

main {
    overflow: hidden;

    .header {
        margin-left: -20vw;
        transform: rotate(-8deg);
    }

    .svgGraphic {
        margin-top: 5vh;
        transform: rotate(8deg);
        margin-left: 20vw;
        z-index: -99;

        @media screen and (max-width: $breakpoint-medium-max) {
            margin-left: 10vw;
            img {
                margin: 0 auto;
                width: 80vw;
            }
        }
    }
}

.content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-items: center;
    width: $width;
    margin-top: 15vh;
}

.flexWrap {
    flex: 1 1 calc(#{$width} / 4);
    margin-left: 5vw;
}
</style>

<script>
import productCard from "~/components/productCard";

export default {
    name: "indexProducts",
    components: {
        productCard
    },
    data() {
        return {
            products: []
        }
    }, created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:2, text:"Produkte", link:"/products"} });

        this.products = [
            {
                "prodId": "5f2aa8b9956c78a572cfd86c",
                "preis": "141",
                "bilder_path": "/img/HeinzKnapp",
                "bezeichnung": "Buch Ybbs"
            },
            {
                "prodId": "5f2aa8b9a999d2ce01550687",
                "preis": "168",
                "bilder_path": "/img/HeinzKnapp",
                "bezeichnung": "Buch Ybbs"
            },
            {
                "prodId": "5f2aa8b9879d2636b7c1bdbb",
                "preis": "112",
                "bilder_path": "/img/HeinzKnapp",
                "bezeichnung": "Buch Ybbs"
            },
            {
                "prodId": "5f2aa8b9dedc94c0dfe692a3",
                "preis": "28",
                "bilder_path": "/img/HeinzKnapp",
                "bezeichnung": "Buch Ybbs"
            },
            {
                "prodId": "5f2aa8b982732601e4b20cb3",
                "preis": "69",
                "bilder_path": "/img/HeinzKnapp",
                "bezeichnung": "Buch Ybbs"
            },
            {
                "prodId": "5f2aa8b9dcb3be72afc2b4ea",
                "preis": "151",
                "bilder_path": "/img/HeinzKnapp",
                "bezeichnung": "Buch Ybbs"
            }
        ]
    },
    head() {
        return {
            title: "Produkte - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: "description",
                    content: "Alle Produkte werden hier angezeigt, zu diesen zählen hauptsächlich Bücher"
                },
                {
                    name: "keywords",
                    content: "Bücher"
                }
            ]
        }
    }
}
</script>