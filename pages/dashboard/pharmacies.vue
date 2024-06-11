<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title>Pharmacies</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ml-3" color="primary" outlined @click="addItem()"><v-icon>mdi-plus</v-icon>New Pharmacies</v-btn>
    </v-toolbar>
    <v-card-text>
      <!-- <v-row>
        <v-col>
          @click="filterProducts(category.name)"
          <span v-for="category in categories" :key="category.id">
            <v-btn class="mx-2" color="primary" rounded :outlined="!filter.includes(category.name)" >{{ category.name }}</v-btn>
          </span>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col cols="3" v-for="(product, index) in filteredProducts" :key="index">
        <v-card rounded="xl" class="overflow-hidden">
          <!-- Use a div with a background image to simulate object-fit -->
          <div class="product-image" :style="{ backgroundImage: 'url(' + product.thumbnail + ')' }"></div>

              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn rounded min-width="30" min-height="30" class="px-0 py-0"  v-on="on" absolute top="0" color="white" right="0">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="editItem(product)">Edit</v-list-item>
                  <v-list-item @click="confirmDelete(product)">Delete</v-list-item>
                </v-list>
              </v-menu>
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-subtitle class="align-center">
              <h2 class="black--text">{{product.name}}</h2>
              <br>
              <span text class="ml-auto primary--text"> {{product.open_from_format + ' - ' + product.open_to_format}}</span>
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <!-- <v-col class="primary--text">{{product.categories.join(", ")}}</v-col> -->
              </v-row>
              <v-row>
                <v-col cols class="primary--text">{{product.address}}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog width="600" v-model="dialog">
      <v-card>
        <v-card-title>
          {{ addDialog == 1 ? 'Add Pharmacies' : 'Edit Pharmacies'}}
        </v-card-title>
        <v-card-text>
          <roomsForm :itemData="itemData" @successRequest="successRequest"/>
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
import roomsForm from '../../components/pharmacies/form.vue'
export default {
  middleware: 'authenticated',
  components : {
    roomsForm
  },
  data() {
    return {
      filter: ['All'],
      products: [],
      filteredProducts: [],
      categories: [],
        dialog: false,
        addDialog: 0,
        itemData: {
          name_en: '',
          name_ar: '',
          address_en: '',
          address_ar: '',
          latitude: '',
          longitude: '',
          image: null,
          open_from: '',
          open_to: '',
        },
        confirmDialog: false,
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
    // filterProducts(category) {
    //   this.filter = [category]
    //   if (category === "All") {
    //     this.filteredProducts = this.products;
    //   } else {
    //     this.filteredProducts = this.products.filter((product) =>
    //       product.categories.includes(category)
    //     );
    //   }
    // },
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
          address_en: '',
          address_ar: '',
          latitude: '',
          longitude: '',
          image: null,
          open_from: '',
          open_to: '',
      }
    },
    confirmDelete(item) {
    this.confirmDialog = true
    this.itemData = item
  },
  async deleteItem() {
    const data = await this.$axios.$delete(`vendor/pharmacies/${this.itemData.id}`)
    if(data.success == true) {
      this.confirmDialog = false
      this.successSnackbar = true
      this.successMessage = data.message
      this.itemData =  {
        name_en: '',
          name_ar: '',
          address_en: '',
          address_ar: '',
          latitude: '',
          longitude: '',
          image: null,
          open_from: '',
          open_to: '',
    }
    this.getAllData()
    }
  },
  async getAllData() {
    const data = await this.$axios.$get('vendor/pharmacies')
    this.filteredProducts = data.data
  },
  //   async getAllCategories() {
  //   const data = await this.$axios.$get('vendor/products_categories')
  //   this.categories = data.data
  // }
  },
};
</script>
<style scoped>
.product-image {
  height: 250px; /* Set the height you want */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain; /* This simulates object-fit: contain */
}
</style>