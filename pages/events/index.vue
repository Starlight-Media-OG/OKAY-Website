<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

useHead({
    title: "Events - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "description",
            content:
                "Hier werden alle aktuellen Events angezeigt, welche vom OKAY Verein organisisert werden.",
        },
        {
            name: "keywords",
            content:
                "OKAY, Verein, Events, KIZ, Ausstellung, Gallerie, Konzert",
        },
    ],
});

let objectsCurrent = ref([]);
let objectsNext = ref([]);
let objectsOther = ref([]);

await useFetch(useRuntimeConfig().public.baseURL + "/events").then((res) => {
    if (!res.data.value) {
        return;
    }
    sortEvents(res.data.value);
});

function sortEvents(arr) {
    const currentDate = new Date(Date.now());
    for (const item of arr) {
        if (
            new Date(item.end_datum).getMonth() >= currentDate.getMonth() &&
            new Date(item.start_datum).getMonth() <= currentDate.getMonth()
        ) {
            objectsCurrent.value.push(item);
        } else if (
            new Date(item.start_datum).getMonth() ===
            new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).getMonth()
        ) {
            objectsNext.value.push(item);
        } else {
            objectsOther.value.push(item);
        }
    }
}

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({ step: 1, text: "Startseite", link: "/" });
breadcrumbStore.addBreadcrumb({ step: 2, text: "Events", link: "/events" });
</script>

<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="svgGraphic">
                <img src="/animations/events.gif" alt="Events Animation" />
            </div>
            <div class="flex-break"></div>
            <div class="title">
                <h1>Events</h1>
            </div>
            <div class="flex-break"></div>
        </section>
        <section class="main flex flex-center">
            <div class="link center marginTopSmall">
                <nuxt-link to="/calender" class="further-link"
                    ><em class="underline"
                        >Alle Events im Kalender anzeigen</em
                    ></nuxt-link
                >
            </div>
            <div class="area">
                <div class="thisWeek flex flex-center">
                    <h2 class="weekHeader">Aktueller Monat</h2>
                    <div class="row flex flex-center">
                        <div
                            class="cards"
                            v-for="event in objectsCurrent"
                            :key="event.oaID"
                            v-if="objectsCurrent.length !== 0"
                        >
                            <card
                                :title="event.titel"
                                :teaser="event.beschreibung"
                                :image="event.bilder_path + '/plakat.jpg'"
                                :date="event.start_datum"
                                :endDate="event.end_datum"
                                :id="event.oaId"
                                events
                            />
                        </div>
                        <div class="noEvent" v-else>
                            <h5>In diesem Monat finden keine Events statt</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="area">
                <div class="nextWeek flex flex-center">
                    <h2 class="weekHeader">Nächster Monat</h2>
                    <div class="row flex flex-center">
                        <div
                            class="cards"
                            v-for="event in objectsNext"
                            :key="event.oaId"
                            v-if="objectsNext.length !== 0"
                        >
                            <card
                                :title="event.titel"
                                :teaser="event.beschreibung"
                                :image="event.bilder_path + '/plakat.jpg'"
                                :date="event.start_datum"
                                :endDate="event.end_datum"
                                :id="event.oaId"
                                events
                            />
                        </div>
                        <div class="noEvent" v-else>
                            <h5>In diesem Monat finden keine Events statt</h5>
                        </div>
                    </div>
                </div>
                <div class="link center">
                    <nuxt-link to="/calender" class="further-link"
                        ><em class="underline">Zum Kalender</em></nuxt-link
                    >
                </div>
            </div>
            <div class="area">
                <div class="lastWeek flex flex-center">
                    <h2 class="weekHeader">Alle Events</h2>
                    <div class="row flex flex-center">
                        <div
                            v-if="objectsOther.length !== 0"
                            class="cards"
                            v-for="event in objectsOther"
                            :key="event.oaId"
                        >
                            <card
                                :title="event.titel"
                                :teaser="event.beschreibung"
                                :image="event.bilder_path + '/plakat.jpg'"
                                :date="event.start_datum"
                                :endDate="event.end_datum"
                                :id="event.oaId"
                                events
                            />
                        </div>
                        <div class="noEvent" v-else>
                            <h5>Es gibt noch keine anderen Events</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/style/variable.scss";

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

.area {
    .noEvent  {
        margin-bottom: 5vh;
        color: white;
        font-family: $flow-font-name;
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
            font-size: 0.75rem;
        }
    }
}
</style>
