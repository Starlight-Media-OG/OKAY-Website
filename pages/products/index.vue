<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="svgGraphic">
                <img src="/animations/products.gif" alt="Buch Animation">
            </div>
            <div class="flex-break"></div>
            <div class="title">
                <h1>Produkte</h1>
            </div>
        </section>
        <section class="content">
            <div class="cards flexWrap" v-for="product in products" :key="product.prodId">
                <product-card :imgPath="product.bilder_path == null ? defaultImage : product.bilder_path + '/plakat.jpg'" :id="product.prodId" :preis="product.preis"
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
    margin-top: 15vh;
}

.flexWrap {
    width: calc(#{$width} / 4);
    margin-left: 5vw;
}
</style>

<script>
import productCard from "~/components/productCard";
import axios from "axios";

export default {
    name: "indexProducts",
    components: {
        productCard
    },
    data() {
        return {
            products: [],
            defaultImage: process.env.defaultImage
        }
    }, created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:2, text:"Produkte", link:"/products"} });

        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });
    },
    async mounted() {
        await this.$fetch();

        this.$nextTick(() => {
            this.$nuxt.$loading.finish();
        });
    },
    async fetch() {
        let req = await axios.get(process.env.baseURL + "/produkte");
        let products = req.data;

        console.log(products)

        this.products = products;
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