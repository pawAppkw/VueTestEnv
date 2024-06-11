<template>
  <div class="contact-component">
    <v-container>
      <v-row>
        <v-col md="6">
          <h2 class="">Get In Touch</h2>
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="form.first_name"
                label="First Name"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="form.last_name"
                label="Last Name"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="form.phone"
                label="Phone"
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="form.message"
                label="Message"
                outlined
                hide-details
              >
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-btn @click="sendMessage()" class="w-100 " >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="6">
          <div class="image">
            <img src="../../assets/images/contact-image.png" alt="contact">
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="success"
      :timeout="timeout"
      color="success"
      bottom
      rounded="pill"
      center
    >
      {{successMessage}}
    </v-snackbar>
    <v-snackbar
      v-model="error"
      :timeout="timeout"
      color="error"
      bottom
      rounded="pill"
      center
    >
      {{errorMessage}}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data () {
    return{
      success: false,
      successMessage: '',
      error: false,
      errorMessage: '',
      form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  },
  methods: {
    async sendMessage() {
      const message = await this.$axios.$post('contact-us', this.form)
      if(message.success === true) {
        this.form = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: ''
      }
        this.success = true
        this.successMessage = message.message
      } else {
        this.error = true
        this.errorMessage = 'Error!'
      }
    }
  }
}
</script>
