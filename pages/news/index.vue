<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

const news = await useFetch(
    useRuntimeConfig().public.baseURL + "/news",
).then((res) => {
    if (!res.data.value) {
        return [];
    }

    return res.data.value.map((news) => {
        return {
            ...news,
            anreisser: news.anreisser === '' ? news.bericht : news.anreisser,
        }
    });
});

useHead({
    title: "News- OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "description",
            content:
                "Alle Nachrichten betreffend Kultur aus dem wunderschönen Ybbs an der Donau und der Umgebung",
        },
    ],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({
    step: 1,
    text: "Startseite",
    link: "/",
});
breadcrumbStore.addBreadcrumb({
    step: 2,
    text: "News",
    link: "/news",
});
</script>

<template>
    <main class="root flex flex-center">
        <section class="row flex flex-center header">
            <div class="svgGraphic">
                <img
                    src="/animations/news.gif"
                    alt="Nachrichtenstapel Animation"
                />
            </div>
            <div class="flex-break"></div>
            <div class="title">
                <h1>News</h1>
            </div>
        </section>
        <section class="content flex flex-center" style="margin-bottom: 10vh">
            <div class="news" v-for="news1 in news" :key="news1.nId">
                <Card
                    :title="news1.titel"
                    :teaser="news1.anreisser"
                    :image="news1.bilder_path + '/plakat.jpg'"
                    :id="news1.nId"
                    :date="news1.datum"
                    news
                />
            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/style/variable.scss";

main {
    overflow: hidden;

    .header {
        z-index: -98;

        h1 {
            font-size: 20vh;

            @media screen and (max-width: $breakpoint-medium-max) {
                font-size: 10vh;
            }
        }
    }

    .svgGraphic {
        margin-top: 5vh;
        z-index: -99;

        @media screen and (max-width: $breakpoint-medium-max) {
            display: none;
        }
    }

    .content {
        margin-top: 5vh;
    }
}
</style>
