<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="$router.back()">
                    <em class="underline">
                        < Zurück zur Übersicht
                    </em>
                </p>
                <p v-for="titlePart in title">
                    {{ titlePart }}
                </p>
                <p class="date">
                    Für {{ this.price }} €
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" alt="this.name" width="100%"/>
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
                        <li class="opening flex flex-center" v-for="ort in orts" :key="orts.ortID">
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
    font-size: 3vh;
    color: $primary-yellow;
    transform: translateY(30%);

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: $breakpoint-medium-max) {
        @include font($header-font-name, 1.225rem, $primary-yellow, 700);
        padding-bottom: 2vh;
    }

    @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
        font-size: 1.8rem;
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
                column-break-inside: avoid;
            }

            .dateOpen {
                page-break-inside: avoid;
                column-break-inside: avoid;
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

export default {
    name: "ProductDetailed",
    data() {
        return {
            name: "",
            beschreibung: "",
            bild: "",
            price: "",
            id: ""
        }
    },
    created() {
        this.name = "Heinz Knapp";
        this.beschreibung = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam"
        this.bild = "../img/HeinzKnapp/plakat.jpg"
        this.price = "160"
        this.id = this.$route.params.id;
        this.bilder_path = null;
        this.orts = [
            {
                ortId: 1,
                name: 'Vereinslokal',
                adresse: 'xyz 15 3370 Ybbs'
            },
            {
                ortID: 2,
                name: 'Gemeinde Ybbs',
                adresse: 'xyz 15 3370 Ybbs'
            }, {
                ortId: 3,
                name: 'Vereinslokal',
                adresse: 'xyz 15 3370 Ybbs'
            },
        ]

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
        }
    },
    async fetch() {
        //Fetch Comment Data from API
    },
    components: {
        gallery
    },
    head() {
        return {
            title: "Produkt - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                }
            ]
        }
    }
}
</script>