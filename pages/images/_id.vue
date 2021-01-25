<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="$router.back()">
                    <em class="underline">
                        < Zurück zur Übersicht
                    </em>
                </p>
                <p v-for="titlePart in title" :style="{fontSize: sizeDetection, lineHeight: sizeDetection}" :key="titlePart">
                    {{ titlePart }}
                </p>
                <p class="date">
                    Bildergallerie
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.imgPath()" alt="Plakat" width="100%"/>
            </div>
        </section>
        <section class="content" style="margin-bottom: 0;">
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
import axios from "axios";

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
            let tmp = this.name
            let names = tmp.split(" ");

            //Join Short Words
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
        let req = await axios.get(process.env.baseURL + "/events/title/" + this.$route.params.id);

        if(req.status === 200) {
            this.name = req.data.titel;
        }
    },
    methods: {
        concat: function (...strings) {
            let conString = "";
            strings.forEach((arg, index) => {
                conString += arg;
            });
            return conString;
        },
        imgPath: function () {
            let path =
             process.env.baseImage + "/events/" + this.$route.params.id + "/"  + 'plakat.jpg';

             let req = new XMLHttpRequest();
             req.open("GET", path, false);
             req.send();

             if(req.status == 200) {
                 return path;
             } else {
                 return process.env.defaultImage;
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
        })
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