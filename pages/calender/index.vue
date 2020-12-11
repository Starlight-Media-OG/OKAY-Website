<template>
    <main class="root flex flex-center">
        <section class="row header">
            <div class="title col-3">
                Kalender
            </div>
        </section>
        <section class="content">
            <calender/>
        </section>
    </main>
</template>

<script>
import calender from "../../components/calender/calender";

export default {
    name: "indexCalender",
    components: {
        calender
    },
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", {todo: {step: 1, text: "Startseite", link: "/"}});
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", {
            todo: {
                step: 2,
                text: "Kalender",
                link: "/calender"
            }
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });

        window.addEventListener("load", () => {
            this.$nuxt.$loading.finish();
        });
    },
    head () {
        return {
            title: "Kalender - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: "description",
                    content: "Alle Events in einem Kalender sortiert und monatlich dargestellt"
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

main {
    $header-height: 40vh;

    .header {
        height: $header-height;
        margin-top: 15vh;
        padding-left: 20vw;
        transform: rotate(-8deg);

        @media screen and (max-width: $breakpoint-large-max) {
            padding-left: 0;
            margin-left: -10vw;
            margin-top: 0;
        }

        .title {
            @media screen and (max-width: $breakpoint-medium-max) {
                font-size: 8vh;
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