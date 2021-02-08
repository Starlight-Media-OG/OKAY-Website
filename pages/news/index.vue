<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="svgGraphic">
                <img src="/animations/news.gif" alt="Nachrichtenstapel Animation">
            </div>
            <div class="flex-break"></div>
            <div class="title">
                <h1>News</h1>
            </div>
        </section>
        <section class="content flex flex-center" style="margin-bottom: 10vh;">
            <div class="news" v-for="news1 in news" :key="news1.nId">
                <card :title="news1.titel" :teaser="news1.anreisser" :image="news1.bilder_path + '/plakat.jpg'"
                      :id="news1.nId" :date="news1.datum" news />
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

main {
    overflow: hidden;

    .header {
        z-index: -98;

        h1 {
            font-size: 20vh;
            
            @media screen and (max-width: $breakpoint-medium-max) {
                font-size: 10vh;
            }
        }
    }

    .svgGraphic {
        margin-top: 5vh;
        z-index: -99;

        @media screen and (max-width: $breakpoint-medium-max) {
            display: none;
        }
    }

    .content {
        margin-top: 5vh;
    }
}
</style>

<script>
import card from "~/components/card.vue";
import axios from "axios";

export default {
    name: "indexNews",
    components: {
        card
    },
    data() {
        return {
            news: []
        }
    },
    async mounted() {

        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })

        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, text: "News", link:"/news"} });

        await this.$fetch();
        this.$nuxt.$loading.finish();
    },
  async fetch() {
      let req = await axios.get(process.env.baseURL + "/news");
      let newsID = req.data;

      this.news = [];

      for (let e of newsID) {
        let id = e.nId;

        let news1 = await axios.get(process.env.baseURL + "/news/" + id);
        news1 = news1.data;

        if(news1.anreisser === "") {
          news1.anreisser = news1.bericht;
        }

        this.news.push(news1);

        this.news.sort(function(a, b) {
          var keyA = new Date(a.datum),
              keyB = new Date(b.datum);
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
      }
  },
    head() {
        return {
            title: "News- OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: "description",
                    content: "Alle Nachrichten betreffend Kultur aus dem wunderschönen Ybbs an der Donau und der Umgebung"
                }
            ]
        }
    }
}
</script>