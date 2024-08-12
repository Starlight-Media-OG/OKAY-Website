<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

const router = useRouter();
const id = useRoute().params.id;

const event = await useFetch(
    useRuntimeConfig().public.baseURL + "/events/" + id,
).then((res) => {
    if (!res.data.value) {
        return {};
    }

    return {
        ...res.data.value,
        name: res.data.value.titel,
        bild:
            res.data.value.bilder_path != null
                ? res.data.value.bilder_path + "/plakat.jpg"
                : useRuntimeConfig().public.defaultImage,
        date: new Date(res.data.value.start_datum).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        end_date: new Date(res.data.value.end_datum).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        days: res.data.value.zeiten,
        adresse: res.data.value.adresse,
    };
});

const { data: koms } = await useFetch(
    useRuntimeConfig().public.baseURL + "/kommentare/getKommentare/" + id,
) ?? { data: [] };

useHead({
    title: event?.name + " - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "description",
            content: event?.beschreibung,
        },
        {
            name: "keywords",
            content:
                "KIZ, Vereinshaus, OKAY, Konzert, Ausstellung, Bildergallerie, Vorlesung",
        },
        {
            name: "robots",
            content: "noindex, nofollow",
        },
    ],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({ step: 1, text: "Startseite", link: "/" });
breadcrumbStore.addBreadcrumb({ step: 2, text: "Events", link: "/events" });
breadcrumbStore.addBreadcrumb({
    step: 3,
    text: id,
    link: "/events/" + id,
});

function concat(...strings) {
    return strings.join("");
}

function scrollTo(target) {
    let options = {
        container: "body",
        easing: "ease-in-out",
        force: true,
        cancelable: false,
        offset: -100,
        x: false,
        y: true,
    };

    // TODO: Replace event fuckting shit with scroll-to plugin
    event.$scrollTo(target, 500, options);
}

function images() {
    let images = [];

    for (const kom of event.koms) {
        if (kom.bilder_path != null) {
            if (process.client) {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", kom.bilder_path, false);
                xhr.send();

                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);

                    for (let image of data.data) {
                        let obj = {
                            id: kom.komId,
                            image:
                                process.env.baseImage +
                                image.replace("server/uploads", ""),
                        };

                        images.push(obj);
                    }
                }
            }
        }
    }

    return images;
}

function timeFormatter(time) {
    let splitted = time.split(":");
    return splitted[0] + ":" + splitted[1];
}

const showTime = computed(() => !!event.days)
</script>

<template>
    <main class="root flex flex-center" style="margin-bottom: 0" v-if="!!event">
        <section class="row flex flex-center header">
            <div class="title col-4">
                <p class="back" @click="router.back()">
                    <em class="underline"> < Zurück zur Übersicht </em>
                </p>
                <h1 class="title col-4">
                    {{ event.name }} - {{ event.untertitel }}
                </h1>
                <p class="date" v-if="event.end_date !== ''">
                    Am {{ event.date }}
                </p>
                <p class="date" v-else>
                    Von {{ event.date }} bis {{ event.end_date }}
                </p>
                <p
                    class="address"
                    v-if="event.adresse !== '' || event.adresse != null"
                >
                    {{ event.adresse }}
                </p>
                <p></p>
            </div>
            <div class="image col-5">
                <img :src="event.bild" :alt="event.name" width="100%" />
            </div>
        </section>
        <section id="content" class="content flex flex-center">
            <article class="beschreibung col-9" style="padding: 1rem">
                <div class="bes" v-html="event.beschreibung"></div>
                <div class="dateOpen" v-if="showTime">
                    <h2>Öffnungszeiten</h2>
                    <p
                        v-for="day in event.days"
                        :key="day.wochentag"
                        class="opening flex flex-center"
                    >
                        {{ day.wochentag }} von
                        {{ timeFormatter(day.start_zeit) }} bis
                        {{ timeFormatter(day.end_zeit) }}
                    </p>
                </div>
            </article>
            <div class="flex-break"></div>
            <div
                class="link flex flex-center"
                v-if="
                    event.bilder_path !== null ||
                    event.bilder_path !== '' ||
                    event.bilder_path !== undefined
                "
            >
                <nuxt-link :to="concat('/images/', id)" class="further-link"
                    >Zu den Bildern</nuxt-link
                >
            </div>
            <section class="commentBox flex flex-center" v-if="koms">
                <commentBox :koms="koms" :images="images()" :eId="id" />
            </section>
        </section>
    </main>
</template>

<style scoped lang="scss">
@import "../../assets/style/_id.scss";
</style>
