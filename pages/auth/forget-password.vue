<template>
     <v-row class="px-10 text-center" justify="center">
    <v-col cols="12">
      <h1 class="text-h4">
Forget Password      </h1>
    </v-col>
    <v-col cols="12">
      <p class="grey--text">Enter your Phone number and we send you a password reset link.</p>
    </v-col>
    <v-col cols="12">
      <v-form @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <p class="text-left">Phone Number</p>
            <v-text-field label="" outlined v-model="form.phone" />
          </v-col>
          <v-col cols="12" class="mt-5">
            <v-btn
                type="submit"
              color="primary"
              height="55"
              width="335"
              :loading="loading"
              elevation=""
              >Send request</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: "auth",
  middleware: 'unauthenticated',
  data: () => ({
    show: false,
    loading: false,
    form: {
      phone: "",
    },
  }),
  methods: {
    async  submit () {
      const data = await this.$axios.$post('/vendor/forget-password', {
        mobile: this.form.phone
      })
      if(data.success === true) {
        localStorage.setItem('phone', this.form.phone)
        this.$router.push({path: `/auth/opt`})
      }
        // this.$router.push({path: `/auth/opt`, query: {phone: this.form.phone}})
    }
  }
};
</script>
