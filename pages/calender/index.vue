<template>
    <main class="root flex flex-center">
        <section class="row-12 header">
            <div class="title col-12">
                <p>Kalender</p>
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
        .row-12

    {
        height: 100vh;
    }

    .header {
        height: $header-height;
        margin-left: -20vw;
        transform: rotate(-8deg);
    }
    }
</style>