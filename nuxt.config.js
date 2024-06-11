import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - paw-app',
    title: 'paw-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect' },
      { href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.2.96/css/materialdesignicons.min.css', rel: 'stylesheet' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/main.scss',
    'swiper/dist/css/swiper.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/swiper', ssr: false },
    { src: '~/plugins/custom.js', ssr: false},
    { src: '@/plugins/axios'},
    { src: '~/plugins/map', ssr: false  }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // https://dev.auth.nuxtjs.org/guide/setup
    // '@nuxtjs/auth-next',
    // '@nuxtjs/firebase',
    "cookie-universal-nuxt",
  ],
    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
      http: process.env.NODE_ENV === 'development',
      baseURL: 'https://api.pawapp.net/api/',
      // proxy: true
    },
      // Toast module (https://github.com/shakee93/vue-toasted#options)
  toast: {
    position: "top-center",
    duration: 3000,
    keepOnHover: true,
    iconPack: "mdi",
    theme: "bubble",
    singleton: true,
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary:"#003276",
          secondary: "#f8dc00",
          third: "#fff",
          accent: colors.grey.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
