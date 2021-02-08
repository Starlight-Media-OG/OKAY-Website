<template>
    <div class="accordion flex flex-center">
      <div class="accordion-item" v-for="(content, index) in contents" :key="index">
        <div class="accordion-title">
          <div class="accordion-header">
            <a class="fakeLink" v-on:click="expand(index)">
              <div class="accordion-header-div">{{ content.title }}</div>
              <div class="accordion-header-div flex flex-right">
                <div class="accordion-caret"></div>
              </div>
            </a>
          </div>
        </div>
        <div class="accordion-body">
          <div class="accordion-content">
              <p v-html="content.text"></p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { TweenLite,Elastic,Bounce, gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

export default {
  name: "accordion",
  props: {
    contents: Array
  },
  methods: {
    expand: function(i) {
      gsap.registerPlugin(CSSPlugin);

      let el = document.getElementsByClassName("accordion-body")[i];

      if (this.contents[i].active === false) {
        this.contents[i].active = true;

        TweenLite.to(el, 1, {
          height: el.scrollHeight,
          ease: Elastic.easeOut.config(1, 0.3)
        });
      } else {
        this.contents[i].active = false;

        TweenLite.to(el, 0.5, {
          height: 0,
          ease: Bounce.easeOut
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "accordion";
</style>