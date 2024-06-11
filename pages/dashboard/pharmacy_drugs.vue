<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title>Pharmacies Drugs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ml-3" color="primary" outlined @click="addItem()"><v-icon>mdi-plus</v-icon>Add New</v-btn>
    </v-toolbar>
    <v-card-text>
      <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
    <template #[`item.image`]="{item}">
      <v-img
      :src="item.thumbnail"
      :lazy-src="item.thumbnail"
      max-height="70"
      max-width="70"/>
    </template>
    <template #[`item.description`]="{item}">
      {{ item.description.length > 25 ? item.description.substring(0, 25) + "..." : item.description }}
    </template>
      <template #[`item.view`]="{item}">
        <div class="d-flex">
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
          color="error"
          @click="confirmDelete(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        </div>
      </template>
    </v-data-table>
    </v-card-text>
    <v-dialog width="600" v-model="dialog">
      <v-card>
        <v-card-title>
          {{ addDialog == 1 ? 'Add New' : 'Edit'}}
        </v-card-title>
        <v-card-text>
          <pharmacy_drugsForm
            :itemData="itemData"
            :pharmacy_categories="pharmacyCategories"
            :pharmacies="pharmacies"
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
  </div>
</template>

<script>
import pharmacy_drugsForm from '../../components/pharmacy_drugs/form.vue'
export default {
  middleware: 'authenticated',
  components : {
    pharmacy_drugsForm
  },
  data() {
    return {
      filter: ['All'],
      items: [],
      pharmacyCategories: [],
      confirmDialog: false,
      pharmacies: [],
      categories: [],
        dialog: false,
        addDialog: 0,
        itemData: {
          name_en: '',
          name_ar: '',
          description_en: '',
          description_ar: '',
          price: '',
          pharmacy_category_id: '',
          pharmacy_id: '',
          image: null,
          discount: '',
          quantity: '',
        },
        headers: [
          { text: 'Id', value: 'id' },
          { text: 'Name', value: 'name' },
          { text: 'Description', value: 'description' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Price', value: 'price' },
          { text: 'new price', value: 'new_price' },
          { text: 'discount', value: 'discount' },
          { text: 'image', value: 'image' },
          { text: 'View', value: 'view' },
        ],
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
        permissions: []
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem('userData')).roles[0]) {
      JSON.parse(localStorage.getItem('userData')).roles[0].permissions.forEach(item => {
        this.permissions.push(item.name)
      })
      if(!this.permissions.includes('manage_vet')) {
          this.$router.push('/dashboard')
        }
    } else {
      localStorage.clear()
    }
    this.getAllData()
    this.getAllPharmacies()
    this.getAllPharmacyCategories()
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
          description_en: '',
          description_ar: '',
          price: '',
          pharmacy_category_id: '',
          pharmacy_id: '',
          image: null,
          discount: '',
          quantity: '',
      }
    },
    confirmDelete(item) {
    this.confirmDialog = true
    this.itemData = item
  },
  async deleteItem() {
    const data = await this.$axios.$delete(`vendor/pharmacy_drugs/${this.itemData.id}`)
    if(data.success == true) {
      this.confirmDialog = false
      this.successSnackbar = true
      this.successMessage = data.message
      this.itemData =  {
        name_en: '',
          name_ar: '',
          description_en: '',
          description_ar: '',
          price: '',
          pharmacy_category_id: '',
          pharmacy_id: '',
          image: null,
          discount: '',
          quantity: '',
    }
    this.getAllData()
    }
  },
  async getAllData() {
    const data = await this.$axios.$get('vendor/pharmacy_drugs')
    this.items = data.data
  },
  async getAllPharmacies() {
    const data = await this.$axios.$get('vendor/pharmacies')
    this.pharmacies = data.data
  },
  async getAllPharmacyCategories() {
    const data = await this.$axios.$get('vendor/pharmacy_drugs_categories')
    this.pharmacyCategories = data.data
  },
  },
};
</script>
