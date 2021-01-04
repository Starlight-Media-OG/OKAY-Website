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
            <section class="galleryBox" v-if="this.bilder_path != null">
                <gallery :imgPath="this.bilder_path"/>
            </section>
            <div v-else class="galleryBox">
                Für dieses Produkt sind keine Bilder verfügbar
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
@import '../../assets/style/variable.scss';

main {
    overflow: hidden;
}

.date {
    transform: translateY(-20%);
    @include font($header-font-name, 4rem, $primary-yellow, bold);
    line-height: 4rem;

    @media screen and (min-width: $breakpoint-large) {
        margin-top: 2vh;
    }

    @media screen and (max-width: $breakpoint-medium-max) {
        @include font($header-font-name, 1.5rem, $primary-yellow, bold);
        padding-bottom: 5vh;
    }

    @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
        font-size: 2rem;
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

.commentBox {
    width: 100vw;
}

.dateOpen {
    @include font($flow-font-name, 1rem, white);

    h3 {
        @include font($header-font-name, 4rem, white, bold);
        margin-bottom: 1rem;
    }

}

.content {
    margin-top: 2vh;

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
                -webkit-column-break-inside: avoid;
                break-inside: avoid;
            }

            .dateOpen {
                page-break-inside: avoid;
                -webkit-column-break-inside: avoid;
                break-inside: avoid;
            }
        }
    }

    .galleryBox {
        width: 100%;
        padding: 10vh 0;
        margin: 10vh 0;
        text-align: center;
        @include font($flow-font-name, 3rem, white, bold);
        background-color: $primary-blue;
    }
}
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

        this.$nextTick(() => {
            this.$nuxt.$loading.start();
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
        let req = await axios.get(process.env.baseURL + "/produkte/" + id);
        let produkt = req.data;

        console.log(produkt)

        this.name = produkt.bezeichnung;
        this.beschreibung = produkt.beschreibung;
        this.price = produkt.preis;
        this.id = id;

        if(produkt.bilder_path !== "") {
            this.bilder_path = produkt.bilder_path;
        } else {
            this.bilder_path = process.env.defaultIMAGE;
        }
        this.orts = produkt.orte;
    },
    components: {
        gallery
    },
    async mounted() {
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