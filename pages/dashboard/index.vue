<template>
      <v-row>
        <v-col md="9" cols="12">
          <v-card v-if="value.length > 0">
            <h2 class="ma-3">Revenue</h2>
            <v-card-text>
              <v-sparkline
              class="static"
              :labels="titles"
              :value="value"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              :fill="fill"
              :type="type"
              :auto-line-width="autoLineWidth"
              auto-draw
            >
            <template v-slot:label="item">
              {{ item.value }}
            </template>
          </v-sparkline>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col md="3" cols="12">
          <dashboardHomeStatistc :dataNumbers="dataNumbers"/>
        </v-col>
        <v-col cols="12" v-if="permissions.includes('manage_store')">
          <v-card elevation="0">
            <v-toolbar elevation="0">
              <v-toolbar-title>Most Selling Products</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
              :headers="mostSellingHeaders"
              :items="mostSelling"
              :search="search"
              class="elevation-1"
            >
            </v-data-table>
        <FormsOrder v-model="dialog" />
          </v-card>
        </v-col>
        <v-col cols="12" v-if="permissions.includes('manage_store') || permissions.includes('manage_vet')">
          <v-card elevation="0">
            <v-toolbar elevation="0">
              <v-toolbar-title>Recent Orders</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="orders"
              :search="search"
              class="elevation-1"
            >
            </v-data-table>
        <FormsOrder v-model="dialog" />
          </v-card>
        </v-col>
        <v-col cols="12"  v-if="permissions.includes('manage_hotel')">
          <v-card elevation="0">
            <v-toolbar elevation="0">
              <v-toolbar-title>Recent Hotel Reservations</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
              :headers="hotel_reservations_header"
              :items="recent_hotel_reservations"
              class="elevation-1"
            >
            <template v-slot:[`item.check_in_format`]="{ item }">
              {{ item.check_in_date.slice(0,10) + ' - ' + item.check_in_format }}
              </template>
              <template v-slot:[`item.check_out_format`]="{ item }">
                {{ item.check_out_date.slice(0,10) + ' - ' + item.check_out_format }}
                </template>
                <template v-slot:[`item.status`]="{ item }">
                  <div v-if="item.status === 'Created'">
                    <v-icon class="mr-2" @click="acceptOrder(item)" color="success"
                      >mdi-check</v-icon
                    >
                    <v-icon @click="rejectOrder(item)" color="error"
                      >mdi-close</v-icon
                    >
                  </div>
                  <v-chip v-else :color="statusColor(item.status)">{{
                    item.status
                  }}</v-chip>
                </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="permissions.includes('manage_groomer')">
          <v-card elevation="0">
            <v-toolbar elevation="0">
              <v-toolbar-title>Groomer Reservations</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
              :headers="grooming_reservations_header"
              :items="recent_groomer_reservations"
              class="elevation-1"
            >
            <template v-slot:[`item.groomers_services`]="{ item }">
              <span v-if="item.groomers_services">
                <span v-for="(service, i) in item.groomers_services" :key="i">
                  <v-chip outlined>
                    {{ service.name }}
                  </v-chip>
                </span>
              </span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="permissions.includes('manage_vet')">
          <v-card elevation="0">
            <v-toolbar elevation="0">
              <v-toolbar-title>clinics Reservations</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
              :headers="clinics_reservations_header"
              :items="recent_clinics_reservations"
              class="elevation-1"
            >
            <template v-slot:[`item.clinics_services`]="{ item }">
              <span v-if="item.clinics_services">
                <span v-for="(service, i) in item.clinics_services" :key="i">
                  <v-chip outlined>
                    {{ service.name }}
                  </v-chip>
                </span>
              </span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
</template>
<script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
export default {
  // layout: 'dashboard',
  middleware: 'authenticated',
  data() {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [],
      titles: [],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      headers: [
        { text: 'Order id', value: 'id' },
        { text: 'Reference Num', value: 'reference_no' },
        { text: 'Price', value: 'total_price' },
        { text: 'Status', value: 'status_format' },
      ],
      hotel_reservations_header: [
        { text: "Booking id", value: "id" },
        { text: "Reference Num", value: "reference_no" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status_format" },
        { text: "Client Name", value: "user.name" },
        { text: "check in", value: "check_in_format" },
        { text: "check out", value: "check_out_format" },
      ],
      grooming_reservations_header: [
        { text: "grooming id", value: "id" },
        { text: "Reference Num", value: "reference_no" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status_format" },
        { text: "Client Name", value: "user.name" },
        { text: "Booking time", value: "booking_time_format" },
        { text: "groomers services", value: "groomers_services" },
      ],
      clinics_reservations_header: [
        { text: "clinics id", value: "id" },
        { text: "Reference Num", value: "reference_no" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status_format" },
        { text: "Client Name", value: "user.name" },
        { text: "Booking time", value: "booking_time_format" },
        { text: "Clinics services", value: "clinics_services" },
      ],
      mostSellingHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Status', value: 'in_stock' },
      ],
      orders: [],
      search: '',
      dialog: false,
      dataNumbers: {},
      recent_hotel_reservations: [],
      recent_groomer_reservations: [],
      recent_clinics_reservations: [],
      mostSelling: [],
      permissions: []
    };
  },
  created() {
    this.getData()
  },
  mounted() {
    if(localStorage.getItem('userData')) {
      JSON.parse(localStorage.getItem('userData')).roles[0].permissions.forEach(item => {
        this.permissions.push(item.name)
      })
    }
  },
  methods: {
    async  getData () {
      const data = await this.$axios.$get('/vendor/dashboard-statistics')
      this.dataNumbers = data
      this.value = Object.values(data.charts_data)
      this.titles = Object.keys(data.charts_data)
      this.orders = data.recent_orders
      this.recent_hotel_reservations = data.recent_hotel_reservations
      this.recent_groomer_reservations = data.recent_groomer_reservations
      this.recent_clinics_reservations = data.recent_clinics_reservations
      this.mostSelling = data.most_selling_products
    },
    statusColor(status) {
      switch (status) {
        case 'Rejected':
          return 'rejected';
        case 'In preparation':
          return 'preparation';
        case 'On the way':
          return 'way';
        case 'Completed':
          return 'completed';
        default:
          return 'created';
      }
    },
    acceptOrder(item) {
      this.dialog = true
      item.status = 'In preparation';
    },
    rejectOrder(item) {
      item.status = 'Rejected';
    },
  },
};
</script>
<style lang="scss">
.static{
  g{
    text{
      font-size: 4px;
    }
  }
}
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
