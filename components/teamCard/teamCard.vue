<script setup>
const { id } = defineProps({
    id: Number,
});

const { data: person } = await useFetch(
    `${useRuntimeConfig().public.baseURL}/mitgleider/${id}`,
);
</script>

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

<style scoped lang="scss">
@import "teamCard";
</style>
