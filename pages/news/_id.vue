<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="$router.back()">
                    <em class="underline">
                        < Zurück zur Übersicht
                    </em>
                </p>
                <p v-for="titlePart in title">
                    {{titlePart}}
                </p>
                <p class="date">
                    Von {{this.date}}
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" alt="this.name" width="100%" />
            </div>
        </section>
        <section class="content flex flex-center">
            <article class="beschreibung col-3">
                <h2 class="title">Bericht</h2>
                <p>
                    {{this.beschreibung}}
                </p>
            </article>
            <section class="galleryBox" v-if="this.bilder_path != null">
                <gallery :imgPath="this.bilder_path" />
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
        transform: translateY(-20%);
    }

    .back {
        font-size: 3vh;
        color: $primary-yellow;
        transform: translateY(30%);
        &:hover

    {
        cursor: pointer;
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
        h3

    {
        @include font($header-font-name, 4rem, white, bold);
        margin-bottom: 1rem;
    }

    }

    .content {
        margin-top: 2vh;
        .beschreibung

    {
        width: 50%;
        padding: 5vh;
        .title

    {
        @include font($flow-font-name, 4rem, white, bold);
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
            this.bilder_path = null
        },
        computed: {
            title: function () {
                return this.name.split(" ");
            },
            path: function () {
                return "img/News" + this.id + "/";
            }
        }
    }
</script>