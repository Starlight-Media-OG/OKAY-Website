<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

const id = useRoute().params.id;
const router = useRouter();
const news = await useFetch(
    useRuntimeConfig().public.baseURL + "/news/" + id,
).then((res) => {
    if (!res.data.value) {
        return {};
    }

    return {
        name: res.data.value.titel,
        beschreibung: res.data.value.bericht,
        date: new Date(res.data.value.datum).toLocaleDateString("de-AT", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        bild: !!res.data.value.bilder_path
            ? res.data.value.bilder_path + "/plakat.jpg"
            : useRuntimeConfig().public.defaultImage,
    };
});

useHead({
    title: news?.name + " - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "robots",
            content: "noindex",
        },
        {
            name: "description",
            content: news?.beschreibung,
        },
    ],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({ step: 1, text: "Startseite", link: "/" });
breadcrumbStore.addBreadcrumb({ step: 2, text: "News", link: "/news" });
breadcrumbStore.addBreadcrumb({ step: 3, text: id, link: "/news/" + id });
</script>

<template>
    <main class="root flex flex-center" v-if="!!news">
        <section class="row flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="router.back()">
                    <em class="underline"> < Zurück zur Übersicht </em>
                </p>
                <h1 class="title col-4">
                    {{ news.name }}
                </h1>
                <p class="date">Vom {{ news.date }}</p>
            </div>
            <div class="image col-5">
                <img :alt="news.name" :src="news.bild" width="100%" />
            </div>
        </section>
        <section class="content flex flex-center">
            <article
                class="beschreibung-news col-9"
                style="margin-top: 0"
                v-html="news.beschreibung"
            ></article>
            <section class="galleryBox">
                <gallery
                    :id="id"
                    :imgPath="
                        news.bilder_path != null ||
                        news.bilder_path != '' ||
                        news.bilder_path != 'NULL'
                            ? news.bilder_path
                            : null
                    "
                    type="news"
                />
            </section>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/style/_id.scss";
</style>
