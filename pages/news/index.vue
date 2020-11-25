<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="title col-3">
                News
            </div>
            <div class="svgGraphic">
                <img src="/animations/news.gif" alt="Nachrichtenstapel Animation">
            </div>
        </section>
        <section class="content flex flex-center">
            <div class="news" v-for="news1 in news" :key="nId">
                <card :title="news1.titel" :teaser="news1.anreiser" :image="news1.bilder_path + '/plakat.jpg'"
                      :id="news1.nId" news/>
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

        @media screen and (max-width: $breakpoint-medium-max) {
            margin-bottom: 10vh;
        }
    }

    .svgGraphic {
        transform: rotate(8deg);
        margin-top: 5vh;
        z-index: -99;

        @media screen and (max-width: $breakpoint-medium-max) {
            margin-left: 10vw;
            img {
                margin: 0 auto;
                width: 80vw;
            }
        }
    }

    .content {
        margin-top: 5vh;
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
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, text: "News", link:"/news"} });

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
    },
    head() {
        return {
            title: "News- OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                }
            ]
        }
    }
}
</script>