<template>
</template>

<script>
export default {
  name: "teamCard",
  props: {
    id: Number
  },
  data: function () {
    return {
      person: {}
    }
  },
  async fetch() {
    //API Call with API to get details

    this.person = {
      vorname: 'Philipp',
      nachname: 'Dvorak',
      titel: "Ing.",
      bild_pfad: "mitglied/1/portrait.png",
      email: "philipp@dvorak.work"
    }
  }
}
</script>

<style scoped lang="scss">
@import "teamCard";
</style>