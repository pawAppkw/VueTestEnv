<template>
  <v-app>
    <!-- <v-container> -->
      <laindingNav />
    <!-- </v-container> -->
    <v-main>
      <!-- <v-container> -->
        <Nuxt />
      <!-- </v-container> -->
    </v-main>
    <v-footer
      class="landing-footer d-flex justify-space-between"
      :absolute="!fixed"
      app

    >
    <!-- <div>
      @paw <span>&copy; {{ new Date().getFullYear() + ' ' }} </span> all right reserved
    </div>

    <div>
      <nuxt-link class="mx-2" to="/privacy">Privacy Policy</nuxt-link>
      <nuxt-link class="mx-2" to="/terms">Terms & Conditions</nuxt-link>
    </div> -->
    <div class="container">
      <div class="copy">
          <p>@2023 PawApp. All Rights Reserved</p>
          <span>
            <nuxt-link class="mx-2" to="/privacy">Privacy Policy</nuxt-link>
      <nuxt-link class="mx-2" to="/terms">Terms & Conditions</nuxt-link>
          </span>
          <div class="d-flex align-items-center">
              <h3>Follow Up On</h3>
              <ul>
                  <li>
                      <a href="#!">
                          <img src="../assets/images/facebook.svg" alt="facebook">
                      </a>
                  </li>
                  <li>
                      <a href="#!">
                          <img src="../assets/images/twitter.svg" alt="twitter">
                      </a>
                  </li>
                  <li>
                      <a href="#!">
                          <img src="../assets/images/Insta.svg" alt="Insta">
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  </div>
    </v-footer>
  </v-app>
</template>

<script>
import laindingNav from '@/components/layout/landingPageNav.vue'
export default {
  name: 'DefaultLayout',
  components: {laindingNav},
  data () {
    return {
      fixed: false
    }
  }
}
</script>
<style scoped>
.v-main {
  padding: 0px 0px 36px !important;
  margin-top: -70px;
}
.theme--light.v-footer{
  background-color: #003276 !important;
  color: #fff
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined){
  box-shadow: unset !important;
}
.landing-footer a{
  color: #fff;
  text-decoration: unset !important;
}
.landing-footer {
  background-color: #002558;
  padding: 1.2rem 0;
}

.landing-footer p {
  color: #aebdd1;
  font-size: 16px;
  margin-bottom: 0;
}

.landing-footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.copy {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copy h3 {
  color: #f8dc31;
  margin: 0;
  font-size: 18px;
}

.landing-footer ul {
  display: flex;
}

.landing-footer ul li a {
  width: 40px;
  height: 40px;
  background-color: #FFF;
  border-radius: 50%;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.offcanvas.show {
  background-color: #002558;
}
</style>
