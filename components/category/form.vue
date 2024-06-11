<template>
  <div class="form">
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="itemData.name_en"
            dense
            outlined
            label="En Name"
            :rules="validRule"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="itemData.name_ar"
            dense
            outlined
            label="Ar Name"
            :rules="validRule"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn :disabled="!isFormValid" color="primary" @click="submit()" block rounded>Save</v-btn>
  </div>
</template>
<script>
export default {
  props: ['itemData'],
    data: () => ({
      form: {
        name_en: '',
        name_ar: ''
      },
      validRule: [(v) => !!v || "Field is required"],
    }),
    computed: {
      isFormValid() {
      return (
        this.itemData.name_en && this.itemData.name_ar
      );
    },
  },
    methods: {
      submit() {
        if(this.itemData.id) {
          this.updateData()
        } else {
          this.addData()
        }
      },
      async addData() {
        const data = await this.$axios.$post('vendor/products_categories', this.itemData)
        try {
          if(data.success === true){
          this.$emit('successRequest', 'Data Adedd Succcessfly')
        } else {
          this.$emit('errorRequest', data.message? data.message: 'Error Request')
        }
      } catch (error) {
        console.log('error', error)
        this.$emit('errorRequest', data.message? data.message: 'Error Request')
      }
      },
      async updateData() {
        const form = {
          name_en: this.itemData.name_en,
          name_ar: this.itemData.name_ar,
        }
        const data = await this.$axios.$post(`vendor/products_categories/${this.itemData.id}`, form)
        try {
          if(data.success === true){
          this.$emit('successRequest', 'Data Updated Succcessfly')
        } else {
          console.log('data', data)
          this.$emit('errorRequest', data.message? data.message: 'Error Request')
        }
      } catch (error) {
        console.log('error', error.response)
        this.$emit('errorRequest', data.message? data.message: 'Error Request')
      }
      }
    }
}
</script>
