<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="svgGraphic">
                <img src="/animations/events.gif" alt="Events Animation">
            </div>
            <div class="flex-break"></div>
            <div class="title">
                <h1>Events</h1>
            </div>
            <div class="flex-break"></div>
        </section>
        <section class="main flex flex-center">
            <div class="link center marginTopSmall">
                <nuxt-link to="/calender" class="further-link"><em class="underline">Alle Events im Kalender anzeigen</em></nuxt-link>
            </div>
            <div class="area">
                <div class="nextWeek flex flex-center">
                    <h2 class="weekHeader">Nächster Monat</h2>
                    <div class="row flex flex-center">
                        <div class="cards" v-for="event in objectsNext" :key="event.oaId" v-if="objectsNext.length !== 0">
                            <card :title="event.titel" :teaser="event.beschreibung"
                                :image="event.bilder_path + '/plakat.jpg'"
                                :date="event.start_datum" :endDate="event.end_datum" :id="event.oaId" events/>
                        </div>
                        <div class="noEvent" v-else>
                            <h5>In dieser Woche finden keine Events statt</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="area">
                <div class="thisWeek flex flex-center">
                    <h2 class="weekHeader">Aktueller Monat</h2>
                    <div class="row flex flex-center">
                        <div class="cards" v-for="event in objectsCurrent" :key="event.oaID" v-if="objectsCurrent.length !== 0">
                            <card :title="event.titel" :teaser="event.beschreibung"
                                :image="event.bilder_path + '/plakat.jpg'"
                                :date="event.start_datum" :endDate="event.end_datum" :id="event.oaId" events/>
                        </div>
                        <div class="noEvent" v-else>
                            <h5>In dieser Woche finden keine Events statt</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="area">
                <div class="lastWeek flex flex-center">
                    <h2 class="weekHeader">Letzter Monat</h2>
                    <div class="row flex flex-center">
                        <div v-if="objectsLast.length !== 0" class="cards" v-for="event in objectsLast" :key="event.oaId">
                            <card :title="event.titel" :teaser="event.beschreibung"
                                :image="event.bilder_path + '/plakat.jpg'"
                                :date="event.start_datum" :endDate="event.end_datum" :id="event.oaId" events/>
                        </div>
                        <div class="noEvent" v-else>
                            <h5>In dieser Woche finden keine Events statt</h5>
                        </div>
                    </div>
                </div>
                <div class="link center">
                    <nuxt-link to="/calender" class="further-link"><em class="underline">Zum Kalender</em></nuxt-link>
                </div>
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

        @media screen and (max-width: $breakpoint-medium-max) {
          margin-bottom: 10vh;
        }

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

.weekHeader {
    margin-top: 5vh;
    margin-bottom: 2vh;
    font-size: 5rem;

    @media screen and (max-width: $breakpoint-medium-max) {
        margin-bottom: 10vh;
        font-size: 2rem;
    }
}

.marginTopSmall {
    @media screen and (max-width: $breakpoint-medium-max) {
         margin-top: -7vh;

         .further-link {
             font-size: 1rem;
         }
    }
}
</style>

<script>
import card from "~/components/card.vue";
import axios from "axios";

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
        let req = await axios.get(process.env.baseURL + "/events");
        let events = req.data;

        this.events = events;

        this.sortEvents(events);
    },
    async mounted() {
        await this.$fetch();
        this.$nextTick(() => {
            this.$nuxt.$loading.finish();
        })
    },
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 1, text:"Startseite", link:"/"} });
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