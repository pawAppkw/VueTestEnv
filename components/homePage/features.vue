<template>
  <div class="features-component">
    <v-container>
      <v-row>
        <v-col md="4">
          <div class="image">
            <img src="../../assets/images/feature-image.png" alt="feature-image">
          </div>
        </v-col>
        <v-col md="8">
          <h2 class="section-title">Our Features</h2>
          <p>We look after your little family, we ensure that we will give the best treatment for your little.</p>
          <v-row>
            <v-col md="4" v-for="(feature, i) in features" :key="i">
              <div class="d-flex">
                <v-icon color="#26C12C">
                  mdi-check
                </v-icon>
                <p class="mb-0">{{feature}}</p>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return{
      features: [
        'E-Wallet',
        'Train',
        'Doctors',
        'Buy Online',
        'Vets',
        'Hotels',
        'SOP',
        'Grooming',
        'Stores'
      ]
    }
  }
}
</script>
