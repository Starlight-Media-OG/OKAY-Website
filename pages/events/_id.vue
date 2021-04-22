<template>
    <main class="root flex flex-center" style="margin-bottom: 0;">
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
                    {{ this.adresse }}
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" :alt="this.name" width="100%"/>
            </div>
        </section>
        <section id="content" class="content flex flex-center">
            <article class="beschreibung col-9" style="padding: 1rem;">
                <div class="bes">
                    <p>{{ this.beschreibung }}</p>
                </div>
                <div class="dateOpen" v-if="showTime">
                    <h2>Öffnungszeiten</h2>
                    <p v-for="day in days" :key="day.wochentag" class="opening flex flex-center">
                        Am {{ day.wochentag }} von {{ timeFormatter(day.start_zeit) }} bis {{ timeFormatter(day.end_zeit) }}
                    </p>
                </div>
            </article>
            <div class="flex-break"></div>
            <div class="link flex flex-center" v-if="this.bilder_path !== null || this.bilder_path !== '' || this.bilder_path !== undefined">
                <nuxt-link :to="concat('/images/', this.id)" class="further-link">Zu den Bildern</nuxt-link>
            </div>
            <section class="commentBox flex flex-center">
                <commentBox :koms="this.koms" :images="this.images()" :eId="this.id" />
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
            days: null,
            adresse: null,
            untertitel: "",
            koms: [],
            bilder_path: "",
        }
    },
    computed: {
        title: function () {
            return this.name + " - " + this.untertitel;
        },
        showTime: function() {
            console.log(this.days);
            return this.days !== {} && this.days !== undefined && this.days !== [] && this.days !== null;

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

            if(event.bilder_path != null) {
                this.bilder_path = event.bilder_path;
                this.bild = event.bilder_path + "/plakat.jpg";
            } else {
		        this.bilder_path = null;
                this.bild = process.env.defaultImage;
            }

            this.date = new Date(event.start_datum).toLocaleDateString("de-DE", {year: "numeric", month: "long", day: "numeric"});
            this.id = event.oaId;

            if(event.zeiten != null) {
                console.log(event.zeiten);
                this.days = event.zeiten;
                console.log(this.days);
            }

            this.adresse = event.adresse;
        }

        let error = false;

        let reqComment = await axios.get(process.env.baseURL + "/kommentare/getKommentare/" + this.id).catch(()=>{
            error =true;
        });

        if(!error) {
            this.koms = reqComment.data;
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
        },
        images: function () {
            let images = [];

            for ( const kom of this.koms) {
                if(kom.bilder_path != null) {
                    if(process.client) {
                        let xhr = new XMLHttpRequest();
                        xhr.open("GET", kom.bilder_path, false);
                        xhr.send();

                        if(xhr.status === 200) {
                            let data = JSON.parse(xhr.responseText);

                            for (let image of data.data) {
                                let obj = {
                                    id: kom.komId,
                                    image: process.env.baseImage + image.replace("server/uploads", "")
                                };

                                images.push(obj);
                            }
                        }
                    }
                }
            }


            return images;
        },
        timeFormatter: function(time) {
            let splitted = time.split(":");
            return splitted[0] + ":" + splitted[1];
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
    },
    fetchOnServer: true
}
</script>
