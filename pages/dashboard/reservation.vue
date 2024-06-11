<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0">
        <v-toolbar elevation="0">
          <v-toolbar-title class="mr-3">Reservation</v-toolbar-title>
          <v-btn
            text
            :class="filter.type === 'all' ? 'tab-active' : ''"
            @click="filter.type = 'all'"
            >All Reservation</v-btn
          >
          <v-btn
            text
            :class="filter.type === 'Rejected' ? 'tab-active' : ''"
            @click="filter.type = 'Rejected'"
            >Booked</v-btn
          >
          <v-btn
            text
            :class="filter.type === 'In Preparation' ? 'tab-active' : ''"
            @click="filter.type = 'In Preparation'"
            >Rejected</v-btn
          >
          <v-btn
            text
            :class="filter.type === 'On the' ? 'tab-active' : ''"
            @click="filter.type = 'On the'"
            >Cancelled</v-btn
          >
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            outlined
            dense
            hide-details=""
            style="max-width: 150px; margin-left: auto"
          ></v-text-field>
          <v-btn color="primary" dark elevation="0" class="ml-4">Search</v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="orders"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.status="{ item }">
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
          <template v-slot:item.support="{ item }">
            <v-btn fab text>
              <v-icon>mdi-message-text</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <FormsOrder v-model="dialog" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  // layout: "dashboard",
  middleware: 'authenticated',
  data() {
    return {
        dialog: false,
      filter: {
        type: "all",
      },
      headers: [
        { text: "Reservation id", value: "id" },
        { text: "From", value: "from" },
        { text: "To", value: "to" },
        { text: "Price", value: "price" },
        { text: "No. of pets", value: "no" },
        { text: "Status", value: "status" },
      ],
      orders: [
        { id: "#1234567-ABCDEFG", from: "8:32 AM" , to: "4:30 PM", price: "$75", no: "2 Pets", status: "Rejected" },
        {
          id: "#2345678-HIJKLMN",
          from: "8:32 AM",
          to: "4:30 PM",
          price: "$150",
          no: "2 Pets",
          status: "In preparation",
        },
        {
          id: "#3456789-OPQRSTU",
          from: "8:32 AM",
          to: "4:30 PM",
          price: "$25",
          no: "2 Pets",
          status: "On the way",
        },
        { id: "#4567890-VWXYZAB", from: "8:32 AM", to: "4:30 PM", price: "$50", no: "2 Pets", status: "Completed" },
        { id: "#5678901-CDEFGHI", from: "8:32 AM", to: "4:30 PM", price: "$125", no: "2 Pets",status: "Created" },
        { id: "#6789012-JKLMNOP", from: "8:32 AM", to: "4:30 PM", price: "$100", no: "2 Pets",status: "Created" },
      ],
      search: "",
    };
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
