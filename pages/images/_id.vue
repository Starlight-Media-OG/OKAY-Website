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
                    {{ titlePart }}
                </p>
                <p class="date">
                    Bildergallerie
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="concat(this.imgPath, 'plakat.jpg')" alt="Plakat" width="100%"/>
            </div>
        </section>
        <section class="content">
            <gallery :id="this.$route.params.id"/>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

.date {
    color: $primary-yellow;
    font-size: 5vh;
    transform: translateY(-30%);
}

.back {
    @include font($header-font-name, 3rem, $primary-yellow, 700);
    transform: translateY(25%);

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: $breakpoint-medium-max) {
        @include font($header-font-name, 1.225rem, $primary-yellow, 700);
        padding-bottom: 2vh;
    }

    @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
        @include font($header-font-name, 2rem, $primary-yellow, bold);
    }
}

.header {
    margin-top: 10vh;
}

.beschreibung {
    margin-top: -20vh;
    margin-left: -35vw;

    .title {
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
    width: 100%;
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
        title: function () {
            return this.name.split(" ");
        },
        imgPath: function () {
            return "http://localhost:4000/events/" + this.$route.params.id + "/";
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

        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });

        window.addEventListener("load", () => {
            this.$nuxt.$loading.finish();
        });
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