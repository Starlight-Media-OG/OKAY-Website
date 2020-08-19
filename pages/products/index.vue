<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center">
            <div class="title col-3">
                <p>Produkte</p>
            </div>
            <div class="svgGraphic">
                <!-- TODO: Include Grahpic for News-->
            </div>
        </section>
        <section class="content">
            <div class="cards" v-for="product in products" :key="product.prodId">
                <product-card :imgPath="product.bilder_path + '/product.png'" :id="product.prodId" :preis="product.preis" :title="product.bezeichnung"/>
            </div>
            <div class="page">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>...</p>
                <p>10</p>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
    @import '../../assets/style/variable.scss';

    .page {
        @include font($flow-font-name, 3vh, $primary-yellow, bold);
        min-width: 40vw;
        display: flex;
        align-content: space-between;
        justify-content: space-between;
        margin-bottom: 2vh;

        p {
            display: inline;
        }
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
            this.products = [
                {
                    "prodId": "5f2aa8b9956c78a572cfd86c",
                    "preis": "141.5500",
                    "bilder_path": "img/HeinzKnapp",
                    "title": ""
                },
                {
                    "prodId": "5f2aa8b9a999d2ce01550687",
                    "preis": "168.3000",
                    "bilder_path": "img/HeinzKnapp",
                    "title": ""
                },
                {
                    "prodId": "5f2aa8b9879d2636b7c1bdbb",
                    "preis": "112.1600",
                    "bilder_path": "img/HeinzKnapp",
                    "title": ""
                },
                {
                    "prodId": "5f2aa8b9dedc94c0dfe692a3",
                    "preis": "28.7700",
                    "bilder_path": "img/HeinzKnapp",
                    "title": ""
                },
                {
                    "prodId": "5f2aa8b982732601e4b20cb3",
                    "preis": "69.0200",
                    "bilder_path": "img/HeinzKnapp",
                    "title": ""
                },
                {
                    "prodId": "5f2aa8b9dcb3be72afc2b4ea",
                    "preis": "151.7400",
                    "bilder_path": "img/HeinzKnapp",
                    "title": ""
                }
            ]
        }
    }
</script>