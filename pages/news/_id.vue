<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title col-3">
                <p class="back" @click="$router.back()">
                    <em class="underline">
                        < Zurück zur Übersicht
                    </em>
                </p>
                <p v-for="titlePart in title">
                    {{titlePart}}
                </p>
                <p class="date">
                    Ab {{this.date}}
                </p>
                <p></p>
            </div>
            <div class="image col-4">
                <img :src="this.bild" alt="this.name" width="100%" />
            </div>
        </section>
        <section class="content flex flex-center">
            <article class="beschreibung col-3">
                <h2 class="title">Beschreibung</h2>
                <p>
                    {{this.beschreibung}}
                </p>
            </article>
        </section>
    </main>
</template>

<style scoped lang="scss">
    @import '../../assets/style/variable.scss';

    .date {
        color: $primary-yellow;
        font-size: 5vh;
        transform: translateY(-30%);
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

    .beschreibung {
        margin-top: -20vh;
        margin-left: -35vw;
        .title

    {
        @include font($flow-font-name, 5vh, white, bold);
    }

    p {
        margin-top: -5vh;
        @include font($flow-font-name, 1.2vh, white);
    }

    }

    .content {
        margin-bottom: 5vh;
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