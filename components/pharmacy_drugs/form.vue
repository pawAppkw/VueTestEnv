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
                type="number"
                dense
                outlined
                label="Amount"
                :rules="validRule"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  v-model="itemData.discount"
                  type="number"
                  dense
                  outlined
                  label="Discount"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="itemData.quantity"
                    type="number"
                    dense
                    outlined
                    label="Quantity"
                    :rules="validRule"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="itemData.pharmacy_category_id"
                    item-text="name"
                    item-value="id"
                    :items="pharmacy_categories"
                    dense
                    outlined
                    label="pharmacy category"
                    :rules="validRule"
                  ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="itemData.pharmacy_id"
                      item-text="name"
                      item-value="id"
                      :items="pharmacies"
                      dense
                      outlined
                      label="Pharmacy"
                      :rules="validRule"
                    ></v-select>
                    </v-col>
              <v-col cols="12">
                <v-file-input
                  prepend-icon="mdi-camera"
                  chips
                  accept="image/*"
                  label="product image"
                  outlined
                  dense
                  hint="153 x 103"
                  persistent-hint
                  @change="uploadimage"
                ></v-file-input>
              </v-col>
      </v-row>
      <v-btn :disabled="!isFormValid" color="primary" @click="submit()" block rounded>Save</v-btn>
  </div>
</template>
<script>
export default {
  props: ['itemData', 'pharmacy_categories', 'pharmacies'],
    data: () => ({
      form: {
        name_en: '',
          name_ar: '',
          description_en: '',
          description_ar: '',
          price: '',
          pharmacy_category_id: '',
          pharmacy_id: '',
          image: null,
          discount: '',
          quantity: '',
      },
    location:null,
    gettingLocation: false,
    errorStr:null,
    place: null,
    validRule: [(v) => !!v || "Field is required"],
    }),
    computed: {
      isFormValid() {
        return (
          this.itemData.name_en && this.itemData.name_ar && this.itemData.description_en &&
          this.itemData.description_ar && this.itemData.price && this.itemData.pharmacy_category_id &&
          this.itemData.pharmacy_id &&
          this.itemData.quantity
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
          formItems.append("pharmacy_category_id", this.itemData.pharmacy_category_id);
          formItems.append("image", this.itemData.image);
          formItems.append("pharmacy_id", this.itemData.pharmacy_id);
          formItems.append("discount", this.itemData.discount);
          formItems.append("quantity", this.itemData.quantity);
        if(this.itemData.id) {
          this.updateData(formItems)
        } else {
          this.addData(formItems)
        }
      },
      async addData(formItems) {
        const data = await this.$axios.$post('vendor/pharmacy_drugs', formItems)
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
        const data = await this.$axios.$post(`vendor/pharmacy_drugs/${this.itemData.id}`, formItems)
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
      },
  }
}
</script>
