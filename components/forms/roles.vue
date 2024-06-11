<template>
  <div>
      <v-row>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="itemData.name"
            dense
            outlined
            label="Name"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <p>View</p>
          <div class="d-flex flex-wrap" style="gap: 10px">
            <v-checkbox
              v-for="item in permissions"
              :key="item.id"
              v-model="itemData.permissions"
              :label="item.name"
              :value="item.id"
              multiple
            />
          </div>
        </v-col>
      </v-row>
      <v-btn color="primary" @click="submit" block rounded>Save</v-btn>
  </div>
</template>
<script>
export default {
  props: ['itemData'],
  data: () => ({
    loading: false,
    form: {
      name: '',
      permissions: []
    },
    permissions: []
  }),
  created() {
    this.getPermissions()
  },
  methods: {
    async getPermissions() {
        const data = await this.$axios.$get('vendor/roles/create')
        this.permissions = data.data
    },
    submit() {
        if(this.itemData.id) {
          this.updateData()
        } else {
          this.addData()
        }
      },
      async addData() {
        const formItems = new FormData();
          formItems.append("name", this.itemData.name);
          this.itemData.permissions.forEach((item, i) => {
            formItems.append(`permissions[${i}]`, item);
          })
      const data = await this.$axios.$post('vendor/roles', formItems)
        try {
          if(data.success === true){
          this.$emit('successRequest', 'Data Adedd Succcessfly')
        } else {
          this.$emit('errorRequest', data.message? data.message: 'Error Request')
        }
      } catch (error) {
        console.log('error', error)
        this.$emit('errorRequest', data.message? data.message: 'Error Request')
      }
      },
      async updateData() {
        const formItems = new FormData();
          formItems.append("name", this.itemData.name);
          this.itemData.permissions.forEach((item, i) => {
            formItems.append(`permissions[${i}]`, item);
          })
        const data = await this.$axios.$post(`vendor/roles/${this.itemData.id}`, formItems)
        try {
          if(data.success === true){
          this.$emit('successRequest', 'Data Updated Succcessfly')
        } else {
          console.log('data', data)
          this.$emit('errorRequest', data.message? data.message: 'Error Request')
        }
      } catch (error) {
        console.log('error', error.response)
        this.$emit('errorRequest', data.message? data.message: 'Error Request')
      }
      }
    // async submit() {
    //   // this.loading = true;
    //   // setTimeout(() => {
    //   //   this.loading = false;
    //   // }, 3000);

    // },
  },
};
</script>
