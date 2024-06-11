
import Vue from 'vue';
import axios from 'axios';
export default function ({ $axios, redirect, $auth , app, $toast , store, $nuxt}) {
    $axios.onRequest(config => {
      if (app.$cookies.get("token")){
        config.headers.Authorization = app.$cookies.get("token")
      }
        // store.dispatch("startLoading");
        // setTimeout(() => {
        //     store.dispatch("stopLoading");
        //   }, 5000)

    })

    $axios.onError(error => {
      console.log('error', error.response)
      const code = parseInt(error.response && error.response.status)
      if (code == 401) {
          message = error.response.data.error
          $toast.error(message, { icon: 'mdi-alert-circle' })
          // if ($auth.loggedIn) {
              // $auth.logout()
              localStorage.removeItem('token')
              app.$cookies.remove("token")
              redirect('/auth/login')
          // }
      }
      if (error.response.data.error) {
        // const errors = Object.values(error.response.data.error)
        const errors = error.response.data.error
        $toast.error(errors, { icon: 'mdi-alert-circle' })
        // errors.forEach(err => {
        //     // $toast.error(err[0], { icon: 'mdi-alert-circle' })
        // })

    }
      return error.response
    })
    $axios.onResponse((response) => {
        // store.dispatch("stopLoading");

    })

}

Vue.use(axios);
