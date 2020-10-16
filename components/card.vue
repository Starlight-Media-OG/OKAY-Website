<template>
    <div class="mainCard"  :style="{'background-color': cardColor, 'color': fontColor}">
        <div class="column">
            <div class="image">
                <img :src="this.image" :alt="this.title" class="image-col">
            </div>
        </div>
        <div class="column content">
            <div class="header">
                <div class="card-title column">
                    <h1>{{this.title}}</h1>
                </div>
                <div class="date column" v-if="duration">
                    <p>{{this.date}} - {{this.endDate}}</p>
                </div>
                <div class="date column" v-if="!duration">
                    <p>{{this.date}}</p>
                </div>
            </div>
            <div class="teaser" v-if="date != null">
                <p>{{trimString(this.teaser, 300)}}</p>
            </div>
            <div class="teaser-news" v-if="date == null">
                <p>{{trimString(this.teaser, 300)}}</p>
            </div>
            <div v-if="!news">
                <nuxt-link :to="concat('/events/', this.id)" class="ignoreTag">
                  <div class="button" :style="{'background-color': buttonColor}">
                    <p  class="button-text" :style="{'color': fontColor}">Weitere Informationen...</p>
                  </div>
                </nuxt-link>
            </div>
            <div v-if="news">
                <nuxt-link :to="concat('/news/', this.id)" class="ignoreTag">
                  <div class="button" :style="{'background-color': buttonColor}">
                    <p class="button-text" :style="{'color': fontColor}">Weitere Informationen...</p>
                  </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card",
        props: {
            title: String,
            teaser: String,
            image: String,
            date: String,
            endDate: String,
            id: Number,
            news: Boolean,
            events: Boolean,
            projects: Boolean
        }, methods: {
            trimString: function (txt, length) {
                if (txt.length > length) {
                    return txt.substr(0, length) + "...";
                } else {
                    return txt;
                }
            },
            concat: function (...strings) {
                let conString = "";
                strings.forEach((arg, index) => {
                    conString += arg;
                });
                return conString;
            }
        },
        computed: {
            duration: function () {
                return this.endDate != null && this.date != null
            },
            cardColor: function () {
                if(this.events) {
                    return "#003865"
                } else if (this.news) {
                    return "#FFDB24"
                } else if (this.projects) {
                    return "#dedede"
                }
            },
            buttonColor: function () {
                if(this.events) {
                    return "#004e96"
                } else if (this.news) {
                    return "#fae057"
                } else if (this.projects) {
                    return "#efefef"
                }
            },
            fontColor: function() {
                if(this.events) {
                    return "#dedede"
                } else if (this.news) {
                    return "#2f2f2f"
                } else if (this.projects) {
                    return "#2f2f2f"
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/style/components/card.scss';
</style>