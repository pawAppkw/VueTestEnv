<template>
  <div v-if="content" class="my-16">
    <v-container>
      <div v-html="content"></div>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'landingPage',
  data() {
    return {
      content: null
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const data = await this.$axios.$get('terms_conditions')
      this.content = data.terms_conditions.text
    }
  }
}
</script>
