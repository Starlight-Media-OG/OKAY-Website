<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="$router.back()">
                    <em class="underline">
                        < Zurück zur Übersicht
                    </em>
                </p>
                <h1 class="title col-4">
                    {{ this.name }} - {{ this.untertitel }}
                </h1>
                <p class="date">
                    Ab {{ this.date }}
                </p>
                <p class="address">
                    Projektpartner: {{ this.projektpartner }}
                </p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" alt="this.name" width="100%"/>
            </div>
        </section>
        <section class="content flex flex-center">
            <article class="beschreibung col-9" style="padding: 1rem;">
                <div class="bes">
                    <p> {{ this.beschreibung }}</p>
                </div>
            </article>
            <div class="flex-break"></div>
            <div class="link" style="margin: 5vh 0;">
                <em class="underline">
                    <nuxt-link :to="concat('/images/', this.id)" class="further-link">Zu den Bildern</nuxt-link>
                </em>
            </div>
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
    name: "ProjectDetailed",
    data() {
        return {
            name: "",
            untertitel: "",
            beschreibung: "",
            bild: "",
            projektpartner: "",
            date: "",
            id: "",
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
        let id = this.$route.params.id;

        let req = await axios.get(process.env.baseURL + "/projekte/" + id);

        let event = req.data;

        this.name = event.titel;
        this.untertitel = event.untertitel;
        this.beschreibung = event.beschreibung;
        this.projektpartner = event.projektpartner;

        if(event.bilder_path == null) {
            this.bilder_path = event.bilder_path;
            this.bild = event.bilder_path + "/plakat.jpg";
        } else {
            this.bild = process.env.defaultImage;
        }

        this.date = new Date(event.start_datum).toLocaleDateString("de-DE", {year: "numeric", month: "long", day: "numeric"});
        this.id = id;
    },
    created() {
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
                    charset: 'utf-8'
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