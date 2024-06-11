<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="primary"
      class="nav-drawer"
    >
    <div class="text-center py-5">
      <img src="../assets/images/logo.svg" alt="logo">
    </div>
    <div class="d-flex justify-space-around w-100 company-image py-5 px-2" v-if="info.company">
      <img :src="info.company.logo" alt="">
      <p class="ma-auto">{{ info.company.name }}</p>
    </div>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-group
      no-action
      sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Admin And Roles</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in roles"
          :key="i"
          link
          :to="item.to"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-group
      v-if="permissions.includes('manage_store')"
      no-action
      sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Stores</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in stores"
          :key="i"
          link
          :to="item.to"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-group
      v-if="permissions.includes('manage_groomer')"
      no-action
      sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Groomers</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in groomers"
          :key="i"
          link
          :to="item.to"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-group
      v-if="permissions.includes('manage_hotel')"
      no-action
      sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Hotels</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in hotels"
          :key="i"
          link
          :to="item.to"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-group
      v-if="permissions.includes('manage_school')"
      no-action
      sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Schools</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in schools"
          :key="i"
          link
          :to="item.to"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-group
      v-if="permissions.includes('manage_vet')"
      no-action
      sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Clinics</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in clinic"
          :key="i"
          link
          :to="item.to"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-group
      v-if="permissions.includes('manage_vet')"
      no-action
      sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Pharmacies</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in pharmacies"
          :key="i"
          link
          :to="item.to"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <template v-slot:append>
        <div class="pa-10" @click="logout()">
          <v-btn class="mx-auto logout" color="secondary">
            <v-icon>mdi-logout</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-badge :content="chatCount" color="red" dot overlap>
          <v-icon>mdi-message-text</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon>
        <v-badge :content="notificationCount" dot color="red" overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn> -->
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex" v-bind="attrs"
              v-on="on">
                <v-avatar size="32">
                  <img :src="currentUser.avatar" alt="User Avatar" class="mr-2">
                </v-avatar>
                <div class="">
                <p class=" pb-0 mb-0">{{ currentUser.name }}
                </p>
                <small class="py-0 text-caption primary--text">{{ currentUser.role }}</small>
                </div>
                <v-icon>
                  mdi-menu-down
                </v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in dropItems"
                :key="index"
                :to="item.to"
                link
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                link
                @click="logout()"
              >
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
      color="primary"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      // items: [
      //   {
      //     icon: 'mdi-apps',
      //     title: 'Welcome',
      //     to: '/'
      //   },
      //   {
      //     icon: 'mdi-chart-bubble',
      //     title: 'Inspire',
      //     to: '/inspire'
      //   }
      // ],
      info: {},
      title: "Dashboard",
      dropItems: [
        { title: "Profile", icon: "mdi-home-account", to: "/dashboard/userProfile" },
        { title: "Company", icon: "mdi-domain", to: "/dashboard/companyProfile" },
      ],
      items: [
        // global routes
        { title: "Dashboard", icon: "mdi-view-dashboard-outline", to: "/dashboard/" },
        { title: "Promotions", icon: "mdi-gift-outline", to: "/dashboard/promotions" },
        { title: "Customers", icon: "mdi-account-outline", to: "/dashboard/customers" },
      ],
      roles: [
        // Roles Routes
        { title: "Roles", icon: "mdi-account-group-outline", to: "/dashboard/roles" },
        { title: "Admins", icon: "mdi-shield-account", to: "/dashboard/admins" },
      ],
      stores: [
        // Store Routes
        { title: "Category", icon: "mdi-package-variant", to: "/dashboard/category" },
        { title: "Products", icon: "mdi-package", to: "/dashboard/products" },
        { title: "Store Orders", icon: "mdi-receipt-outline", to: "/dashboard/storeOreders" },
      ],
      groomers: [
        // Groomer Routes
        { title: "Grooming", icon: "mdi-paw", to: "/dashboard/grooming" },
        { title: "Grooming Bookings", icon: "mdi-paw", to: "/dashboard/groomingBokking" },
      ],
      hotels: [
        // Hotels Router
        { title: "Rooms", icon: "mdi-bed-king-outline", to: "/dashboard/rooms" },
        { title: "Rooms Booking", icon: "mdi-bed-king-outline", to: "/dashboard/roomsBooking" },
      ],
      schools: [
        // School Router
        { title: "School", icon: "mdi-school", to: "/dashboard/school" },
        { title: "School Booking", icon: "mdi-town-hall", to: "/dashboard/schoolBooking" },
      ],
      clinic: [
        // Clinic Router
        { title: "Clinic Branches", icon: "mdi-doctor", to: "/dashboard/clinic" },
        { title: "Clinic services", icon: "mdi-toolbox-outline", to: "/dashboard/clinics_services" },
        { title: "Clinic Booking", icon: "mdi-doctor", to: "/dashboard/clinicBooking" },
      ],
      pharmacies: [
      // Pharmacies router
        { title: "Pharmacies Branches", icon: "mdi-pill", to: "/dashboard/pharmacies" },
        { title: "Pharmacies Category", icon: "mdi-package-variant", to: "/dashboard/pharmacies-category" },
        { title: "Pharmacies Drugs", icon: "mdi-pill", to: "/dashboard/pharmacy_drugs" },
        { title: "Pharmacies Orders", icon: "mdi-receipt-outline", to: "/dashboard/pharmaciesOrders" },
      ],
      chatCount: 0,
      notificationCount: 0,
      currentUser: {
        name: "",
        avatar: "",
        role: "",
      },
      permissions: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      // title: 'Vuetify.js'
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.currentUser.name = JSON.parse(localStorage.getItem('userData')).name
    if (JSON.parse(localStorage.getItem('userData')).roles[0]) {
      this.currentUser.role = JSON.parse(localStorage.getItem('userData')).roles[0].name
      JSON.parse(localStorage.getItem('userData')).roles[0].permissions.forEach(item => {
        this.permissions.push(item.name)
      })
    } else {
      localStorage.clear()
    }
  },
  methods: {
    async  getData () {
      const info = await this.$axios.$get('/vendor/get-info')
      this.info = info.admin
      this.currentUser.avatar = info.admin.avatar
      localStorage.setItem('userInfo', JSON.stringify(this.info))
    },
    logout() {
      localStorage.removeItem('token')
      this.$cookies.remove("token")
      this.$router.push('/auth/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined){
  height: 64px !important;
}
.v-application--is-ltr .v-list-group--no-action.v-list-group--sub-group > .v-list-group__items > .v-list-item{
  padding-left: 40px !important;
}
.logout{
  color: #003276 !important;
  .v-btn__content{
    color: #003276 !important;
  }
  .v-icon{
    color: #003276 !important;
  }
}
</style>