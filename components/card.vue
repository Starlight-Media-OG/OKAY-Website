<script setup>
const props = defineProps({
    title: String,
    teaser: String,
    image: String,
    date: String,
    endDate: String,
    id: Number,
    news: Boolean,
    events: Boolean,
    projects: Boolean,
});

const trimString = (txt, length) => {
    if(txt.length < length) {
        return txt;
    }

    if (txt.length > length) {
        return txt.substr(0, length) + '...';
    } else {
        return txt + '...';
    }
};

const concat = (...strings) => {
    let conString = '';
    strings.forEach((arg) => {
        conString += arg;
    });
    return conString;
};

const duration = computed(() => {
    return props.endDate != null && props.date != null;
});

const cardColor = computed(() => {
    if (props.events) {
        return '#00629B';
    } else if (props.news) {
        return '#FFC72C';
    } else if (props.projects) {
        return '#dedede';
    }
});

const buttonColor = computed(() => {
    if (props.events) {
        return '#FFC72C';
    } else if (props.news) {
        return '#00629B';
    } else if (props.projects) {
        return '#FFC72C';
    }
});

const fontColor = computed(() => {
    if (props.events) {
        return '#fff';
    } else if (props.news) {
        return '#000';
    } else if (props.projects) {
        return '#000';
    }
});

const buttonFontColor = computed(() => {
    if (props.events) {
        return '#000';
    } else if (props.news) {
        return '#fff';
    } else if (props.projects) {
        return '#000';
    }
});

const datum = computed(() => {
    return new Date(props.date).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

const endDatum = computed(() => {
    return new Date(props.endDate).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

const showImage = computed(() => {
    if (props.image.includes(null) || props.image.charAt(0) != 'h') {
        return useRuntimeConfig().public.defaultImage;
    } else {
        return props.image;
    }
});
</script>

<template>
    <div
        class="mainCard"
        :style="{ 'background-color': cardColor, color: fontColor }"
    >
        <div class="column">
            <div class="image">
                <img
                    :src="showImage"
                    :alt="title"
                    class="image-col"
                />
            </div>
        </div>
        <div class="column content">
            <div class="header">
                <div class="date column" v-if="duration">
                    <p>{{ datum }} - {{ endDatum }}</p>
                </div>
                <div class="date column" v-if="!duration">
                    <p>{{ datum }}</p>
                </div>
                <div class="card-title column">
                    <h2>{{ title }}</h2>
                </div>
            </div>
            <div
                class="teaser-news"
                v-html="trimString(teaser, 300)"
            ></div>
            <div v-if="!news && !projects">
                <nuxt-link
                    :to="concat('/events/', id)"
                    class="ignoreTag"
                    :aria-label="'Gehe zu ' + title"
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
                    :to="concat('/news/', id)"
                    class="ignoreTag"
                    :aria-label="'Gehe zu ' + title"
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
                    :to="concat('/projects/', id)"
                    class="ignoreTag"
                    :aria-label="'Gehe zu ' + title"
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

<style scoped lang="scss">
@import "../assets/style/components/card.scss";
</style>