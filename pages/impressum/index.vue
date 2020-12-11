<template>
    <div class="flex flex-center height-100">
        <div class="row">
            <div class="row header flex flex-center">
                <h1 class="title">Impressum</h1>
            </div>
            <h2>Verein Offene Kultur Aus Ybbs</h2>
            <ul class="noStyle">
                <li><strong>ZVR-Zl.:</strong> 391625836</li>
                <li><strong>Vereinssitz:</strong> Sandtorgasse 3, 3370 Ybbs an der Donau</li>
                <li><strong>Obmann</strong> Dr. Karl Dorfmeister</li>
                <li><strong>Obmannstellvertreter:</strong> Mag. Gerlinde Stöger, DI Gerald Böhm</li>
                <li><strong>E-Mail: </strong>kulturverein@okay-ybbs.at</li>
                <li class="break"><strong>Erstellung der Website: </strong>Philipp Dvorak</li>
                <li>Dieser Webauftritt ist im Zusammenhang mit einer Diplomarbeit der IT-HTL Ybbs/Donau errichtet worden</li>
                <li class="break">Informationspflicht laut §5 E-Commerce Gesetz, §14 Unternehmensgesetzbuch, §63 Gewerbeordnung und Offenlegungspflicht laut §25 Mediengesetz.</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "index-impressum",
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:2, text:"Impressum", link:"/impressum"} });
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        })

        window.addEventListener("load", () => {
            this.$nuxt.$loading.finish();
        });
    },
    head() {
      return {
          title: "Impressum - OKAY Ybbs",
          meta: [
              {
                  name: "description",
                  content: "Das Impressum von OKAY Ybbs - Offene Kultur aus Ybbs"
              },
              {
                  name: "keywords",
                  content: "Impressum, Vereinssitz Ybbs,"
              }
          ]
      }
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/variable.scss";

.header {
    @include font($header-font-name, 3rem, white, bold);
    margin-bottom: 5vh;
}

h2 {
    @include font($header-font-name, 2rem, white, 600);
    margin-bottom: 1rem;
}

p {
    @include font($flow-font-name, 1rem, white);
    margin-bottom: 1.5rem;
}

ul {
    @include font($flow-font-name, 1rem, white);

    .break {
        margin-top: 1rem;
    }
}

.height-100 {
    min-height: 100vh;
}
</style>