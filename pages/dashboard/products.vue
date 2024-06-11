<template>
  <div>
    <v-toolbar elevation="0">
      <v-toolbar-title>Productss</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ml-3" color="primary" outlined @click="addItem()"><v-icon>mdi-plus</v-icon>New Product</v-btn>
    </v-toolbar>
    <v-card-text>
      <!-- <v-row>
        <v-col>
          @click="filterProducts(category.id)"
          <span v-for="category in categories" :key="category.id">
            <v-btn class="mx-2" color="primary" rounded :outlined="!filter.includes(category.id)" >{{ category.name }}</v-btn>
          </span>
        </v-col>
      </v-row> -->
      <v-row>
        <!-- {{ filteredProducts }} -->
        <v-col cols="3" v-for="(product, index) in filteredProducts" :key="index">
          <v-card rounded="xl" class="overflow-hidden">
            <div class="product-image" :style="{ backgroundImage: 'url(' + product.thumbnail + ')' }"></div>

            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn rounded min-width="30" min-height="30" class="px-0 py-0" v-on="on" absolute top="0" color="white"
                  right="0">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="editProduct(product)">Edit</v-list-item>
                <v-list-item @click="confirmDelete(product)">Delete</v-list-item>
              </v-list>
            </v-menu>
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-subtitle class="d-flex align-center">
              <h2 class="black--text">{{ product.name }}</h2>
              <!-- <span text class="ml-auto primary--text"> 300<v-icon color="#000">mdi-arrow-top-right</v-icon></span> -->

              <!-- Conditionally display stock status under the product name 
              <span v-if="product.amount === 0" class="ml-2 red--text">Out of Stock</span>
              <span v-else class="ml-2 green--text">In Stock</span>-->
            </v-card-subtitle>

            <v-card-subtitle class="d-flex align-center">
                <!--<h2 class="black--text">{{ product.name }}</h2>
             <span text class="ml-auto primary--text"> 300<v-icon color="#000">mdi-arrow-top-right</v-icon></span> -->

              <!-- Conditionally display stock status under the product name -->
              <span v-if="product.amount === 0" class="ml-2 red--text">Out of Stock</span>
              <span v-else class="ml-2 green--text">In Stock</span>
            </v-card-subtitle>
            <v-card-text>
              <!-- <v-row>
                <v-col class="primary--text">{{product.categories.join(", ")}}</v-col>
              </v-row> -->
              <v-row>
                <v-col cols="3" class="primary--text"></v-col>
                <v-col cols="9" class="text-right">
                  <span v-if="product.discount > 0"  class="primary px-1 py-1 rounded-xl secondary--text">{{ product.price }}KWD</span>
                  <span class="primary px-1 py-1 rounded-xl red--text">{{ calculateDiscountedPrice(product) }} KWD</span>
                </v-col>
              </v-row>
              <!-- <v-card-subtitle class="d-flex align-center justify-space-between">
                <div>
                  <span v-if="product.discount > 0" class="red--text" style="text-decoration: line-through;">{{ product.price }} KWD</span>
                  <span>{{ calculateDiscountedPrice(product) }} KWD</span>
                </div>
              </v-card-subtitle> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog width="600" v-model="dialog">
      <v-card>
        <v-card-title>
          {{ addDialog == 1 ? 'Add Product' : 'Edit Product' }}
        </v-card-title>
        <v-card-text>
          <productForm :itemData="itemData" :categories="categories" @successRequest="successRequest" />
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
import productForm from '../../components/products/form.vue'
export default {
  components: {
    productForm
  },
  middleware: 'authenticated',
  data() {
    return {
      filter: ['All'],
      products: [],
      filteredProducts: [],
      categories: [],
      confirmDialog: false,
      dialog: false,
      addDialog: 0,
      itemData: {
        name_en: '',
        name_ar: '',
        ingredients_en: '',
        ingredients_ar: '',
        description_en: '',
        description_ar: '',
        category_id: '',
        price: '',
        amount: '',
        discount: 0,
        image: null,
      },
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
      if (!this.permissions.includes('manage_store')) {
        this.$router.push('/dashboard')
      }
    } else {
      localStorage.clear()
    }
    this.getAllData()
    this.getAllCategories()
  },
  methods: {
   calculateDiscountedPrice(product) {
    if (product.discount > 0) {
      return (product.price - (product.price * (product.discount / 100))).toFixed(2);
    }
    return product.price;
    },
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
    errorRequest(event) {
      this.errorSnackbar = true
      this.errorMessage = event
    },
    // filterProducts(category) {
    //   this.filter = [category]
    //   if (category === "All") {
    //     this.filteredProducts = this.products;
    //   } else {
    //     console.log('category', category)
    //     this.filteredProducts = this.filteredProducts.filter((product) =>
    //       product.category_id.includes(category)
    //     );
    //   }
    // },
    editProduct(product) {
      this.addDialog = 0
      this.dialog = true
      this.itemData = product
    },
    confirmDelete(item) {
      this.confirmDialog = true
      this.itemData = item
    },
    async deleteItem() {
      const data = await this.$axios.$delete(`vendor/products/${this.itemData.id}`)
      if (data.success == true) {
        this.confirmDialog = false
        this.successSnackbar = true
        this.successMessage = data.message
        this.itemData = {
          name_en: '',
          name_ar: '',
          ingredients_en: '',
          ingredients_ar: '',
          description_en: '',
          description_ar: '',
          category_id: '',
          price: '',
          amount: '',
          discount: '',
          image: null,
        }
        this.getAllData()
      }
    },
    addItem() {
      this.addDialog = 1
      this.dialog = true
      this.itemData = {
        name_en: '',
        name_ar: '',
        ingredients_en: '',
        ingredients_ar: '',
        description_en: '',
        description_ar: '',
        category_id: '',
        price: '',
        amount: '',
        discount: '',
        image: null,
      }
    },
    async getAllData() {
      const data = await this.$axios.$get('vendor/products')
      this.filteredProducts = data.data
    },
    async getAllCategories() {
      const data = await this.$axios.$get('vendor/products_categories')
      this.categories = data.data
    }
  }
}
</script>
<style scoped>
.product-image {
  height: 250px;
  /* Set the height you want */
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  /* This simulates object-fit: contain */
}
</style>