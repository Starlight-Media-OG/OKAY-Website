<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

useHead({
    title: "Kalender - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "description",
            content:
                "Alle Events in einem Kalender sortiert und monatlich dargestellt",
        },
    ],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({ step: 1, text: "Startseite", link: "/" });
breadcrumbStore.addBreadcrumb({
    step: 2,
    text: "Kalender",
    link: "/calender",
});
</script>

<template>
    <main class="root flex flex-center">
        <section class="row header flex flex-center">
            <div class="title">
                <h1>Kalender</h1>
            </div>
        </section>
        <section class="content">
            <calender />
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/style/variable.scss";

main {
    $header-height: 40vh;

    .header {
        height: $header-height;

        h1 {
            font-size: 20vh;

            @media screen and (max-width: $breakpoint-medium-max) {
                font-size: 10vh;
                margin-bottom: 5vh;
            }
        }
    }
}

.content {
    max-width: 80vw;
    margin: 0;
    padding: 0;
}

@media print {
    .header {
        display: none;
    }
}
</style>
