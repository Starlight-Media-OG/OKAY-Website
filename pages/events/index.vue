<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="title col-3">
                Events
            </div>
            <div class="svgGraphic">
                <img src="/animations/events.gif" alt="Events Animation">
            </div>
        </section>
        <section class="main flex flex-center">
            <div class="lastWeek flex flex-center">
                <h2 class="weekHeader">Letzter Monat</h2>
                <div class="row flex flex-center">
                    <div v-if="objectsLast.length !== 0" class="cards" v-for="event in objectsLast" :key="oaId">
                        <card :title="event.titel" :teaser="event.beschreibung"
                              :image="event.bilder_path + '/plakat.jpg'"
                              :date="event.start_datum" :endDate="event.ende_Datum" :id="event.oaId" events/>
                    </div>
                    <div class="noEvent" v-else>
                        <h5>In dieser Woche finden keine Event statt</h5>
                    </div>
                </div>
            </div>
            <div class="thisWeek flex flex-center">
                <h2 class="weekHeader">Dieser Monat</h2>
                <div class="row flex flex-center">
                    <div class="cards" v-for="event in objectsCurrent" :key="oaId" v-if="objectsCurrent.length !== 0">
                        <card :title="event.titel" :teaser="event.beschreibung"
                              :image="event.bilder_path + '/plakat.jpg'"
                              :date="event.start_datum" :endDate="event.ende_Datum" :id="event.oaId" events/>
                    </div>
                    <div class="noEvent" v-else>
                        <h5>In dieser Woche finden keine Event statt</h5>
                    </div>
                </div>
            </div>
            <div class="nextWeek flex flex-center">
                <h2 class="weekHeader">Nächster Monat</h2>
                <div class="row flex flex-center">
                    <div class="cards" v-for="event in objectsNext" :key="oaId" v-if="objectsNext.length !== 0">
                        <card :title="event.titel" :teaser="event.beschreibung"
                              :image="event.bilder_path + '/plakat.jpg'"
                              :date="event.start_datum" :endDate="event.ende_Datum" :id="event.oaId" events/>
                    </div>
                    <div class="noEvent" v-else>
                        <h5>In dieser Woche finden keine Event statt</h5>
                    </div>
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
    overflow: hidden;

    .header {
        margin-left: -20vw;
        transform: rotate(-8deg);
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
}

.weekHeader {
    margin-top: 5vh;
    margin-bottom: 2vh;

    @media screen and (max-width: $breakpoint-medium-max) {
        margin-bottom: 10vh;
        margin-top: -10vh;

        &:first-child {
            margin-top: 5vh;
        }
    }
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
                if (new Date(value.start_datum).getMonth() === new Date().getMonth()) {
                    this.objectsCurrent.push(value);
                } else if (new Date(value.start_datum).getMonth() === new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).getMonth()) {
                    this.objectsLast.push(value);
                } else if (new Date(value.start_datum).getMonth() === new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).getMonth()) {
                    this.objectsNext.push(value);
                }
            });
        }
    },
    async fetch() {
        //TODO: Insert DB Function to fetch Objects with currentDate week Before and After

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
                "start_datum": new Date(Date.now() - (31 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
                "oaId": 1022
            },
            {
                "titel": "Heinz Knapp",
                "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                "bilder_path": "img/HeinzKnapp",
                "start_datum": new Date(Date.now() + (31 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
                "oaId": 1023
            }
        ];

        this.sortEvents(events);
    },
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, text: "Events", link:"/events"} });
    },
    head() {
        return {
            title: "Events - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: "description",
                    content: "Hier werden alle aktuellen Events angezeigt, welche vom OKAY Verein organisisert werden."
                },
                {
                    name: "keywords",
                    content: "OKAY, Verein, Events, KIZ, Ausstellung, Gallerie, Konzert"
                },
            ]
        }
    },
}
</script>