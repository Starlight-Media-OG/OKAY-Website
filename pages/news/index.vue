<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title col-3">
                <p>News</p>
            </div>
            <div class="svgGraphic">
                <!-- TODO: Include Grahpic for News-->
            </div>
        </section>
        <section class="content flex flex-center">
            <div class="news" v-for="news1 in news" :key="nId">
                <card :title="news1.titel" :teaser="news1.anreiser" :image="news1.bilder_path + '/plakat.jpg'" :id="news1.nId"/>
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

        .row-12 {
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

            p {
                display: inline;
            }
        }
    }
</style>

<script>
    import card from "~/components/card.vue";

    export default {
        name: "indexNews",
        components: {
          card
        },
        data() {
            return {
                news: []
            }
        },
        created() {
            this.news = [
                {
                    "titel": "Heinz Knapp",
                    "anreiser": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "nId": 1020
                },
                {
                    "titel": "Heinz Knapp",
                    "anreiser": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "nId": 1020
                },
                {
                    "titel": "Heinz Knapp",
                    "anreiser": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "nId": 1020
                }
            ]
        }
    }
</script>