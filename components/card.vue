<template>
    <div
        class="mainCard"
        :style="{ 'background-color': cardColor, color: fontColor }"
    >
        <div class="column">
            <div class="image">
                <img
                    :src="this.showImage"
                    :alt="this.title"
                    class="image-col"
                />
            </div>
        </div>
        <div class="column content">
            <div class="header">
                <div class="date column" v-if="duration">
                    <p>{{ this.datum }} - {{ this.endDatum }}</p>
                </div>
                <div class="date column" v-if="!duration">
                    <p>{{ this.datum }}</p>
                </div>
                <div class="card-title column">
                    <h2>{{ this.title }}</h2>
                </div>
            </div>
            <div
                class="teaser-news"
                v-html="trimString(this.teaser, 300)"
            ></div>
            <div v-if="!news && !projects">
                <nuxt-link
                    :to="concat('/events/', this.id)"
                    class="ignoreTag"
                    :aria-label="'Gehe zu ' + this.title"
                >
                    <div
                        class="button"
                        :style="{ 'background-color': buttonColor }"
                    >
                        <p
                            class="button-text"
                            :style="{ color: buttonFontColor }"
                        >
                            Weitere Informationen...
                        </p>
                    </div>
                </nuxt-link>
            </div>
            <div v-if="news">
                <nuxt-link
                    :to="concat('/news/', this.id)"
                    class="ignoreTag"
                    :aria-label="'Gehe zu ' + this.title"
                >
                    <div
                        class="button"
                        :style="{ 'background-color': buttonColor }"
                    >
                        <p
                            class="button-text"
                            :style="{ color: buttonFontColor }"
                        >
                            Weitere Informationen...
                        </p>
                    </div>
                </nuxt-link>
            </div>
            <div v-if="projects">
                <nuxt-link
                    :to="concat('/projects/', this.id)"
                    class="ignoreTag"
                    :aria-label="'Gehe zu ' + this.title"
                >
                    <div
                        class="button"
                        :style="{ 'background-color': buttonColor }"
                    >
                        <p
                            class="button-text"
                            :style="{ color: buttonFontColor }"
                        >
                            Weitere Informationen...
                        </p>
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
        projects: Boolean,
    },
    methods: {
        trimString: function (txt, length) {
            if (txt.length > length) {
                return txt.substr(0, length) + "...";
            } else {
                return txt + "...";
            }
        },
        concat: function (...strings) {
            let conString = "";
            strings.forEach((arg, index) => {
                conString += arg;
            });
            return conString;
        },
    },
    computed: {
        duration: function () {
            return this.endDate != null && this.date != null;
        },
        cardColor: function () {
            if (this.events) {
                return "#00629B";
            } else if (this.news) {
                return "#FFC72C";
            } else if (this.projects) {
                return "#dedede";
            }
        },
        buttonColor: function () {
            if (this.events) {
                return "#FFC72C";
            } else if (this.news) {
                return "#00629B";
            } else if (this.projects) {
                return "#FFC72C";
            }
        },
        fontColor: function () {
            if (this.events) {
                return "#fff";
            } else if (this.news) {
                return "#000";
            } else if (this.projects) {
                return "#000";
            }
        },
        buttonFontColor: function () {
            if (this.events) {
                return "#000";
            } else if (this.news) {
                return "#fff";
            } else if (this.projects) {
                return "#000";
            }
        },
        datum: function () {
            return new Date(this.date).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
        endDatum: function () {
            return new Date(this.endDate).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
        showImage: function () {
            if (this.image.includes(null) || this.image.charAt(0) != "h") {
                return useRuntimeConfig().public.defaultImage;
            } else {
                return this.image;
            }
        },
    },
};
</script>

<style scoped lang="scss">
@import "../assets/style/components/card.scss";
</style>
