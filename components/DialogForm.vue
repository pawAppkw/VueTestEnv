<template>
  <v-dialog width="600" :value="value" @click:outside="$emit('input', false)" ref="dialog">
    <v-card width="600" :class="loading ? 'loading' : ''">
      <v-card-title class="d-flex justify-space-between">
        <h3>{{ title }}</h3>
        <v-btn text fab @click="$emit('input', false)"
          ><v-icon>mdi-window-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text><slot></slot></v-card-text>
      <v-card-actions
        ><slot name="action" @submit="loading = true"></slot
      ></v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.loading.v-card {
    overflow: hidden !important;
}
.loading.v-card::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
  z-index: 999998;
}

.loading.v-card::after {
  content: "";
  position: absolute;
  top: 40%;
  left: calc(300px - 26px);
  transform: translate(-50%, -50%);
  z-index: 999999;
  border: 0.25em solid #f3f3f3; /* Light grey */
  border-top: 0.25em solid #003276; /* Blue */
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>