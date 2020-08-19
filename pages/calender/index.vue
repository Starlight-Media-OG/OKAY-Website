<template>
    <div class="root flex flex-center">
        <header class="row">
            <div class="title col-12">
                <p>Kalender</p>
            </div>
        </header>
        <main>
            <calender />
        </main>
    </div>
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

<style scoped>

</style>