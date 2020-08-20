<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="col-3 title">
                Produkte
            </div>
            <div class="svgGraphic">
                <!-- TODO: Include Grahpic for News-->
            </div>
        </section>
        <section class="content">
            <div class="cards flexWrap" v-for="product in products" :key="product.prodId">
                <product-card :imgPath="product.bilder_path + '/plakat.jpg'" :id="product.prodId" :preis="product.preis" :title="product.bezeichnung" />
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

    main {
        $header-height: 40vh;
        .row-12

    {
        height: 100vh;
    }

    .header {
        height: $header-height;
        margin-left: -20vw;
        transform: rotate(-8deg);
    }

    .svgGraphic {
        height: calc(100vh - #{$header-height});
    }

    .page {
        @include font($flow-font-name, 3vh, $primary-yellow, bold);
        min-width: 40vw;
        display: flex;
        align-content: space-between;
        justify-content: space-between;
        margin-bottom: 2vh;
        p

    {
        display: inline;
    }

    }
    }

    .page {
        @include font($flow-font-name, 3vh, $primary-yellow, bold);
        min-width: 40vw;
        display: flex;
        align-content: space-between;
        justify-content: space-between;
        margin-bottom: 2vh;
        p

    {
        display: inline;
    }

    }

    .content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-items: center;
        width: $width;
    }

    .flexWrap {
        flex: 1 1 calc(#{$width}/4);
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
            this.products = [
                {
                    "prodId": "5f2aa8b9956c78a572cfd86c",
                    "preis": "141",
                    "bilder_path": "img/HeinzKnapp",
                    "bezeichnung": "Buch Ybbs"
                },
                {
                    "prodId": "5f2aa8b9a999d2ce01550687",
                    "preis": "168",
                    "bilder_path": "img/HeinzKnapp",
                    "bezeichnung": "Buch Ybbs"
                },
                {
                    "prodId": "5f2aa8b9879d2636b7c1bdbb",
                    "preis": "112",
                    "bilder_path": "img/HeinzKnapp",
                    "bezeichnung": "Buch Ybbs"
                },
                {
                    "prodId": "5f2aa8b9dedc94c0dfe692a3",
                    "preis": "28",
                    "bilder_path": "img/HeinzKnapp",
                    "bezeichnung": "Buch Ybbs"
                },
                {
                    "prodId": "5f2aa8b982732601e4b20cb3",
                    "preis": "69",
                    "bilder_path": "img/HeinzKnapp",
                    "bezeichnung": "Buch Ybbs"
                },
                {
                    "prodId": "5f2aa8b9dcb3be72afc2b4ea",
                    "preis": "151",
                    "bilder_path": "img/HeinzKnapp",
                    "bezeichnung": "Buch Ybbs"
                }
            ]
        }
    }
</script>