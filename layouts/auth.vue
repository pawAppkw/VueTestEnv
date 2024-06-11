<template>
<v-app>
    <v-row class="auth-container" >
        <v-col cols="12" md="6" style="background:#002D69" class="text-center w-100 image">
            <img class="w-25" src="../assets/images/logo.svg" alt="">
            <div class="white--text">Login To Live The Experience</div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center"><Nuxt /></v-col>
    </v-row>
</v-app>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.auth-container {
    min-height: 100vh;
    .image{
      img{
        margin: auto;
        margin-top: 25%;
      }
    }
}
</style>
