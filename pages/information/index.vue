<template>
  <main class="root flex flex-center">
    <section class="row-12 flex flex-center header">
      <div class="title" style="margin-top: 5vh">
        Über Uns
      </div>
    </section>
    <section class="content flex flex-center">
      <div class="area flex flex-center">
        <div class="smallSize">
          <h2>Der Vorstand</h2>
          <!-- Insert Team Cards here -->
        </div>
      </div>
      <div class="area flex flex-center">
        <div class="smallSize">
          <h2>Mitglieder</h2>
          <!-- Insert Team Cards here -->
        </div>
      </div>
      <div class="area flex flex-center">
        <div class="smallSize">
          <h2>Projekte</h2>
        </div>
      </div>
      <div class="area flex flex-center">
        <div class="smallSize">
          <h2>Statuten</h2>
          <accordion :contents="content" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import accordion from "@/components/accordion/accordion";
import VueFaqAccordion from 'vue-faq-accordion'

export default {
  name: "infrormation",
  components: {
    accordion, VueFaqAccordion
  },
  data: function() {
    return {
      teamList: [10,20,30],
      content: [
        {
          title: "§1",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          active: false
        },
        {
          title: "§2",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          active: false
        },
        {
          title: "§3",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          active: false
        },
      ]
    }
  },
  head() {
    return {
      title: "Über Uns - OKAY Ybbs",
      meta: [
      ]
    }
  }
}
</script>

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

  &:hover {
    cursor: pointer;
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
  width: 100vw;
  margin: 10vh 0;
  color: white;

  h4 {
    color: white;
    font-size: 3vh;
    text-align: center;
  }

  p {
    margin-bottom: 2vh;
  }

  .area {
    background-color: $primary-blue;
    padding: 5vh 0;
    width: 100%;

    h4 {
      padding-bottom: 2vh;
    }

    &:nth-child(odd) {
      background-color: transparent;
    }

    .smallSize {
      width: 80%;
    }

  }

  .accordion {
    background-color: #2f2f2f;
  }
}
</style>