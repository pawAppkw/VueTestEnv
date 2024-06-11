<template>
  <v-card>
    <v-card-title>
      <span class="headline">Promotions</span>
      <v-spacer></v-spacer>
      <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      placeholder="Enter Promostions Name"
      outlined
      dense
      hide-details=""
    ></v-text-field>
      <v-btn color="primary" class="ml-3" outlined @click="addItem()">
        <v-icon>mdi-plus</v-icon>
        Promotion
      </v-btn>
    </v-card-title>
    <v-data-table :headers="headers" :items="promotions" :search="search" class="elevation-1">
      <!-- <template v-slot:[`item.start_date`]="{ item }">
        {{ item.start_date.slice(0,10) }}
      </template>
      <template v-slot:[`item.end_date`]="{ item }">
        {{ item.end_date.slice(0,10) }}
      </template> -->
      <template #[`item.is_active`]="{ item }">
        <v-chip
          :color="`${getStatusColor(item.is_active)} lighten-1`"
          text-color="white"
          >
          {{ item.is_active == 1 ? 'Active' : 'Not active' }}
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
              icon
              elevation="0"
              color="primary"
              @click="editItem(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
            icon
            elevation="0"
            color="red"
            @click="confirmDelete(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
      </template>
    </v-data-table>
    <v-dialog width="600" v-model="dialog">
      <v-card>
        <v-card-title>
          {{ addDialog == 1 ? 'Add New' : 'Edit'}}
        </v-card-title>
        <v-card-text>
          <FormsPromotions
          :itemData="itemData"
          @successRequest="successRequest"
        />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog width="600" v-model="confirmDialog">
      <v-card>
        <v-card-title>
          Delete Confirmation
        </v-card-title>
        <v-card-text>
          Are You Sure to Delete {{ itemData.name_en }}?
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="error" dense @click="deleteItem()">Delete</v-btn>
          <v-btn color="primary" dense @click="confirmDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
    v-model="successSnackbar"
    color="success"
    shaped
    bottom
    right
    :timeout="timeout"
  >
    {{ successMessage }}
  </v-snackbar>
  <v-snackbar
    v-model="errorSnackbar"
    color="red"
    shaped
    bottom
    right
    :timeout="timeout"
  >
    {{ errorMessage }}
  </v-snackbar>
  </v-card>
</template>

<script>
import FormsPromotions from '../../components/forms/promotions.vue'
export default {
  // layout: "dashboard",
  middleware: 'authenticated',
  components: {
    FormsPromotions,
  },
  data() {
    return {
      dialog: false,
      loading:true,
      headers: [
        { text: "Promotion Name", value: "name_en" },
        { text: "Code", value: "code" },
        { text: "Promotion Price", value: "discount" },
        { text: "Starting Date", value: "start_date" },
        { text: "Ending Date", value: "end_date" },
        { text: "Status", value: "is_active" },
        { text: "Actions", value: "actions" },
      ],
      promotions: [],
      itemData: {
        name_en: '',
        name_ar: '',
        code: '',
        discount_type: '',
        discount: '',
        is_active: '',
        start_date: '',
        end_date: ''
      },
      addDialog: 0,
      confirmDialog: false,
      search: '',
      successSnackbar: false,
      errorSnackbar: false,
      errors: false,
      timeout: 10000,
      successMessage: "",
      errorMessage: "",
      multiErrorMessage: "",
      soloErrorMessage: "",
      loading: false,
      disabled: false,
    };
  },
  created(){
  this.getAllData()
},
methods: {
  successRequest(event) {
    this.dialog = false
    this.successSnackbar = true
    this.successMessage = event
    this.getAllData()
    setTimeout(() => {
      this.successSnackbar = false
      this.successMessage = ''
    }, 1000);
  },
  errorRequest (event) {
    this.errorSnackbar = true
    this.errorMessage = event
  },
  editItem(item) {
    this.addDialog = 0
    this.dialog = true
    this.itemData = item
  },
  addItem() {
    this.addDialog = 1
    this.dialog = true
    this.itemData =  {
      name_en: '',
        name_ar: '',
        code: '',
        discount_type: '',
        discount: '',
        is_active: '',
        start_date: '',
        end_date: ''
    }
  },
  confirmDelete(item) {
    this.confirmDialog = true
    this.itemData = item
  },
  getStatusColor(status) {
      return status === 1 ? "green" : "red";
    },
  async deleteItem() {
    const data = await this.$axios.$delete(`vendor/s/${this.itemData.id}`)
    if(data.success == true) {
      this.confirmDialog = false
      this.successSnackbar = true
      this.successMessage = data.message
      this.itemData =  {
        name_en: '',
        name_ar: '',
        code: '',
        discount_type: '',
        discount: '',
        is_active: '',
        start_date: '',
        end_date: ''
    }
    this.getAllData()
    }
  },
  async getAllData() {
    const data = await this.$axios.$get('vendor/promo_codes')
    data.data.forEach(item => {
      item.start_date = item.start_date.slice(0,10)
      item.end_date = item.end_date.slice(0,10)
    })
    this.promotions = data.data
  }
},
};
</script>
