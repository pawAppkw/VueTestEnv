<template>
  <v-app class="background-grey">
    <v-navigation-drawer left :mini-variant="mini" :clipped="mini" fixed app dark v-model="drawer" color="primary">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Pawapp
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.route" exact>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list-item @click="logout" class="red--text-lighten-1">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar fixed app elevation="0" color="white">
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-badge :content="chatCount" color="red" dot overlap>
          <v-icon>mdi-message-text</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon>
        <v-badge :content="notificationCount" dot color="red" overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
          <div class="d-flex ml-10">
            <v-avatar size="32">
              <img :src="currentUser.avatar" alt="User Avatar" class="mr-2">
            </v-avatar>
            <div class="">
            <p class=" pb-0 mb-0">{{ currentUser.name }}
            </p>
            <small class="py-0 text-caption primary--text">{{ currentUser.role }}</small>
            </div>
          </div>

    </v-app-bar>

    <v-main class="mt-5">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      mini: false,
      drawer: false,
      title: "Dashboard",
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard-outline", route: "/dashboard/" },
        { title: "Promotions", icon: "mdi-gift-outline", route: "/dashboard/promotions" },
        { title: "Orders", icon: "mdi-receipt-outline", route: "/dashboard/orders" },
        { title: "Roles", icon: "mdi-account-group-outline", route: "/dashboard/roles" },
        { title: "Customers", icon: "mdi-account-outline", route: "/dashboard/customers" },
        { title: "Products", icon: "mdi-package-variant", route: "/dashboard/products" },
      ],
      chatCount: 0,
      notificationCount: 0,
      currentUser: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/32",
        role: "Admin",
      },
    };
  },
  methods: {
    logout() {
      // Implement your logout logic here
    },
  },
};
</script>
<style >
.background-grey {
background: #F5F8FF !important;
}
</style>