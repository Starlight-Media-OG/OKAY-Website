<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
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
                    Bildergalerie
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" alt="Plakat" width="100%"/>
            </div>
        </section>
        <section class="content col-12" style="margin-bottom: 0;">
            <gallery :id="this.$route.params.id" type="event"/>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

@import "../../assets/style/_id.scss";
</style>

<script>
import gallery from "~/components/gallery/gallery.vue";
import axios from "axios";

export default {
    name: "imageGallery",
    data() {
        return {
            name: "",
            untertitel: ""
        }
    },
    components: {
        gallery
    },
    computed: {
        title: function () {
            let tmp = this.name
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
        let req = await axios.get(process.env.baseURL + "/events/" + this.$route.params.id);

        if(req.status === 200) {
            this.name = req.data.titel;
            this.untertitel = req.data.untertitel;

            if(req.data.bilder_path != null) {
                this.bild = req.data.bilder_path + "/plakat.jpg";
            } else {
                this.bild = process.env.defaultImage;
            }
        }
    },
    methods: {
        concat: function (...strings) {
            let conString = "";
            strings.forEach((arg, index) => {
                conString += arg;
            });
            return conString;
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });

        await this.$fetch();

        this.$nextTick(() => {
            this.$nuxt.$loading.finish();
        })
    },
    head() {
        return {
            title: "Bildergallerie - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: "description",
                    content: "Bildergallerie der News/Events/Produkte von OKAY"
                },
                {
                    name: "robots",
                    content: "noindex"
                }
            ]
        }
    },
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, text: "Events", link:"/events"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 3, text: `${this.$route.params.id}`, link:`/events/${this.$route.params.id}`} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 4, text: `Bilder ${this.$route.params.id}`, link:`/images/${this.$route.params.id}`} });
    }
}
</script>
