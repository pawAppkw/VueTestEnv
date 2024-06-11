<template>
    <v-row>
    <v-col cols="6">
      <v-card height="100" elevation="0" class="background-tomato">
        <v-card-title class="pb-1">
          <span class="text-left">{{dataNumbers.new_customers}}</span>
          <v-icon class="ml-auto icon-background" small rounded>mdi-home</v-icon>
        </v-card-title>
        <v-card-text>
          new customers
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card height="100" elevation="0" class="background-blue">
        <v-card-title class="pb-1">
          <span class="text-left">{{dataNumbers.completed_orders}}</span>
          <v-icon class="ml-auto icon-background" small rounded>mdi-package-variant-closed</v-icon>
        </v-card-title>
        <v-card-text>
          completed orders
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card height="100" elevation="0" class="background-green">
        <v-card-title class="pb-1">
          <span class="text-left">{{dataNumbers.total_customers}}</span>
          <v-icon class="ml-auto icon-background" small rounded>mdi-account-group</v-icon>
        </v-card-title>
        <v-card-text>
          Total Customers
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card height="100" elevation="0" class="background-orange">
        <v-card-title class="pb-1">
          <span class="text-left">{{dataNumbers.total_avail_rooms}}</span>
          <v-icon class="ml-auto icon-background" small rounded>mdi-bed</v-icon>
        </v-card-title>
        <v-card-text>
          Avaiable Rooms
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ['dataNumbers']
}
</script>
<style>
.icon-background {
    background-color: white;
    color: #000 !important;
    border-radius: 10px;
    padding: 5px;
  }
  .background-tomato {
    background: rgba(255, 104, 98, 0.6) !important;
    color: rgba(64, 64, 64, 1) !important;
  }
  .background-blue {
    background: rgba(97, 155, 251, 0.6) !important;
    color: rgba(64, 64, 64, 1) !important;
  }
  .background-green {
    background: rgba(0, 187, 191, 0.6) !important;
    color: rgba(64, 64, 64, 1) !important;
  }
  .background-orange {
    background: rgba(238, 135, 33, 0.6) !important;
    color: rgba(64, 64, 64, 1) !important;
  }
</style>
