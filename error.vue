<script setup lang="ts">
import { useBreadcrumbStore } from "~/store/breadcrumb.store";
import type { NuxtError } from "#app";

const props = defineProps({
    error: Object as () => NuxtError,
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
</script>

<template>
    <div v-if="props.error?.statusCode === 404">
        <NotFound style="margin-top: -5vh" />
    </div>
</template>
