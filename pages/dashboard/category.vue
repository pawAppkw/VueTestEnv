<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0">
        <v-toolbar elevation="0">
          <v-toolbar-title>Categories</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            placeholder="Enter Category Name"
            outlined
            dense
            hide-details=""
          ></v-text-field>
          <v-btn color="primary" dark elevation="0" class="ml-4">Search</v-btn>

          <v-btn class="ml-3" color="primary" outlined @click="addItem()"><v-icon>mdi-plus</v-icon>New Category</v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          class="elevation-1"
        >
          <template #[`item.view`]="{item}">
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
      </v-card>
    </v-col>
    <v-dialog width="600" v-model="dialog">
      <v-card>
        <v-card-title>
          {{ addDialog == 1 ? 'Add Category' : 'Edit Category'}}
        </v-card-title>
        <v-card-text>
          <categoryForm :itemData="itemData" @successRequest="successRequest"/>
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
  <!-- <v-snackbar
    v-model="errorSnackbar"
    color="red"
    shaped
    bottom
    right
    :timeout="timeout"
  >
    {{ errorMessage }}
  </v-snackbar> -->
  </v-row>
</template>
<script>
import categoryForm from '../../components/category/form.vue'
export default {
  middleware: 'authenticated',
  components : {
    categoryForm
  },
data() {
return {
  confirmDialog: false,
    dialog: false,
    addDialog: 0,
    headers: [
      { text: 'Category Id', value: 'id' },
      { text: 'En Name', value: 'name_en' },
      { text: 'AR Name', value: 'name_ar' },
      { text: 'Actions', value: 'view' },
    ],
    formTitle: '',
    items: [],
    itemData: {
      name_en: '',
      name_ar: ''
    },
    search: '',
    successSnackbar: false,
    errorSnackbar: false,
    errors: false,
    timeout: 10000,
    successMessage: "",
    errorMessage: "",
    loading: false,
    disabled: false,
    permissions: []
};
},
created(){
  if (JSON.parse(localStorage.getItem('userData')).roles[0]) {
      JSON.parse(localStorage.getItem('userData')).roles[0].permissions.forEach(item => {
        this.permissions.push(item.name)
      })
      if(!this.permissions.includes('manage_store')) {
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
      name_ar: ''
    }
  },
  confirmDelete(item) {
    this.confirmDialog = true
    this.itemData = item
  },
  async deleteItem() {
    const data = await this.$axios.$delete(`vendor/products_categories/${this.itemData.id}`)
    if(data.success == true) {
      this.confirmDialog = false
      this.successSnackbar = true
      this.successMessage = data.message
      this.itemData =  {
      name_en: '',
      name_ar: ''
    }
    this.getAllData()
    }
  },
  async getAllData() {
    const data = await this.$axios.$get('vendor/products_categories')
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
