<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0">
        <v-toolbar elevation="0">
          <v-toolbar-title>Customers</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            placeholder="Enter Customer Name"
            outlined
            dense
            hide-details
          ></v-text-field>
          <v-btn color="primary" dark elevation="0" class="ml-4">Search</v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
// layout: 'dashboard',
middleware: 'authenticated',
data() {
return {
    dialog: false,
  headers: [
    { text: 'ID', value: 'id' },
    { text: 'Name', value: 'name' },
    { text: 'Phone number', value: 'full_mobile_number' },
    { text: 'Email', value: 'email' },
    { text: 'Address', value: 'address' },
    { text: 'total reviews', value: 'total_reviews' },
    { text: 'Rate', value: 'rate' },
  ],
  items: [],
  search: '',
};
},
created() {
  this.getAllData()
},
methods: {
// statusColor(status) {
//   switch (status) {
//     case 'Rejected':
//       return 'rejected';
//     case 'In preparation':
//       return 'preparation';
//     case 'On the way':
//       return 'way';
//     case 'Completed':
//       return 'completed';
//     default:
//       return 'created';
//   }
// },
acceptOrder(item) {
  item.status = 'In preparation';
},
rejectOrder(item) {
  item.status = 'Rejected';
},
async getAllData() {
    const data = await this.$axios.$get('vendor/customers')
    this.items = data.data
  }
},
};
</script>
<style>
.v-data-table__wrapper {
overflow-x: auto;
}

.v-chip.rejected {
background-color: #f44336 !important;
color: white;
}

.v-chip.preparation {
background-color: #ff9800 !important;
color: white;
}

.v-chip.way {
background-color: #2196f3 !important;
color: white;
}

.v-chip.completed {
background-color: #4caf50 !important;
color: white;
}

.v-chip.created {
display: none;
}


</style>
