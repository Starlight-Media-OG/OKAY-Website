<template>
    <article class="mainCard">
        <div class="content">
            <div class="header">
                <div class="card-title">
                    <h1>
                        {{ this.person.titel }} {{ this.person.vorname }}
                        {{ this.person.nachname }}
                    </h1>
                </div>
            </div>
            <div class="body">
                <p>{{ this.person.beschreibung }}</p>
            </div>
        </div>
    </article>
</template>

<script>
import axios from "axios";

export default {
    name: "teamCard",
    props: {
        id: Number,
    },
    data: function () {
        return {
            person: {},
        };
    },
    async fetch() {
        let id = this.$props.id;

        let req = await axios.get(
            useRuntimeConfig().public.baseURL + "/mitglieder/" + id,
        );
        let person = req.data;

        this.person = person;
    },
};
</script>

<style scoped lang="scss">
@import "teamCard";
</style>
