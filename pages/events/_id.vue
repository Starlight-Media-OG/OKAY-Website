<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="$router.back()">
                    <em class="underline">
                        < Zurück zur Übersicht
                    </em>
                </p>
                <p v-for="titlePart in title" :style="{fontSize: sizeDetection, lineHeight: sizeDetection}">
                    {{ titlePart }}
                </p>
                <p class="date">
                    Ab {{ this.date }}
                </p>
                <p v-if="this.adresse != null" class="address">
                    {{ this.adresse }}
                </p>
                <p v-else class="address">
                    {{ this.projektpartner }}
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" alt="this.name" width="100%"/>
            </div>
        </section>
        <section id="content" class="content flex flex-center">
            <article class="beschreibung" style="padding: 1rem;width: 90%;">
                <div class="bes">
                    <h2>Beschreibung</h2>
                    {{ this.beschreibung }}
                </div>
                <div class="dateOpen">
                    <h2>Öffnungszeiten</h2>
                    <p v-for="day in days" :key="day.wochentag" class="opening flex flex-center">
                        Am {{ day.wochentag }} von {{ day.start_zeit }} bis {{ day.end_zeit }}
                    </p>
                </div>
            </article>
            <div class="link">
                <em class="underline">
                    <nuxt-link :to="concat('/images/', this.id)" class="further-link">Zu den Bildern</nuxt-link>
                </em>
            </div>
            <section class="commentBox flex flex-center">
                <commentBox :id="this.id"/>
            </section>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

main {
    overflow: hidden;
}

.date {
    @include font($header-font-name, 4rem, $primary-yellow, bold);
    line-height: 4rem;

    @media screen and (min-width: $breakpoint-large) {
        margin-top: 2vh;
    }

    @media screen and (max-width: $breakpoint-medium-max) {
        @include font($header-font-name, 1.5rem, $primary-yellow, bold);
    }

    @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
        @include font($header-font-name, 2rem, $primary-yellow, bold);
    }
}


.address {
    @include font($flow-font-name, 2rem, white);
    line-height: 2rem;
    @media screen and (max-width: $breakpoint-medium-max) {
        padding-bottom: 5vh;
    }
    @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
        font-size: 1.8rem;
    }
}

.back {
    @include font($header-font-name, 2.5rem, $primary-yellow, 700);
    transform: translateY(25%);

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: $breakpoint-medium-max) {
        @include font($header-font-name, 1.3rem, $primary-yellow, 700);
        padding-bottom: 2vh;
    }

    @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
        @include font($header-font-name, 2rem, $primary-yellow, 700);
    }
}

.header {
    margin-top: 10vh;
}

.content {
    margin-top: 5vh;
    float: left;
    width: 100%;

    .commentBox {
        width: 100%;
    }

    .beschreibung {
        @include font($flow-font-name, 1rem, white);
        padding: 5vw 7.5vw 2vw;

        h2 {
            @include font($header-font-name, 3rem, white, bold);

            @media screen and (max-width: $breakpoint-medium-max) {
                font-size: 2rem;
            }
        }

        @media screen and (max-width: $breakpoint-medium-max) {
            font-size: 1rem;
        }

        .dateOpen {
            margin-top: 5vh;
        }

        @media screen and (min-width: $breakpoint-large) {
            column-count: 2;
            column-width: 40vw;
            column-gap: 3vw;

            .bes {
                page-break-inside: avoid;
                column-break-inside: avoid;
            }

            .dateOpen {
                page-break-inside: avoid;
                column-break-inside: avoid;
            }
        }
    }

    .link {
        @media screen and (max-width: $breakpoint-medium-max) {
            transform: translateY(400%);
        }
    }
}
</style>

<script>
import commentBox from "~/components/commentBox/commentBox.vue";

export default {
    name: "event-detailed",
    data() {
        return {
            name: "",
            beschreibung: "",
            bild: "",
            date: "",
            id: "",
            days: {},
            adresse: null
        }
    },
    computed: {
        title: function () {
            return this.name.split(" ");
        },
        sizeDetection: function () {
            if(this.name.length - this.name.split(" ").length <= 10 ) {
                return "12vh";
            } else if(this.name.length - this.name.split(" ").length > 10 && this.name.length - this.name.split(" ").length < 20) {
                return "10vh";
            } else if(this.name.length - this.name.split(" ").length > 20) {
                return "8vh";
            }
        }
    },
    async fetch() {
        let id = this.$route.params.id;
        //Fetch detetailed informations of Event ID
    },
    created() {
        //Json Manipulation
        this.name = "Heinz Knapp";
        this.beschreibung = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam"
        this.bild = "../img/HeinzKnapp/plakat.jpg"
        this.date = "28.Mai 2020"
        this.id = this.$route.params.id;
        this.days = [
            {
                wochentag: "Dienstag",
                start_zeit: "10:00",
                end_zeit: "12:00"
            },
            {
                wochentag: "Mittwoch",
                start_zeit: "10:00",
                end_zeit: "12:00"
            },
            {
                wochentag: "Donnerstag",
                start_zeit: "10:00",
                end_zeit: "12:00"
            }
        ];
        this.adresse = "Herrengasse 15 3370 Ybbs";

        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, text: "Events", link:"/events"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 3, text: `${this.id}`, link:`/events/${this.id}`} });
    },
    components: {
        commentBox
    },
    methods: {
        concat: function (...strings) {
            let conString = "";
            strings.forEach((arg, index) => {
                conString += arg;
            });
            return conString;
        },
        scrollTo: function (target) {
            let options = {
                container: 'body',
                easing: 'ease-in-out',
                force: true,
                cancelable: false,
                offset: -100,
                x: false,
                y: true
            }

            this.$scrollTo(target, 500, options)
        }
    },mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        })

        window.addEventListener("load", () => {
            this.$nuxt.$loading.finish();
        });
    },
    head() {
        return {
            title: this.name + " - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-16'
                },
                {
                    name: "description",
                    content: this.beschreibung
                },
                {
                    name: "keywords",
                    content: "KIZ, Vereinshaus, OKAY, Konzert, Ausstellung, Bildergallerie, Vorlesung"
                },
                {
                    name: "robots",
                    content: "noindex, nofollow"
                }
            ]
        }
    }
}
</script>