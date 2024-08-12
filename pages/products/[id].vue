<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

const id = useRoute().params.id;
const product = await useFetch(
    `${useRuntimeConfig().public.baseURL}/produkte/${id}`,
).then((res) => {
    if (!res.data.value) {
        return {};
    }

    const formatAddress = (address) => {
        // splits address into 1. street 2. house number 3. city 4. postal code
        const addressPart = address.split(";");
        return `${addressPart[0]} ${addressPart[1]}, ${addressPart[3]} ${addressPart[2]}`;
    };

    return {
        ...res.data.value,
        name: res.data.value.bezeichnung,
        price: res.data.value.preis,
        bild:
            res.data.value.bilder_path != null
                ? res.data.value.bilder_path + "/plakat.jpg"
                : useRuntimeConfig().public.defaultImage,
        orte: [
            ...res.data.value.orte.map((ort) => {
                return {
                    ortId: ort.ortId,
                    name: ort.name,
                    adresse: formatAddress(ort.adresse),
                };
            }),
        ]
    };
});

useHead({
    title: product?.name + " - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "robots",
            content: "noindex",
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
    text: "Produkte",
    link: "/products",
});
breadcrumbStore.addBreadcrumb({
    step: 3,
    text: id,
    link: "/products/" + id,
});
</script>

<template>
    <main class="root flex flex-center" v-if="!!product">
        <section class="row flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="$router.back()">
                    <em class="underline"> < Zurück zur Übersicht </em>
                </p>
                <h1 class="title col-4">
                    {{ product.name }}
                </h1>
                <p class="date">Für {{ product.price.toString().replace('.', ',') }} €</p>
            </div>
            <div class="image col-5">
                <img :alt="product.name" :src="product.bild" width="100%" />
            </div>
        </section>
        <section class="content flex flex-center" style="margin-bottom: 0">
            <article class="beschreibung col-9" style="padding: 1rem">
                <div class="bes" v-html="product.beschreibung"></div>
                <div class="dateOpen">
                    <h2>Abholungsorte</h2>
                    <ul>
                        <li
                            v-for="ort in product.orte"
                            :key="ort.ortId"
                            class="opening flex flex-center"
                        >
                            {{ ort.name }} @ {{ ort.adresse }}
                        </li>
                    </ul>
                </div>
            </article>
            <section class="galleryBox">
                <gallery
                    :id="id"
                    :imgPath="product.bilder_path"
                    type="products"
                />
            </section>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/style/_id.scss";
</style>
