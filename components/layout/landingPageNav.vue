<template>
  <div class="landing-nav">
  <v-app-bar
    color="#041d58"
    app
  >
  <v-container class="d-flex">
    <v-toolbar-title class="logo" to="/">
      <nuxt-link to="/">
        <img src="@/assets/images/logo.svg" alt="logo">
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn class="openNav" text v-if="isSmallScreen" @click="openNav()">
      <v-icon>
        mdi-menu
      </v-icon>
    </v-btn>
    <div v-if="!isSmallScreen" class="d-flex justify-space-between ma-auto w-50">
      <nuxt-link to="#Home">
        <v-btn text color="#fff">
          Home
        </v-btn>
      </nuxt-link>
      <nuxt-link to="#Services">
        <v-btn text color="#fff">
          Services
        </v-btn>
        </nuxt-link>
        <nuxt-link to="#Vendors">
          <v-btn text color="#fff">
            vendors
        </v-btn>
      </nuxt-link>
      <nuxt-link to="#Emergency">
        <v-btn text color="#fff">
          Emergency
        </v-btn>
      </nuxt-link>
      <nuxt-link to="#Download">
        <v-btn text color="#fff">
          Download APP
        </v-btn>
      </nuxt-link>
      <v-btn to="/auth/login" rounded outlined color="secondary" text-color="primary">
        Sign in
      </v-btn>
    </div>
    <ul v-if="showMenu" class="contOfNav">
      <li>
        <nuxt-link to="/">
          <v-btn text color="#fff">
            About
          </v-btn>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">
          <v-btn text color="#fff">
            Services
          </v-btn>
          </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">
          <v-btn text color="#fff">
            vendors
        </v-btn>
      </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">
          <v-btn text color="#fff">
            features
          </v-btn>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">
          <v-btn text color="#fff">
            features
          </v-btn>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">
          <v-btn text color="#fff">
            contact
          </v-btn>
        </nuxt-link>
      </li>
      <li>
        <v-btn to="/auth/login" class="primary" color="secondary" text-color="primary">
          Sign Up
        </v-btn>
      </li>
    </ul>
  </v-container>
  </v-app-bar>
  </div>

</template>
<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      showMenu: false,
    }
  },
  computed: {
    isSmallScreen () {
      if(window.innerWidth <= 768){
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    openNav() {
      this.showMenu = !this.showMenu;
    },
  },
}
</script>
<style lang="scss" scoped>
.v-app-bar.v-app-bar--fixed{
  position: relative;
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined){
  box-shadow: unset !important;
  height: 160px !important;
}
</style>
