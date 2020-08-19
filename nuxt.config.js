export default {
	build: {
		analyze: true,
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
				}
			]
		}
	}
}
