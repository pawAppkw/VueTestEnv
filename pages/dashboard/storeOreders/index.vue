<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0">
        <v-toolbar elevation="0">
          <v-toolbar-title class="mr-3">Store Orders</v-toolbar-title>
          <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Search" outlined dense hide-details=""
            style="max-width: 150px; margin-left: auto"></v-text-field>
          <v-btn color="primary" dark elevation="0" class="ml-4">Search</v-btn>
        </v-toolbar>
        <v-data-table :headers="headers" :items="orders" :search="search" class="elevation-1">
          <template v-slot:[`item.id`]="{ item, index }"> 
            {{ index + 1 }}
          </template>
          <!-- Custom slot for the Client Address column -->
          <template v-slot:item.user.address="{ item }">
            <span>{{ item.user && item.user.address ? item.user.address : 'No address provided' }}</span>
          </template>
          <!--
          <template v-slot:item.delivery_status="{ item }">
            <v-chip :color="deliveryStatusColor(item.delivery_status)">
              {{ item.delivery_status }}
            </v-chip>
          </template>
            -->
          
          <template v-slot:item.promotion_percentage="{ item }">
            <span>{{ item.promotion_percentage ? item.promotion_percentage + '%' : '0%' }}</span>
          </template>


          <template v-slot:item.payment_status="{ item }">
            <v-chip :color="item.payment_status === 1 ? 'green' : 'red'">

              {{ item.payment_status === 1 ? 'Paid' : 'Not Paid' }}
            </v-chip>
          </template>


          <template v-slot:item.promo_code="{ item }">
            <v-chip :color="item.promo_code ? 'green' : 'red'">
              {{ item.promo_code ? item.promo_code : 'No Promo' }}
            </v-chip>
          </template>



          <!-- Custom slot for the Status column -->
          <template v-slot:[`item.status`]="{ item }">
            <div v-if="item.status === 'Created'">
              <v-icon class="mr-2" @click="acceptOrder(item)" color="success">mdi-check</v-icon>
              <v-icon @click="rejectOrder(item)" color="error">mdi-close</v-icon>
            </div>
            <v-chip v-else :color="statusColor(item.status)">{{ item.status }}</v-chip>
          </template>

          <!-- Custom slot for the Support column -->
          <template v-slot:[`item.support`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon fab @click="viewOrderData(item)" v-bind="attrs" v-on="on">
                  <v-icon>mdi-package-variant-closed</v-icon>
                </v-btn>
              </template>
              <span>View Order Data</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon fab @click="confirmChangeStatus(item)" v-bind="attrs" v-on="on">
                  <v-icon>mdi-swap-horizontal</v-icon>
                </v-btn>
              </template>
              <span>Change Status</span>
            </v-tooltip>

            <v-tooltip bottom v-if="item.order_delivery">
              <template v-slot:activator="{ on, attrs }">
                <a :href="item.order_delivery.trackingLink" target="_blank" rel="noopener noreferrer">
                  <v-btn icon fab v-bind="attrs" v-on="on">
                    <v-icon>mdi-eight-track</v-icon>
                  </v-btn>
                </a>
              </template>
              <span>Track Order</span>
            </v-tooltip>
          </template>

        </v-data-table>


      </v-card>
    </v-col>
    <v-dialog v-model="orderDialog" width="900">
      <v-card>
        <v-card-title>
          Order Details
        </v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>


                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Product</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">Discount</th>
                  <th class="text-left">Quantity</th>
                </tr>
              </thead>


              <tbody>
                <tr v-for="item in ordersData" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.product.name_en }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.discount ? item.discount + ' %' : '0%' }}</td>
                  <td>{{ item.quantity }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog width="600" v-model="confirmDialog">
      <v-card>
        <v-card-title>
          Change Status Confirmation
        </v-card-title>
        <v-card-text>
          Are You Sure To Change Status of this order {{ itemData.reference_no }}?
          <v-radio-group v-model="orderStatus">
            <v-radio :value="2" label="Confirm" />
            <v-radio :value="3" label="Reject" />
          </v-radio-group>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" dense @click="changeStatus()">Change</v-btn>
          <v-btn color="error" dense @click="confirmDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="successSnackbar" color="success" shaped bottom right :timeout="timeout">
      {{ successMessage }}
    </v-snackbar>
  </v-row>
</template>
<script>
export default {
  // layout: "dashboard",
  middleware: 'authenticated',
  data() {
    return {
      dialog: false,
      orderDialog: false,
      confirmDialog: false,
      filter: {
        type: "all",
      },
      headers: [
        { text: "Number of items", value: "id" },
        { text: "Order ID", value: "reference_no" },
        { text: "Price", value: "total_price" },
        { text: "Status", value: "status_format" },

        { text: "Delivery Status", value: "Delivery_status" },


        { text: "Have Promotion", value: "promo_code" },
        { text: "Promotion Percentage", value: "promotion_percentage" },

        { text: "Pay Status", value: "payment_status" }, // Assume "pay_status" is the field in your data


        { text: "Client Name", value: "user.name" },
        { text: "Client Address", value: "user.address" },
        { text: "Transaction ID", value: "transaction_id" },
        { text: "Support", value: "support" },
      ],
      orders: [],
      ordersData: [],
      itemData: {},
      search: "",
      orderStatus: 2,
      permissions: [],
      successSnackbar: false,
      errorSnackbar: false,
      errors: false,
      timeout: 10000,
      successMessage: "",
      errorMessage: "",
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem('userData')).roles[0]) {
      JSON.parse(localStorage.getItem('userData')).roles[0].permissions.forEach(item => {
        this.permissions.push(item.name)
      })
      if (!this.permissions.includes('manage_store')) {
        this.$router.push('/dashboard')
      }
    } else {
      localStorage.clear()
    }
    this.getAllData()
  },
  methods: {
    statusColor(status) {
      switch (status) {
        case "Rejected":
          return "rejected";
        case "In preparation":
          return "preparation";
        case "On the way":
          return "way";
        case "Completed":
          return "completed";
        default:
          return "created";
      }
    },
    acceptOrder(item) {
      this.dialog = true
      item.status = "In preparation";
    },
    rejectOrder(item) {
      item.status = "Rejected";
    },
    confirmChangeStatus(item) {
      this.itemData = item
      this.confirmDialog = true
    },
    viewOrderData(item) {
      this.ordersData = item.order_items
      this.orderDialog = true
    },
    async changeStatus() {
      await this.$axios.$post(`vendor/change-order-status/${this.itemData.id}`, {
        status: this.orderStatus
      }).then(async res => {
        if (res.success === true) {
          if (JSON.parse(localStorage.getItem('userInfo')).company.pawApp_delivery === 1) {
            const startOrder = await this.$axios.$get(`vendor/start-order-delivery/${this.itemData.id}`)
            console.log('startOrder', startOrder)
            if (startOrder.success === true) {
              this.successSnackbar = true
              this.successMessage = startOrder.message
              this.confirmDialog = false
              this.getAllData()
            }
          } else {
            this.confirmDialog = false
            this.getAllData()
          }
        }
      })
    },
    async getAllData() {
      // Fetch store orders
      const ordersData = await this.$axios.$get('vendor/stores-orders');
      this.orders = ordersData.data.map(order => ({
        ...order,
        payment_status: order.payment_status || 'Not Paid', // Default to 'Not Paid' if pay_status is missing
      }));

      // Fetch all promotion codes
      const promotionsData = await this.$axios.$get('vendor/promo_codes');
      // Create an object to map promo codes to their discounts
      const promoCodeToDiscount = promotionsData.data.reduce((acc, promo) => {
        acc[promo.name_en] = promo.discount; // Assuming the promo code's 'id' is what matches an order's 'promo_code'
        return acc;
      }, {});

      // Map the correct discount percentage to each order
      this.orders = this.orders.map(order => ({
        ...order,
        promotion_percentage: promoCodeToDiscount[order.promo_code] || '0',
      }));
    }
  },
};
</script>
<style>
.tab-active {
  border-radius: 0px !important;
  border-bottom: 4px solid rgba(248, 220, 49, 1);
  font-size: 120%;
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
