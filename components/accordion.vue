<template>
  <div class="accordion">
    <div v-for="(content, index) in contents" class="accordion-title">
      <div class="accordion-header">
        <a class="fakeLink" v-on:click="expand(index)">
          <div class="accordion-header-div">{{ content.title }}</div>
          <div class="accordion-header-div">
            <div class="accordion-caret"></div>
          </div>
        </a>
      </div>
      <div class="accordion-body" v-bind:ref="'accordion-body-' + index">
        <div class="accordion-content">{{ content.paragraph }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenLite } from "gsap";

export default {
  name: "accordion",
  props: {
    contents: Array
  },
  methods: {
    expand: function(i) {

    }
  }
}
</script>

<style lang="scss" scoped>
.accordion-caret {
  background-image: linear-gradient(to top right, transparent 50%, #727272 50%);
  width: 0.5rem;
  height: 0.5rem;
  transform: rotate(-45deg);
}

.fakeLink {
  cursor: pointer;
}
</style>