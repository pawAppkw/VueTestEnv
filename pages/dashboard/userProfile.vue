<template>
  <div class="userProfile">
    <v-container>
      <v-row v-if="info.email">
        <v-col cols="12">
          <v-avatar size="128">
            <img
              :src="info.avatar"
              alt="User"
            >
          </v-avatar>
        </v-col>
        <v-col md="6" cols="12">
          <p><b>Name:</b> {{ info.name }}</p>
        </v-col>
        <v-col md="6" cols="12">
          <p><b>Email:</b> {{ info.email }}</p>
        </v-col>
        <v-col md="6" cols="12">
          <p><b>Mobile number:</b> {{ info.full_mobile_number }}</p>
        </v-col>
        <v-col cols="12">
          <v-btn class="primary text-color" outlined @click="openEditDialog()">
            Edit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 secandery">
          Profile Data
        </v-card-title>

        <v-card-text class="mt-3">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="userData.name"
                label="Name"
                placeholder="Name"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="userData.email"
                label="Email"
                placeholder="Email"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="userData.phone"
                label="phone"
                placeholder="phone"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="userData.calling_code"
                label="National phone code"
                placeholder="National phone code"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
              label="File input"
              outlined
              dense
              @change="fileAtteched"
            ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="updateInfo()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      info: {},
      userData: {
        name: '',
        email: '',
        avatar: '',
        phone: '',
        calling_code: ''
      },
      dialog: false,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async  getData () {
      const info = await this.$axios.$get('/vendor/get-info')
      this.info = info.admin
    },
    fileAtteched (event) {
      this.userData.avatar = event
    },
    async updateInfo () {
      const formItems = new FormData();
          formItems.append("name", this.userData.name);
          formItems.append("email", this.userData.email);
          formItems.append("avatar", this.userData.avatar);
          formItems.append("phone", this.userData.phone);
          formItems.append("calling_code", this.userData.calling_code);
          const data = await this.$axios.$post('vendor/update-profile', formItems)
          console.log('data', data)
          if(data.success === true){
            this.getData()
            this.dialog = false
          }
    },
    openEditDialog() {
      // console.log('this.info',  this.info)
      this.userData.name = this.info.name
      this.userData.email = this.info.email
      this.userData.phone = this.info.phone
      this.userData.calling_code = this.info.calling_code
      this.dialog = true
    }
  }
}
</script>
<style lang="scss">
.text-color{
  .v-btn__content{
    color: #fff;
  }
}
</style>
