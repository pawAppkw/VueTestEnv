<template>
     <v-row class="px-10 text-center" justify="center">
    <v-col cols="12">
      <h1 class="text-h4">
        Otp Verification
      </h1>
    </v-col>
    <v-col cols="12">
      <p class="grey--text">Enter the 6 code numbers sent to this number</p>
      <p>{{$route.query.phone}}</p>
    </v-col>
    <v-col cols="12">
      <v-form @submit.prevent="submit">
        <v-row justify="center">
          <v-col cols="6">
            <v-otp-input length="6" v-model="form.code" />
          </v-col>
          <v-col cols="12" class="mt-5">
            <v-btn
                type="submit"
              color="primary"
              height="55"
              width="335"
              :loading="loading"
              elevation=""
              >Verify</v-btn
            >
          </v-col>
          <v-col cols="12" class="mt-5">
            <a @click="resendCode()">Resend Code</a>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
    <v-snackbar
    v-model="successSnackbar"
    color="success"
    shaped
    absolute
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
  middleware: 'unauthenticated',
  layout: "auth",
  data: () => ({
    show: false,
    loading: false,
    mobile: "",
    form: {
        code: "",
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
  }),
  created() {
    this.mobile = localStorage.getItem('phone')
  },
  // mounted() {
  //   this.resendCode()
  // },
  methods: {
    async resendCode(){
      const data = await this.$axios.$post('/vendor/send-verification-code', {
        mobile: this.mobile
      })
      console.log('data', data)
      this.successMessage = 'Code has been Sent Successfully';
      this.successSnackbar = true;
    },
    async submit () {
      const data = await this.$axios.$post('/vendor/validate-verification-code', this.form)
      if (data.success === true){
        this.successSnackbar = true;
        this.successMessage = data.message;
        setTimeout(() => {
          this.$router.push('/auth/login')
          // this.disabled = false;
          // this.loading = false;
      }, 500);

      }
      console.log('data', data)
        // this.$router.push({path: `/auth/new-password`})
    }
  }
};
</script>
