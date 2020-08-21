<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title col-3">
                <p class="back" @click="$router.back()">
                    <em class="underline">
                        < Zurück zur Übersicht
                    </em>
                </p>
                <p v-for="titlePart in title">
                    {{titlePart}}
                </p>
                <p class="date">
                    Bildergallerie
                </p>
                <p></p>
            </div>
            <div class="image col-4">
                <img :src="this.bild" alt="this.name" width="100%" />
            </div>
        </section>
        <section class="content flex flex-center">
            <gallery :path="this.path" />
        </section>
    </main>
</template>

<script>
    export default {
        name: "imageGallery",
        data() {
            return {
                name: String,
            }
        },
        computed: {
            path: function () {
                return "img/" + this.$roue.params.id + "/";
            },
            titlePart: function () {
                return this.name.split(" ");
            }
        },
        async fetch() {
            //Fetch Name of Event from api
        }
    }
</script>

<style scoped lang="scss">
</style>