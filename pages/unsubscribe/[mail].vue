<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({
    step: 1,
    text: "Startseite",
    link: "/",
});

const mail = useRoute().params.mail;
const error = ref("");
const success = ref("");

await useFetch(
    useRuntimeConfig().public.baseURL + "/mailadressen/" + mail,
).then((req) => {
    if (!req.data.value) {
        error.value =
            "Ihre Mail Adresse konnte nicht gefunden werden. Falls Sie sich nicht abmelden können schreiben Sie uns eine Mail an: <a href='mailto:kulturverein@okay-ybbs.at'>kulturverein@okay-ybbs.at</a>";
        return;
    }

    $fetch(
        useRuntimeConfig().public.baseURL +
            "/newsletter/" +
            req.data.value.mailerId,
        {
            method: "DELETE",
        },
    ).then((response) => {
        if (repsonse.status.value < 200 || response.status.value >= 400) {
            error.value =
                "Ihre Mail Adresse konnte nicht gefunden werden. Falls Sie sich nicht abmelden können schreiben Sie uns eine Mail an: <a href='mailto:kulturverein@okay-ybbs.at'>kulturverein@okay-ybbs.at</a>";
        }

        $fetch(
            useRuntimeConfig().public.baseURL + "/mailadressen/" + mailId,
        ).then(() => {
            success.value =
                "Sie wurden erfolgreich vom Newsletter abgemeldet! Schade dass Sie uns verlassen😢.";
        });
    });
});
</script>

<template>
    <div class="flex flex-center" style="height: 80vh">
        <div class="row danger" v-if="!!error" v-html="error"></div>
        <div class="row success-alert" v-if="!!success">
            {{ success }}
        </div>

        <div class="row">
            <div class="link center" style="margin-top: 2rem">
                <nuxt-link
                    class="further-link"
                    to="/"
                    aria-label="Zu den Events"
                >
                    <em class="underline">Zur Startseite</em>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
