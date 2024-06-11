<template>
  <v-row class="px-10 text-center" justify="center">
    <v-col cols="12">
      <h1 class="text-h4">
        Welcome to <span class="yellow--text text-h4">P</span>awApp
      </h1>
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
          <v-col cols="12" class="mt-5">
            <v-btn
              to="/dashboard"
              color="primary"
              height="55"
              width="335"
              :loading="loading"
              elevation=""
              >Sign in</v-btn
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
    show1: false,
    loading: false,
    form: {
      password: "",
      password_confirmation: '',
    },
  }),
};
</script>
