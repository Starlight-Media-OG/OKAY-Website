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
    env: {
        baseURL: process.env.BASE_URL || "http://okay-ybbs.at:3000",
        baseImage: process.env.BASE_IMAGE || "http://okay-ybbs.at:4000",
        defaultImage: "/img/defaultImage.png"
    },
    server :{
      port: 80, //Build change to 80
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
                    charset: 'utf-8',
                    hid: 'charset'
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: "OKAY, Offene Kultur aus Ybbs, Ybbs an der Donau, Kultur, Kulturveranstaltung, Ybbs, Kultur, Kultuverein"
                }
            ],
            link: [
                {
                    rel: "icon",
                    type: "image/svg+xml",
                    ref:"/favicon.svg"
                }
            ]
        }
    },
    modules: [
        'vue-scrollto/nuxt'
    ],
    loading: "~/components/loading/loading.vue"
}
