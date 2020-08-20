<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title col-3">
                Events
            </div>
            <div class="svgGraphic">
                <!-- TODO: Include Grahpic for Events-->
            </div>
        </section>
        <section class="main flex flex-center">
            <div class="lastWeek flex flex-center">
                <h2 class="weekHeader">Letzte Woche</h2>
                <div v-if="objectsLast.length !== 0" class="cards" v-for="event in objectsLast" :key="oaId">
                    <card :title="event.titel" :teaser="event.beschreibung" :image="event.bilder_path + '/plakat.jpg'" :date="event.start_datum" :endDate="event.ende_Datum" :id="event.oaId" />
                </div>
                <div class="noEvent" v-else>
                    <h5>In dieser Woche finden keine Event statt</h5>
                </div>
            </div>
            <div class="thisWeek flex flex-center">
                <h2 class="weekHeader">Diese Woche</h2>
                <div class="cards" v-for="event in objectsCurrent" :key="oaId" v-if="objectsCurrent.length !== 0">
                    <card :title="event.titel" :teaser="event.beschreibung" :image="event.bilder_path + '/plakat.jpg'" :date="event.start_datum" :endDate="event.ende_Datum" :id="event.oaId" />
                </div>
                <div class="noEvent" v-else>
                    <h5>In dieser Woche finden keine Event statt</h5>
                </div>
            </div>
            <div class="nextWeek flex flex-center">
                <h2 class="weekHeader">Nächste Woche</h2>
                <div class="cards" v-for="event in objectsNext" :key="oaId" v-if="objectsNext.length !== 0">
                    <card :title="event.titel" :teaser="event.beschreibung" :image="event.bilder_path + '/plakat.jpg'" :date="event.start_datum" :endDate="event.ende_Datum" :id="event.oaId" />
                </div>
                <div class="noEvent" v-else>
                    <h5>In dieser Woche finden keine Event statt</h5>
                </div>
            </div>
            <div class="link center">
                <nuxt-link to="/calender" class="further-link"><em class="underline">Zum Kalender</em></nuxt-link>
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

        @media screen and (max-width: $breakpoint-medium-max) {
            margin-bottom: 20vh;
        }
    }

    .svgGraphic {
        height: calc(100vh - #{$header-height});

        @media screen and (max-width: $breakpoint-medium-max) {
            display: none;
        }
    }

    }

    .weekHeader {
        margin-bottom: 10vh;
    }
</style>

<script>
    import card from "~/components/card.vue";

    export default {
        name: "eventsIndex",
        data() {
            return {
                objectsCurrent: [],
                objectsLast: [],
                objectsNext: []
            }
        },
        components: {
            card
        },
        methods: {
            sortEvents: function (arr) {
                arr.forEach((value) => {
                    if (this.getWeek(new Date(value.start_datum)) === this.getWeek(new Date())) {
                        this.objectsCurrent.push(value);
                    } else if (this.getWeek(new Date(value.start_datum)) === this.getWeek(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))) {
                        this.objectsLast.push(value);
                    } else if (this.getWeek(new Date(value.start_datum)) === this.getWeek(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))) {
                        this.objectsNext.push(value);
                    }
                });
            },
            getWeek: function (dt) {
                const onejan = new Date(dt.getFullYear(), 0, 1);
                const today = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
                const dayOfYear = ((today - onejan + 86400000) / 86400000);
                return Math.ceil(dayOfYear / 7);
            }
        },
        async fetch() {
            //TODO: Insert DB Function to fetch Objects with currentDate week Before and After
            //let events = ...
            //this.sortEvents(events);
        },
        created() {
            let events = [
                {
                    "titel": "Heinz Knapp",
                    "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "start_datum": new Date(Date.now()).toLocaleDateString(),
                    "oaId": 1020
                },
                {
                    "titel": "Heinz Knapp",
                    "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "start_datum": new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
                    "oaId": 1022
                },
                {
                    "titel": "Heinz Knapp",
                    "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                    "bilder_path": "img/HeinzKnapp",
                    "start_datum": new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
                    "oaId": 1023
                }
            ];

            this.sortEvents(events);
        }
    }
</script>