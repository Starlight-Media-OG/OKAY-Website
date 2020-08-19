<template>
    <div class="mainCard">
        <div class="column">
            <div class="image">
                <img :src="this.image" :alt="this.title" class="image-col">
            </div>
        </div>
        <div class="column content">
            <div class="header">
                <div class="title column">
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
                <p>{{trimString(this.teaser, 700)}}</p>
            </div>
            <div class="teaser-news" v-if="date == null">
                <p>{{trimString(this.teaser, 700)}}</p>
            </div>
            <div class="button">
                <nuxt-link :to="concat('/events/', this.id)" class="button-text">Weitere Informationen</nuxt-link>
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
            id: Number
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
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/style/components/card.scss';
</style>