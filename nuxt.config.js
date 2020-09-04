export default {
    build: {
        analyze: true,
        extend(config) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common'
        }
    },
    buildDir: 'nuxt-dist',
    css: [
        '@/assets/style/style.scss',
        '@/assets/style/variable.scss',
    ],
    head() {
        return {
            htmlAttrs: {
                lang: 'de'
            },
            title: "OKAY Ybbs",
            meta: [
                {
                    hid: "viewport",
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                },
                {
                    charset: 'utf-8',
                    hid: 'charset'
                }
            ]
        }
    },
    modules: [
        'vue-scrollto/nuxt'
    ]
}
