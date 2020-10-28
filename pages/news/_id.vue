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
                    Von {{ this.date }}
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" alt="this.name" width="100%"/>
            </div>
        </section>
        <section class="content flex flex-center">
            <article class="beschreibung col-3">
                <h2 class="title">Bericht</h2>
                <p>
                    {{ this.beschreibung }}
                </p>
            </article>
            <section class="galleryBox" v-if="this.bilder_path != null">
                <gallery :imgPath="this.bilder_path"/>
            </section>
            <div v-else class="galleryBox">
                Für diesen Bericht sind keine Bilder verfügbar
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
@import '../../assets/style/variable.scss';

.date {
    @include font($header-font-name, 4rem, $primary-yellow, bold);
    line-height: 4rem;
    @media screen and (min-width: $breakpoint-large) {
        margin-top: 2vh;
    }
    @media screen and (max-width: $breakpoint-medium-max) {
        @include font($header-font-name, 2rem, $primary-yellow, bold);
        padding-bottom: 5vh;
    }
}

.back {
    @include font($header-font-name, 3rem, $primary-yellow, 700);
    transform: translateY(30%);

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: $breakpoint-medium-max) {
        @include font($header-font-name, 1.3rem, $primary-yellow, 700);
        padding-bottom: 2vh;
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
        width: 50%;
        padding: 5vh;

        @media screen and (max-width: $breakpoint-medium-max) {
            width: 90%;
        }

        .title {
            @include font($flow-font-name, 4rem, white, bold);

            @media screen and (max-width: $breakpoint-medium-max) {
                @include font($flow-font-name, 3rem, white, bold);
                margin-bottom: 5vh;
                margin-left: -5vw;
            }
        }

        p {
            margin-top: -5vh;
            @include font($flow-font-name, 1rem, white);
        }

    }

    .galleryBox {
        width: 100vw;
        padding: 10vh 0;
        margin: 10vh 0;
        text-align: center;
        @include font($flow-font-name, 3rem, white, bold);
        background-color: $primary-blue;
    }
}
</style>

<script>
export default {
    name: "ProductDetailed",
    data() {
        return {
            name: "",
            beschreibung: "",
            bild: "",
            date: "",
            id: ""
        }
    },
    created() {
        this.name = "Heinz Knapp";
        this.beschreibung = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam"
        this.bild = "../img/HeinzKnapp/plakat.jpg"
        this.date = "28.Mai 2020"
        this.id = this.$route.params.id;
        this.bilder_path = null;

        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, text: "News", link:"/news"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 3, text: `${this.id}`, link:`/news/${this.id}`} });
    },
    computed: {
        title: function () {
            return this.name.split(" ");
        },
        path: function () {
            return "img/News" + this.id + "/";
        }
    },
    head() {
        return {
            title: "News - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                }
            ]
        }
    }
}
</script>