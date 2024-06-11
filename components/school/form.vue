<template>
  <div class="form">
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="itemData.name_en"
            dense
            outlined
            label="EN Name"
            :rules="validRule"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
                v-model="itemData.name_ar"
                dense
                outlined
                label="AR Name"
                :rules="validRule"
              ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-textarea
              v-model="itemData.description_en"
              dense
              outlined
              label="En Description"
              :rules="validRule"
            ></v-textarea>
          </v-col>

          <v-col cols="6">
            <v-textarea
              v-model="itemData.description_ar"
              dense
              outlined
              label="Ar Description"
              :rules="validRule"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-text-field
                v-model="itemData.price"
                dense
                outlined
                type="number"
                label="Amount"
                :rules="validRule"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-file-input
                prepend-icon="mdi-camera"
                chips
                accept="image/*"
                label="service image"
                outlined
                dense
                @change="uploadimage"
              ></v-file-input>
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
        name_ar: '',
        description_en: '',
        description_ar: '',
        price: '',
        image: null,
      },
      roomTypes: [
        {id: 1, text: 'Single'},
        {id: 2, text: 'Double'},
        {id: 3, text: 'Triple'},
      ],
      validRule: [(v) => !!v || "Field is required"],
    }),
    computed: {
      isFormValid() {
        return (
          this.itemData.name_en && this.itemData.name_ar && this.itemData.description_en &&
          this.itemData.description_ar && this.itemData.price
        );
      },
    },
    methods: {
      uploadimage (event){
        this.itemData.image = event
      },
      submit() {
        const formItems = new FormData();
          formItems.append("name_en", this.itemData.name_en);
          formItems.append("name_ar", this.itemData.name_ar);
          formItems.append("description_en", this.itemData.description_en);
          formItems.append("description_ar", this.itemData.description_ar);
          formItems.append("price", this.itemData.price);
          formItems.append("image", this.itemData.image);
        if(this.itemData.id) {
          this.updateData(formItems)
        } else {
          this.addData(formItems)
        }
      },
      async addData(formItems) {
        const data = await this.$axios.$post('vendor/schools_services', formItems)
        try {
          if(data.success === true){
          this.$emit('successRequest', 'Data Adedd Succcessfly')
        } else {
          this.$emit('errorRequest', data.message? data.message: 'Error Request')
        }
      } catch (error) {
        console.log('error', error.response)
        this.$emit('errorRequest', data.message? data.message: 'Error Request')
      }
      },
      async updateData(formItems) {
        const data = await this.$axios.$post(`vendor/schools_services/${this.itemData.id}`, formItems)
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
