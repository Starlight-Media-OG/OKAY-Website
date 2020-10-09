<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center">
            <div class="title col-3">
                <p>Offene</p>
                <p>Kultur</p>
                <p class="vertical opacity-50">Aus</p>
                <p>Ybbs</p>
            </div>
            <div class="image col-6">
                <img src="../static/img/title.png" alt="Mona Lisa im Bilderahmen" width="100%">
            </div>
            <div class="flex flex-center arrow-super">
                <div class="arrow flex flex-center" @click="scrollTo('#scroll')">
                    <arrow direction="bottom" class="arrow-bottom" />
                </div>
            </div>
        </section>
        <section>
            <div class="events" id="scroll">
                <h2>Events</h2>
                <div class="singleEvents" v-for="event of events" :key="event.oaId">
                    <card :title="event.titel" :teaser="event.beschreibung" :image="event.bilder_path + '/plakat.jpg'" :date="event.start_datum" :endDate="event.ende_Datum" :id="event.oaId"/>
                </div>
                <div class="link center">
                    <nuxt-link to="/events" class="further-link"><em class="underline">Zu den Events</em></nuxt-link>
                </div>
            </div>
            <div class="news">
                <h2>News</h2>
                <div class="singleNews" v-for="news1 of news" :key="news1.nId">
                    <card :title="news1.titel" :teaser="news1.anreiser" :image="news1.bilder_path + '/plakat.jpg'" :id="news1.nId"/>
                </div>
                <div class="link center">
                    <nuxt-link to="/news" class="further-link"><em class="underline">Zu den News</em></nuxt-link>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
    @import "../assets/style/variable.scss";

    .arrow {
        z-index: 99;
        background-color: $primary-blue;
        width: 5vw;
        height: 5vw;
        border-radius: 20px;
    }

    .arrow-bottom {
        width: 80%;
        height: 80%;
        cursor: pointer;
    }

    .arrow-super {
        width: 100vw;
        height: 10vh;
        position: absolute;
        right: 25vw;
        bottom: 5vh;
        animation: jump 1s infinite alternate;
        z-index: 1;

      @media screen and (max-width: $breakpoint-medium-max) {
        display: none;
      }

    }

    @keyframes jump {
        0% {
            bottom: 5vh;
        }

        100% {
            bottom: 15vh;
        }
    }
</style>

<script>
    import card from "~/components/card.vue";
    import arrow from "~/components/svg/arrow.vue"

    export default {
        name: "index",
        components: {
            card, arrow
        },
        head() {
            return {
                title: "Startseite - OKAY Ybbs",
                meta: [
                    {
                        charset: 'utf-8'
                    }
                ]
            }
        },
        data() {
            return {
                events: Array,
                news: Array
            }
        },
        methods: {
            scrollTo: function (target) {
                var options = {
                    container: 'body',
                    easing: 'ease-in-out',
                    force: true,
                    cancelable: false,
                    x: false,
                    y: true
                }

                this.$scrollTo(target, 500, options)
            }
        },
        created() {
            this.$store.commit('breadcrumbs/clear');
            this.$store.commit('breadcrumbs/addPositionedBreadcrumb', {todo: {step: 1, newText: "Startseite", link: "/"}})

            //Fetch Data from DB via Middleware... Save in events and news Variable
            this.events = [
                {
                    "titel": "Heinz Knapp",
                    "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "start_datum": "21.Mai 2020",
                    "ende_Datum": "28.Mai 2020",
                    "oaId": 1020
                },
                {
                    "titel": "Heinz Knapp",
                    "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "start_datum": "21.Mai 2020",
                    "oaId": 1020
                },
                {
                    "titel": "Heinz Knapp",
                    "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "start_datum": "21.Mai 2020",
                    "oaId": 1020
                }
            ];
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
    }
</script>