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
                    Vom {{ this.date }}
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="this.bild" :alt="this.name" width="100%"/>
            </div>
        </section>
        <section class="content flex flex-center">
            <article class="beschreibung col-3">
                <h2 class="title">Bericht</h2>
                <p v-html="this.beschreibung"></p>
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
import axios from "axios";
import gallery from "@/components/gallery/gallery";

export default {
    name: "ProductDetailed",
    data() {
        return {
            name: "",
            beschreibung: "",
            bild: "",
            date: "",
            id: "",
          bilder_path: ""
        }
    },
  components: {
    gallery
  },
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, text: "News", link:"/news"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 3, text: `${this.id}`, link:`/news/${this.id}`} });

        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
    },
    computed: {
        title: function () {
            let names = this.name.split(" ");

            for(let e in names) {
              e = parseInt(e, 10);
              if(names[e].length <= 15) {
                if(e+1 < names.length) {
                  names[e+1] = names[e] + " " + names[e + 1];
                  names[e] = "";
                }
              }
            }

            return names;
        },
        path: function () {
            return "img/News" + this.id + "/";
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
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });

        window.addEventListener("load", () => {
            this.$nuxt.$loading.finish();
        });

        await this.$fetch();
        this.$nuxt.$loading.finish();
    },
    head() {
        return {
            title: this.name + " - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: "robots",
                    content: "noindex",
                },
                {
                    name: "description",
                    content: this.beschreibung
                }
            ]
        }
    },
  async fetch() {
      let id = this.$route.params.id;

      let req = await axios.get("http://server.okay-ybbs.at:3000/news/" + id);
      let news = req.data;

      this.name = news.titel;
      this.beschreibung = news.bericht;
      this.bild = news.bilder_path + "/plakat.jpg";
      this.date = new Date(news.datum).toLocaleDateString("de-DE", {year: "numeric", month: "long", day: "numeric"});
      this.id = id
      this.bilder_path = news.bilder_path
  },
  fetchOnServer: true
}
</script>