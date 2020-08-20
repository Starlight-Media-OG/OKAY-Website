<template>
    <main class="root flex flex-center">
        <section class="row-12 header">
            <div class="title col-3">
                Kalender
            </div>
        </section>
        <section class="content">
            <calender />
        </section>
    </main>
</template>

<script>
    import calender from "../../components/calender/calender";

    export default {
        name: "indexCalender",
        components: {
            calender
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/style/variable.scss';

    main {
        $header-height: 40vh;
        .header

    {
        height: $header-height;
        margin-top: 15vh;
        padding-left: 20vw;
        transform: rotate(-8deg);
    }

    }

    .content {
        max-width: 80vw;
        margin: 0;
        padding: 0;
    }
</style>