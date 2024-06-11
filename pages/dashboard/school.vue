<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title>School Services</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ml-3" color="primary" outlined @click="addItem()">
        <v-icon>mdi-plus</v-icon>New Service
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="3" v-for="(product, index) in filteredProducts" :key="index">
          <v-card rounded="xl" class="overflow-hidden">
            <div class="product-image" :style="{ backgroundImage: 'url(' + product.thumbnail + ')' }"></div>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn rounded min-width="30" min-height="30" class="px-0 py-0" v-on="on" absolute top="0" color="white" right="0">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="editItem(product)">Edit</v-list-item>
                <v-list-item @click="deleteItem(product)">Delete</v-list-item>
              </v-list>
            </v-menu>
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-subtitle class="d-flex align-center">
              <h2 class="black--text">{{ product.name }}</h2>
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" class="primary--text description-toggle" @click="toggleDescription(product)">
                  <div v-if="!product.showFullDescription">
                    {{ truncateText(product.description, 100) }}
                    <span v-if="product.description.length > 100">Read More</span>
                  </div>
                  <div v-else>
                    {{ product.description }}
                    <span>Show Less</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog width="600" v-model="dialog">
      <v-card>
        <v-card-title>
          {{ addDialog == 1 ? 'Add Service' : 'Edit service' }}
        </v-card-title>
        <v-card-text>
          <schoolForm :itemData="itemData" @successRequest="successRequest" />
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
    <v-snackbar v-model="successSnackbar" color="success" shaped bottom right :timeout="timeout">
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar v-model="errorSnackbar" color="red" shaped bottom right :timeout="timeout">
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import schoolForm from '../../components/school/form.vue'
export default {
  middleware: 'authenticated',
  components: {
    schoolForm
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
        description_en: '',
        description_ar: '',
        price: '',
        image: null,
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
      if (!this.permissions.includes('manage_school')) {
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
    toggleDescription(item) {
      item.showFullDescription = !item.showFullDescription;
    },
    truncateText(text, length) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    },


    errorRequest(event) {
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
      this.itemData = {
        name_en: '',
        name_ar: '',
        description_en: '',
        description_ar: '',
        price: '',
        image: null,
      }
    },
    confirmDelete(item) {
      this.confirmDialog = true
      this.itemData = item
    },
    async deleteItem() {
      const data = await this.$axios.$delete(`vendor/schools_services/${this.itemData.id}`)
      if (data.success == true) {
        this.confirmDialog = false
        this.successSnackbar = true
        this.successMessage = data.message
        this.itemData = {
          name_en: '',
          name_ar: '',
          description_en: '',
          description_ar: '',
          price: '',
          image: null,
        }
        this.getAllData()
      }
    },
    
    async getAllData() {
      const response = await this.$axios.$get('vendor/schools_services');
      // Initialize 'showFullDescription' for each product
      this.filteredProducts = response.data.map(product => ({
        ...product,
        showFullDescription: false
      }));
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
  height: 250px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}

.description-toggle {
  cursor: pointer;
  /* Add more styles here to improve the visual cue for clickable descriptions */
}
</style>