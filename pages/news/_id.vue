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
                    {{ this.name }}
                </h1>
                <p class="date">
                    Vom {{ this.date }}
                </p>
            </div>
            <div class="image col-5">
                <img :alt="this.name" :src="this.bild" width="100%"/>
            </div>
        </section>
        <section class="content flex flex-center">
            <article class="beschreibung-news col-9" style="margin-top: 0;">
                <p v-html="this.beschreibung"></p>
            </article>
            <section class="galleryBox">
                <gallery :id="this.$route.params.id" :imgPath="this.bilder_path != null || this.bilder_path != '' || this.bilder_path != 'NULL' ? 'bla' : null" type="news"/>
            </section>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../../assets/style/_id.scss';
</style>

<script>
import axios from "axios";
import gallery from "~/components/gallery/gallery.vue";

export default {
    name: "NewsDetailed",
    data() {
        return {
            name: "",
            beschreibung: "",
            bild: "",
            date: "",
            id: "",
            bilder_path: ""
        }
    },
    components: {
        gallery
    },
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", {todo: {step: 1, text: "Startseite", link: "/"}});
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", {todo: {step: 2, text: "News", link: "/news"}});
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", {
            todo: {
                step: 3,
                text: this.$route.params.id,
                link: "/news/" + this.$route.params.id
            }
        });
    },
    computed: {
        title: function () {
            let names = this.name.split(" ");

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
        path: function () {
            return "img/News" + this.id + "/";
        },
        sizeDetection: function () {
            if (process.client) {
                let width = window.innerWidth;

                if (width > 700) {
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
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });

        await this.$fetch();

        this.$nextTick(() => {
            this.$nuxt.$loading.finish();
        });
    },
    head() {
        return {
            title: this.name + " - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: "robots",
                    content: "noindex",
                },
                {
                    name: "description",
                    content: this.beschreibung
                }
            ]
        }
    },
    async fetch() {
        let id = this.$route.params.id;

        let req = await axios.get(process.env.baseURL + "/news/" + id);
        let news = req.data;

        this.name = news.titel;
        this.beschreibung = news.bericht;

        if (news.bilder_path !== ""||news.bilder_path !== null || news.bilder_path !== 'NULL') {
            this.bild = news.bilder_path + "/plakat.jpg";
            this.bilder_path = news.bilder_path;
        } else {
            this.bild = process.env.defaultImage;
        }

        this.date = new Date(news.datum).toLocaleDateString("de-DE", {year: "numeric", month: "long", day: "numeric"});
        this.id = id;
    }
}
</script>
