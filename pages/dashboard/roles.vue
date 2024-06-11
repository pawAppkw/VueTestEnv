<template>
      <v-row>
        <v-col cols="12">
          <v-card elevation="0">
            <v-toolbar elevation="0">
              <v-toolbar-title>ٍRoles</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                placeholder="Enter Role Name"
                outlined
                dense
                hide-details=""
              ></v-text-field>
              <v-btn color="primary" dark elevation="0" class="ml-4">Search</v-btn>

              <v-btn class="ml-3" color="primary" outlined @click="addItem()"><v-icon>mdi-plus</v-icon> New Role</v-btn>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="roles"
              :search="search"
              class="elevation-1"
            >
              <template #[`item.action`]="{item}">
                <v-btn elevation="0" color="rgba(50, 183, 104, 1)" width="20" class="px-0 py-0" min-width="20" height="20" min-height="20" @click="editItem(item)">
                  <v-icon x-small color="white">mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn elevation="0" color="rgba(253, 111, 99, 1)" width="20" class="px-0 py-0" min-width="20" height="20" min-height="20" @click="confirmDelete(item)"><v-icon x-small color="white">mdi-trash-can-outline</v-icon></v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-dialog width="600" v-model="dialog">
          <v-card>
            <v-card-title>
              {{ addDialog == 1 ? 'Add New' : 'Edit'}}
            </v-card-title>
            <v-card-text>
              <FormsRoles
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
              Are You Sure to Delete {{ itemData.name }}?
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
      </v-row>
</template>
<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
        dialog: false,
      headers: [
        { text: 'Name', value: 'name' },
        // { text: 'Role', value: 'role' },
        { text: 'Action', value: 'action' },
      ],
      roles: [],
      search: '',
      itemData: {
        name: '',
        permissions: []
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
  created() {
    this.getAllData()
  },
  methods: {
    editItem(item) {
    this.addDialog = 0
    this.dialog = true
    this.itemData = item
    console.log('item', item)
  },
  addItem() {
    this.addDialog = 1
    this.dialog = true
    this.itemData =  {
      name: '',
      permissions: []
    }
  },
  confirmDelete(item) {
    this.confirmDialog = true
    this.itemData = item
  },
  async deleteItem() {
    const data = await this.$axios.$delete(`vendor/roles/${this.itemData.id}`)
    if(data.success == true) {
      this.confirmDialog = false
      this.successSnackbar = true
      this.successMessage = data.message
      this.itemData =  {
        name: '',
        permissions: []
    }
    this.getAllData()
    }
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
  errorRequest (event) {
    this.errorSnackbar = true
    this.errorMessage = event
  },
    async getAllData() {
    const data = await this.$axios.$get('vendor/roles')
    this.roles = data.data
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
