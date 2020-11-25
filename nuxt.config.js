export default {
    build: {
        analyze: true,
        extend(config) {
            config.resolve.alias['vue'] = 'vue/dist/vue.common'
        },
        transpile: [
            "gsap"
        ]
    },
    server :{
      port: 80,
      host: "0.0.0.0"
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
                    charset: 'utf-16',
                    hid: 'charset'
                }
            ],
            link: [
                {
                    rel: "stylesheet",
                    href:"https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
                },
                {
                    rel: "stylesheet",
                    href:"https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
                }
            ]
        }
    },
    modules: [
        'vue-scrollto/nuxt'
    ],
    loading: "~/components/loading/loading.vue"
}
