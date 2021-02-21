 <template>
    <div v-if="error.statusCode === 404">
        <page style="margin-top: -5vh;"/>
    </div>
</template>

<script>
import page from '~/components/404/404.vue';

export default {
    name: "error",
    components: {
        page
    },
    props: [
        'error'
    ],
    mounted() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit('breadcrumbs/addPositionedBreadcrumb', {todo: {step: 1, text: "Startseite", link: "/"}});
    }
}
</script>

<style scoped>

</style>