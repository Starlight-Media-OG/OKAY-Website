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
                    Für {{ this.price }} €
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" :alt="this.name" width="100%"/>
            </div>
        </section>
        <section class="content flex flex-center">
            <article class="beschreibung" style="width: 90%;">
                <div class="bes">
                    <h2>Beschreibung</h2>
                    {{ this.beschreibung }}
                </div>
                <div class="dateOpen">
                    <h2>Abholungsorte</h2>
                    <ul>
                        <li class="opening flex flex-center" v-for="ort in orts" :key="orts.ortId">
                            {{ ort.name }} @ {{ ort.adresse }}
                        </li>
                    </ul>
                </div>
            </article>
            <section class="galleryBox" v-if="this.bilder_path == null">
                <gallery :imgPath="this.bilder_path"/>
            </section>
            <div v-else class="galleryBox">
                Für dieses Produkt sind keine Bilder verfügbar
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
@import '../../assets/style/_id.scss';
</style>

<script>
import gallery from "~/components/gallery/gallery.vue";
import axios from "axios";

export default {
    name: "ProductDetailed",
    data() {
        return {
            name: "",
            beschreibung: "",
            bild: "",
            price: "",
            id: "",
            orts: [],
            bilder_path: ""
        }
    },
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", {todo: {step: 1, text: "Startseite", link: "/"}});
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", {
            todo: {
                step: 2,
                text: "Produkte",
                link: "/products"
            }
        });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", {
            todo: {
                step: 3,
                text: `${this.id}`,
                link: `/products/${this.id}`
            }
        });
    },
    computed: {
        title: function () {
            return this.name.split(" ");
        },
        path: function () {
            return "img/Product" + this.id + "/";
        },
        bild: function() {
          return this.bilder_path + "/plakat.jpg";
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
        let req = await axios.get(process.env.baseURL + "/produkte/" + id);
        let produkt = req.data;

        console.log(produkt)

        this.name = produkt.bezeichnung;
        this.beschreibung = produkt.beschreibung;
        this.price = produkt.preis;
        this.id = id;

        if(produkt.bilder_path == null) {
            this.bilder_path = produkt.bilder_path;
            this.bild = produkt.bilder_path + "/title.jpg";
        } else {
            this.bild = process.env.defaultImage;
        }


        this.orts = produkt.orte;
    },
    components: {
        gallery
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
                    name: "description",
                    content: this.beschreibung
                },
                {
                    name: "robots",
                    content: "noindex"
                }
            ]
        }
    }
}
</script>