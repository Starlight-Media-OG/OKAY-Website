<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

const id = useRoute().params.id;
const router = useRouter();
const breadcrumbStore = useBreadcrumbStore();

useHead({
    title: "Bildergallerie - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "description",
            content: "Bildergallerie der News/Events/Produkte von OKAY",
        },
        {
            name: "robots",
            content: "noindex",
        },
    ],
});

const name = ref("");
const untertitel = ref("");
const bild = ref("");

await useFetch(useRuntimeConfig().public.baseURL + "/events/" + id).then(
    (response) => {
        if (!response.data.value) {
            return;
        }

        name.value = response.data.value.titel;
        untertitel.value = response.data.value.untertitel;
        bild.value =
            response.data.value.bilder_path != null
                ? response.data.value.bilder_path + "/plakat.jpg"
                : useRuntimeConfig().public.defaultImage;
    },
);

breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({ step: 1, text: "Startseite", link: "/" });
breadcrumbStore.addBreadcrumb({ step: 2, text: "Events", link: "/events" });
breadcrumbStore.addBreadcrumb({ step: 3, text: id, link: `/events/${id}` });
breadcrumbStore.addBreadcrumb({
    step: 4,
    text: "Bilder",
    link: `/images/${id}`,
});
</script>

<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="router.back()">
                    <em class="underline"> < Zurück zur Übersicht </em>
                </p>
                <h1 class="title col-4">{{ name }} - {{ untertitel }}</h1>
                <p class="date">Bildergalerie</p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="bild" alt="Plakat" width="100%" />
            </div>
        </section>
        <section class="content col-12" style="margin-bottom: 0">
            <gallery :id="id" type="event" :img-path="bild"/>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/style/variable.scss";

@import "../../assets/style/_id.scss";
</style>
