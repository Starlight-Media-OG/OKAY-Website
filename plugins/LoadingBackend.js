import Vue from 'vue'
import nuxt from "@/nuxt-dist/components/nuxt";

const WindowInstanceMap = new Vue({
    created() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        })

        window.addEventListener('scroll', e => {
            this.$nextTick(() => {
                this.$nuxt.$loading.finish();
            })
        })
    },
    destroyed() {
        window.addEventListener('load', e => {
            this.$nextTick(() => {
                this.$nuxt.$loading.finish();
            })
        })
    }
})
// Inject plugin as Vue.prototype.$window
export default (context, inject) => {
    inject('window', EventBus)
}