<template>
  <article class="mainCard">
    <div class="column">
      <div class="image">
        <img :src="this.bild_pfad" :alt="this.person.vorname + ' ' + this.person.nachname" class="image-col">
      </div>
    </div>
    <div class="content">
      <div class="header">
        <div class="card-title">
          <h1>{{this.person.titel}} {{ this.person.vorname }} {{this.person.nachname}}</h1>
        </div>
      </div>
      <div class="body">
        <p>{{this.person.beschreibung}}</p>
      </div>
    </div>
  </article>
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
      titel: "",
      bild_pfad: "http://server.okay-ybbs.at:4000/mitglied/1/portrait.png",
      email: "philipp@dvorak.work",
      beschreibung: "Projektleiter, Website"
    }
  }
}
</script>

<style scoped lang="scss">
@import "teamCard";
</style>