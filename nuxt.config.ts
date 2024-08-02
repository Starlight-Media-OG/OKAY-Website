// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  build: {
    transpile: ["gsap"],
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://okay-ybbs.at:3000",
      baseImage: process.env.BASE_IMAGE || "http://okay-ybbs.at:4000",
      defaultImage: "/img/defaultImage.png",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "de",
      },
      title: "OKAY Ybbs",
      meta: [
        {
          hid: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
          hid: "charset",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "OKAY, Offene Kultur aus Ybbs, Ybbs an der Donau, Kultur, Kulturveranstaltung, Ybbs, Kultur, Kultuverein",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
  },
  plugins: [{ src: "~/plugins/scroll-to.plugin.ts", mode: "client" }],
  modules: ["@pinia/nuxt"],
  css: ["~/assets/style/style.scss", "~/assets/style/variable.scss"],
});
