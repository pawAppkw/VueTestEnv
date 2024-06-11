<template>
  <v-row class="px-10 text-center" justify="center">
    <v-col cols="12">
      <h1 class="text-h4">
        Welcome bashar <span class="yellow--text text-h4">P</span>awApp
      </h1>
    </v-col>
    <v-col cols="12">
      <p>Kindly Fill the following</p>
    </v-col>
    <v-col cols="12">
      <v-form>
        <v-row>
          <v-col cols="12">
            <p class="text-left">Phone Number</p>
            <v-text-field label="" outlined v-model="form.phone" />
          </v-col>
          <v-col cols="12" class="mb-0 pb-0">
            <p class="text-left">Password</p>
            <v-text-field
              outlined
              hide-details=""
              v-model="form.password"
              append-icon="mdi-eye"
              @click:append="show = !show"
              :type="show ? 'text' : 'password'"
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-baseline mt-0 pt-0"
          >
            <v-checkbox
              v-model="form.remember_me"
              :true-value="1"
              :false-value="0"
              label="Remember me"
              hide-details=""
            />
            <nuxt-link to="/auth/forget-password">
              forget password ?
            </nuxt-link>
          </v-col>
          <v-col cols="12" class="mt-5">
            <!-- to="/dashboard" -->
            <v-btn
              color="primary"
              height="55"
              width="335"
              :loading="loading"
              :disabled="disabled"
              elevation=""
              @click="login()"
              >Sign in</v-btn
            >
            <nuxt-link class="d-block py-5" to="/auth/signup">OR Register</nuxt-link>
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
  <v-snackbar
    v-model="errorSnackbar"
    color="red"
    shaped
    bottom
    right
    :timeout="timeout"
  >
    {{ errorMessage }}
  </v-snackbar>
  </v-row>
</template>
<script>
export default {
  layout: "auth",
  middleware: 'unauthenticated',
  data: () => ({
    show: false,
    form: {
      phone: "",
      password: "",
      remember_me: 0,
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
  methods: {
    async login() {
      this.loading = true;
        this.disabled = true;
      const formData = {
        full_mobile_number: this.form.phone,
        password: this.form.password
      }
    const data = await this.$axios.$post('vendor/login', formData)
    if(data.success === true){
      if (data.is_verified === true) {
        this.successSnackbar = true;
        this.successMessage = data.message;
        localStorage.setItem('token', 'Bearer '+ data.token)
        this.$cookies.set("token", 'Bearer '+ data.token)
        localStorage.setItem('userData', JSON.stringify(data.user))
        setTimeout(() => {
          this.$router.push('/dashboard')
          this.disabled = false;
        this.loading = false;
        }, 500);
      }
      else {
        localStorage.setItem('phone', this.form.phone)
        this.$router.push('/auth/verify-phone')
      }
    } else {
      this.errorMessage = data.message
      this.disabled = false;
      this.loading = false;
    }

  }
  }
};
</script>
