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
                    Ab {{this.date}}
                </p>
                <p class="address" @click="scrollTo('#content')">
                    <em class="underline">
                        Weitere Informationen
                    </em>
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" alt="this.name" width="100%" />
            </div>
        </section>
        <section class="content flex flex-center" id="content">
            <article class="beschreibung">
                <h2 class="title">Beschreibung</h2>
                <p>
                    {{this.beschreibung}}
                </p>
            </article>
            <aside class="infos">
                <div class="dateOpen">
                    <h3>Öffnungszeiten</h3>
                    <p class="opening" v-for="day in days" :key="wochentag">
                        Am {{day.wochentag}} von {{day.start_zeit}} bis {{day.end_zeit}}
                    </p>
                </div>
            </aside>
            <div class="link">
                <em class="underline">
                    <nuxt-link :to="concat('/images/', this.id)" class="further-link">Zu den Bildern</nuxt-link>
                </em>
            </div>
            <section class="commentBox">
                <commentBox :id="this.id" />
            </section>
        </section>
    </main>
</template>

<style scoped lang="scss">
    @import '../../assets/style/variable.scss';

    .date {
        @include font($header-font-name, 4rem, $primary-yellow, bold);
        transform: translateY(-20%);
    }

    .address {
        margin-top: -5vh;
        @include font($flow-font-name, 2rem, white);
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
        float: left;
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

    .infos {
        width: 50%;
    }
    }
</style>

<script>
    import commentBox from "~/components/commentBox/commentBox.vue";

    export default {
        name: "event-detailed",
        data() {
            return {
                name: "",
                beschreibung: "",
                bild: "",
                date: "",
                id: "",
                days: {},
                adresse: ""
            }
        },
        computed: {
            title: function () {
                return this.name.split(" ");
            }
        },
        async fetch() {
            let id = this.$route.params.id;
            //Fetch detetailed informations of Event ID
        },
        created() {
            //Json Manipulation
            this.name = "Heinz Knapp";
            this.beschreibung = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam"
            this.bild = "../img/HeinzKnapp/plakat.jpg"
            this.date = "28.Mai 2020"
            this.id = this.$route.params.id;
            this.days = [
                {
                    wochentag: "Dienstag",
                    start_zeit: "10:00",
                    end_zeit: "12:00"
                },
                {
                    wochentag: "Dienstag",
                    start_zeit: "10:00",
                    end_zeit: "12:00"
                },
                {
                    wochentag: "Dienstag",
                    start_zeit: "10:00",
                    end_zeit: "12:00"
                }
            ];
            this.adresse = "Herrengasse 15 3652 Leiben";
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
                var options = {
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
        }


    }
</script>