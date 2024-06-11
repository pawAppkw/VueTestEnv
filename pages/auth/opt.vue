<template>
     <v-row class="px-10 text-center" justify="center">
    <v-col cols="12">
      <h1 class="text-h4">
        Otp Verification
      </h1>
    </v-col>
    <v-col cols="12">
      <p class="grey--text">Enter the 4 code numbers sent to this number</p>
      <p>{{$route.query.phone}}</p>
    </v-col>
    <v-col cols="12">
      <v-form @submit.prevent="submit">
        <v-row justify="center">
          <v-col cols="6">
            <v-otp-input length="6" v-model="form.code" />
          </v-col>
          <v-col cols="12">
            <p>Kindly Fill the following</p>
          </v-col>
          <v-col cols="12">
            <v-form>
              <v-row>
                <v-col cols="12" class="mb-0 pb-0">
                  <p class="text-left">New Password</p>
                  <v-text-field
                    outlined
                    hide-details=""
                    v-model="form.password"
                    append-icon="mdi-eye"
                    @click:append="show = !show"
                    :type="show ? 'text' : 'password'"
                  />
                </v-col>
                 <v-col cols="12" class="mb-0 pb-0">
                  <p class="text-left ">Confirm Password</p>
                  <v-text-field
                    outlined
                    hide-details=""
                    v-model="form.password_confirmation"
                    append-icon="mdi-eye"
                    @click:append="show1 = !show1"
                    :type="show1 ? 'text' : 'password'"
                  />
                </v-col>
              </v-row>
            </v-form>
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
          <!-- <v-col cols="12" class="mt-5">
            <a @click="resendCode()">Resend Code</a>
          </v-col> -->
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
  layout: "auth",
  middleware: 'unauthenticated',
  data: () => ({
    show: false,
    show1: false,
    loading: false,
    mobile: '',
    form: {
        code: "",
        password: "",
        password_confirmation: '',
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
  methods: {
    // async resendCode(){
    //   const data = await this.$axios.$post('/vendor/send-verification-code', {
    //     mobile: this.mobile
    //   })
    // },

    async submit () {
      const data = await this.$axios.$post('/vendor/reset-password', this.form)
      if (data.success === true){
        this.successSnackbar = true;
        this.successMessage = data.message;
        setTimeout(() => {
          this.$router.push({path: `/auth/login`})
          // this.disabled = false;
          // this.loading = false;
      }, 500);

      }
    }
  }
};
</script>
