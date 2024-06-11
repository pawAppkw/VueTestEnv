
<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0">
        <v-toolbar elevation="0">
          <v-toolbar-title class="mr-3">Groomer Bookin</v-toolbar-title>
          <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Search" outlined dense hide-details=""
            style="max-width: 150px; margin-left: auto"></v-text-field>
          <v-btn color="primary" dark elevation="0" class="ml-4">Search</v-btn>
        </v-toolbar>
        <v-data-table :headers="headers" :items="orders" :search="search" class="elevation-1">
          <template v-slot:[`item.id`]="{ item, index }"> 
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.booking_date`]="{ item }">
            {{ formatDate(item.booking_date) }}
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <div v-if="item.status === 'Created'">
              <v-icon class="mr-2" @click="acceptOrder(item)" color="success">mdi-check</v-icon>
              <v-icon @click="rejectOrder(item)" color="error">mdi-close</v-icon>
            </div>
            <v-chip v-else :color="statusColor(item.status)">{{
            item.status
          }}</v-chip>
          </template>

          <template v-slot:item.payment_status="{ item }">
            <v-chip :color="item.payment_status === 1 ? 'green' : 'red'">

              {{ item.payment_status === 1 ? 'Paid' : 'Not Paid' }}
            </v-chip>
          </template>
          <template v-slot:item.size="{ item }">
            {{ item.size }}
          </template>

        
          <template v-slot:item.address="{ item }">
          <v-btn icon @click="viewAddress(item)">
            <v-icon>mdi-home-map-marker</v-icon>
          </v-btn>
        </template>

          <template v-slot:item.support="{ item }">
            <v-btn small color="primary" @click="setOrderStatusAndChange(item, 2)">Confirm</v-btn>
            <v-btn small color="error" @click="setOrderStatusAndChange(item, 3)">Reject</v-btn>
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
                  <th class="text-left">
                    ID
                  </th>
                  <th class="text-left">
                    Pharmacy Drug
                  </th>
                  <th class="text-left">
                    price
                  </th>
                  <th class="text-left">
                    discount
                  </th>
                  <th class="text-left">
                    quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ordersData" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.pharmacy_drug.name_en }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.discount }}</td>
                  <td>{{ item.quantity }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addressDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">Address Details</v-card-title>
        <v-card-text>
          <div><b>Avenue:</b> {{ addressData.avenu }}</div>
          <div><b>Additional Directions:</b> {{ addressData.additional }}</div>
          <div><b>Address Label:</b> {{ addressData.address_label }}</div>
          <div><b>Phone:</b> {{ addressData.phone }}</div>
          <div><b>Street:</b> {{ addressData.street }}</div>
          <div><b>Company:</b> {{ addressData.company }}</div>
          <div><b>Apartment:</b> {{ addressData.apt_number }}</div>
          <div><b>Floor:</b> {{ addressData.floor }}</div>
          <div><b>Block:</b> {{ addressData.block }}</div>
          <div><b>House:</b> {{ addressData.house }}</div>
          <div><b>Latitude:</b> {{ addressData.latitude }}</div>
          <div><b>Longitude:</b> {{ addressData.longitude }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="addressDialog = false">Close</v-btn>
          <v-btn color="green" text @click="openInMap(addressData.latitude, addressData.longitude)">Open in Map</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      addressDialog: false,
      filter: {
        type: "all",
      },
      addressData: {},

      headers: [
        { text: "Number of items", value: "id" },
        { text: "Booking ID", value: "reference_no" },
        { text: "Service Name", value: "service_name" },
        { text: "Price", value: "price" },
        { text: "Size Pet", value: "size" },
        { text: "Status", value: "status_format" },
        { text: "Client Name", value: "user.name" },
        { text: "Booking Time", value: "booking_time_format" },
        { text: "Booking Date", value: "booking_date" },

        { text: "Pay Status", value: "payment_status" }, // Assume "pay_status" is the field in your data
        { text: "Address", value: "address" },
        { text: "Support", value: "support" },
        
      ],
      orders: [],
      ordersData: [],
      itemData: {},
      search: "",
      orderStatus: 2,
      permissions: [],
      bookings: []
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem('userData')).roles[0]) {
      JSON.parse(localStorage.getItem('userData')).roles[0].permissions.forEach(item => {
        this.permissions.push(item.name)
      })
      if (!this.permissions.includes('manage_hotel')) {
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
    viewAddress(item) {
      this.addressData = {
        avenu: item.avenu,
        additional:item.additional,
        house: item.house,
        address_label: item.address_label,
        phone: item.phone,
        street: item.street,
        company: item.company,
        apt_number: item.apt_number,
        floor: item.floor,
        block: item.block,
        latitude: item.latitude, // أضف هذا الخط
        longitude: item.longitude, // وهذا الخط
      };
      this.addressDialog = true;
    },
    openInMap(latitude, longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(url, '_blank');
    },
    formatDate(dateString) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const date = new Date(dateString);
      const dayOfWeek = days[date.getDay()];
      const dayOfMonth = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();

      return `${dayOfWeek}, ${months[monthIndex]} ${dayOfMonth}, ${year}`;
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
  async changeStatus(item, status) {
      await this.$axios.$post(`vendor/change-groomers-booking-status/${item.id}`, {
        status: status
      }).then(res => {
        if (res.success === true) {
          this.confirmDialog = false; // تحقق إذا كنت تستخدم هذا في السياق الجديد
          this.getAllData(); // إعادة جلب البيانات لتحديث الجدول
        }
      }).catch(error => {
        // يمكنك هنا التعامل مع الخطأ، على سبيل المثال:
        console.error("There was an error updating the status:", error);
      });
    },
    setOrderStatusAndChange(item, status) {
      // هنا تقوم بتحديث الحالة في البيانات الخاصة بالعنصر item وإرسال طلب إلى الخادم لتحديث الحالة
      item.status = status === 2 ? 'Confirmed' : 'Rejected'; // مثال لتغيير الحالة محليًا
      this.changeStatus(item, status); // استدعاء الدالة لتغيير الحالة على الخادم
    },


    async getAllData() {
      const bookingsPromise = this.$axios.$get('vendor/groomers-booking');
      const servicesPromise = this.$axios.$get('vendor/groomers_services');
      
      try {
        const [bookingsResponse, servicesResponse] = await Promise.all([bookingsPromise, servicesPromise]);
        
        this.orders = bookingsResponse.data.map(order => ({
          ...order,
          service_name: servicesResponse.data.find(service => service.id === order.service_id)?.name,
          payment_status: order.payment_status || 'Not Paid',
        }));
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
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