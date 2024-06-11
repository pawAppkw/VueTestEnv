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
        <v-col md="6" cols="12">
          <v-text-field
            v-model="itemData.email"
            dense
            outlined
            label="email"
            type="email"
          ></v-text-field>
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="itemData.calling_code"
            dense
            outlined
            label="National phone code"
          ></v-text-field>
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="itemData.phone"
            dense
            outlined
            label="phone"
          ></v-text-field>
        </v-col>
        <v-col md="6" cols="12">
          <v-text-field
            v-model="itemData.password"
            dense
            outlined
            label="password"
            type="password"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <div class="d-flex flex-wrap" style="gap: 10px">
            <v-select
            v-model="itemData.role"
            :items="roles"
            item-text="name"
            item-value="id"
            label="Roles"
            dense
            outlined
          ></v-select>
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
        email: '',
        calling_code: '',
        phone: '',
        role: '',
        password: null
    },
    roles: []
  }),
  created() {
    this.getPermissions()
  },
  methods: {
    async getPermissions() {
        const data = await this.$axios.$get('vendor/roles')
        this.roles = data.data
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
          formItems.append("email", this.itemData.email);
          formItems.append("calling_code", this.itemData.calling_code);
          formItems.append("phone", this.itemData.phone);
          formItems.append("role", this.itemData.role);
          formItems.append("password", this.itemData.password);
      const data = await this.$axios.$post('vendor/create-admin', formItems)
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
          formItems.append("email", this.itemData.email);
          formItems.append("calling_code", this.itemData.calling_code);
          formItems.append("phone", this.itemData.phone);
          formItems.append("role", this.itemData.role);
          formItems.append("password", this.itemData.password);
        const data = await this.$axios.$post(`vendor/edit-admin/${this.itemData.id}`, formItems)
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
