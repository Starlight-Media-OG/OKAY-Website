<template>
    <div>
        <navbar class="nav" />
        <nuxt />
        <foot class="foot" />
    </div>
</template>

<script>
    import navbar from '~/components/navbar.vue';
    import foot from '~/components/foot.vue';

    export default {
        layout: 'default',
        components: {
            navbar, foot
        }
    }
</script>

<style lang="scss">
    @import '../assets/style/variable.scss';

    @media screen and (max-width: $breakpoint-small-max), handheld {
        @import '../assets/style/style-Mobile.scss';
    }

    @media screen and (min-width: $breakpoint-medium) and (max-width: $breakpoint-large-max) {
        @import '../assets/style/style-Tablet.scss';
    }

    @media screen and (min-width: $breakpoint-xlarge) {
        @import '../assets/style/style-PC.scss';
    }

    @media print {
        .nav, .foot {
            display: none;
        }
    }
</style>