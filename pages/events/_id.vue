<template>
    <main class="root flex flex-center" style="margin-bottom: 0;">
        <section class="row flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="$router.back()">
                    <em class="underline">
                        < Zurück zur Übersicht
                    </em>
                </p>
                <p v-for="titlePart in title" :style="{fontSize: sizeDetection, lineHeight: sizeDetection}" :key="titlePart">
                    {{ titlePart }}
                </p>
                <p class="date">
                    Ab {{ this.date }}
                </p>
                <p class="address">
                    {{ this.adresse }}
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
                    <p>{{ this.beschreibung }}</p>
                </div>
                <div class="dateOpen">
                    <h2>Öffnungszeiten</h2>
                    <p v-for="day in days" :key="day.wochentag" class="opening flex flex-center">
                        Am {{ day.wochentag }} von {{ day.start_zeit }} bis {{ day.end_zeit }}
                    </p>
                </div>
            </article>
            <div class="link-noMargin">
                <em class="underline">
                    <nuxt-link :to="concat('/images/', this.id)" class="further-link">Zu den Bildern</nuxt-link>
                </em>
            </div>
            <section class="commentBox flex flex-center">
                <commentBox :eId="this.id"/>
            </section>
        </section>
    </main>
</template>

<style scoped lang="scss">
@import '../../assets/style/_id.scss';
</style>

<script>
import commentBox from "~/components/commentBox/commentBox.vue";
import axios from "axios";

export default {
    name: "EventDetailed",
    data() {
        return {
            name: "",
            beschreibung: "",
            bild: "",
            date: "",
            id: "",
            days: {},
            adresse: null,
            untertitel: ""
        }
    },
    computed: {
        title: function () {
            let tmp = this.name + " - " + this.untertitel
            let names = tmp.split(" ");

            //Join Short Words
            for (let e in names) {
                e = parseInt(e, 10);
                if (names[e].length <= 15) {
                    if (e + 1 < names.length) {
                        names[e + 1] = names[e] + " " + names[e + 1];
                        names[e] = "";
                    }
                }
            }

            return names;
        },
        sizeDetection: function () {
            if(process.client) {
                let width = window.innerWidth;

                if(width > 700) {
                    if (this.name.length - this.name.split(" ").length <= 10) {
                        return "12vh";
                    } else if (this.name.length - this.name.split(" ").length > 10 && this.name.length - this.name.split(" ").length < 20) {
                        return "10vh";
                    } else if (this.name.length - this.name.split(" ").length > 20) {
                        return "8vh";
                    }
                } else {
                    if (this.name.length - this.name.split(" ").length <= 10) {
                        return "3rem";
                    } else if (this.name.length - this.name.split(" ").length > 10 && this.name.length - this.name.split(" ").length < 20) {
                        return "2.5rem";
                    } else if (this.name.length - this.name.split(" ").length > 20) {
                        return "2rem";
                    }
                }
            }
        }
    },
    async fetch() {
        let id = this.id;

        let req = await axios.get(process.env.baseURL + "/events/" + id);

        if(req.status === 200) {
            let event = req.data;

            this.name = event.titel;
            this.beschreibung = event.beschreibung;
            this.untertitel = event.untertitel;

            console.log(event.bilder_path);

            if(event.bilder_path != null) {
                this.bilder_path = event.bilder_path;
                this.bild = event.bilder_path + "/title.jpg";
            } else {
                this.bild = process.env.defaultImage;
            }

            console.log(this.bild);

            this.date = new Date(event.start_datum).toLocaleDateString("de-DE", {year: "numeric", month: "long", day: "numeric"});
            this.id = event.oaId;

            if(event.zeiten != null) {
                this.days = event.zeiten;
            }

            this.adresse = event.adresse;
        }
    },
    created() {
        this.id = this.$route.params.id;

        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, text: "Events", link:"/events"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 3, text: this.$route.params.id, link:"/events/" + this.$route.params.id} });
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
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        })

         await this.$fetch(); 

        this.$nextTick(() => {
            this.$nuxt.$loading.finish();
        })
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