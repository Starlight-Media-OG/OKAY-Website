<template>
  <article class="mainCard">
    <div class="column">
      <div class="image">
        <img :src="this.imgPath" :alt="this.title" class="image-col">
      </div>
    </div>
    <div class="content">
      <div class="header">
        <div class="title">
          <h1>{{ this.title }}</h1>
        </div>
      </div>
      <div class="subheader">
        <div class="price">
          <h3>{{ this.preis }} €</h3>
        </div>
      </div>
      <div>
        <nuxt-link :to="concat('/products/', this.id)" class="ignoreTag">
          <div class="button">
            <p class="button-text">Weitere Informationen</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "productCard",
  props: {
    title: String,
    preis: String,
    imgPath: String,
    id: String
  }, methods: {
    concat: function (...strings) {
      let conString = "";
      strings.forEach((arg, index) => {
        conString += arg;
      });
      return conString;
    }
  },
}
</script>

<style scoped lang="scss">
@import '../assets/style/variable.scss';

.mainCard {
  background-color: $primary-blue;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, .20), -5px -5px 15px rgba(255, 255, 255, .20);
  border-radius: 6px;
  margin-bottom: 20vh;
  padding-bottom: 1vh;

  .image {
    width: 80%;
    display: block;
    margin: 0 auto;
    transform: translateY(-25%);

    .image-col {
      width: 100%;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, .20);
    }

  }

  .content {
    $title-size: 3vh;
    $date-size: 2vh;
    $flow-size: 1rem;
    width: 90%;
    margin-top: -25%;
    margin-left: auto;
    margin-right: auto;

    .header {
      .title {
        @include font($header-font-name, $title-size, white, bold);
        line-height: 6vh;
        margin-bottom: .5rem;
      }
    }

    .header, .subheader {
      margin-left: 5%;
    }

    .subheader {
      .price {
        @include font($flow-font-name, $flow-size, white, 600);
      }

    }

    .button {
      background-color: lighten($primary-blue, 10%);
      width: 90%;
      border-radius: 6px;
      text-align: center;
      margin: 2vh auto;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 45px;

      .button-text {
        width: 100%;
        height: 100%;
        @include font($flow-font-name, 1.2rem, white, 700);
        text-decoration: none;
      }

    }
  }
}

.ignoreTag {
  text-decoration: none;
}
</style>