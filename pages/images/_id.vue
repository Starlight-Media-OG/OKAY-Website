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
                    Bildergallerie
                </p>
                <p></p>
            </div>
            <div class="image col-4">
                <img :src="concat(this.path, 'plakat.jpg')" alt="Plakat" width="100%" />
            </div>
        </section>
        <section class="content">
            <gallery :path="this.path" :id="this.$route.params.id" />
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

    .link {
        transform: translateY(250%);
    }

    .content {
        width: 100vw;
        margin: 10vh 0;
    }
</style>

<script>
    import gallery from "~/components/gallery/gallery.vue";

    export default {
        name: "imageGallery",
        data() {
            return {
                name: "",
            }
        },
        components: {
            gallery
        },
        computed: {
            path: function () {
                return "http://localhost:4000/uploads/" + this.$route.params.id + "/";
            },
            title: function () {
                return this.name.split(" ");
            }
        },
        async fetch() {
            //Fetch Name of Event from api
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
        mounted() {
            this.name = "Heinz Knapp"
        }
    }
</script>