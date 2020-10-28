<template>

</template>

<script>
export default {
  name: "index-impressum",
    created() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:1, text:"Startseite", link:"/"} });
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step:2, text:"Impressum", link:"/impressum"} });
    }
}
</script>

<style scoped>

</style>