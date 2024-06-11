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

        <v-col>
        <v-text-field
            v-model="itemData.ingredients_en"
            dense
            outlined
            label="En ingredients"
            :rules="validRule"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="itemData.ingredients_ar"
            dense
            outlined
            label="Ar ingredients"
            :rules="validRule"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-textarea
              v-model="itemData.description_en"
              label="Description_en"
              dense
              outlined
              placeholder="
              Brand:  Alpha
              Type: Dry Food
              Flavor:  Chicken
              Weight: 20kg
              Made in Kuwait
              "
              :rules="validRule"
            ></v-textarea>
          </v-col>

          <v-col cols="6">
            <v-textarea
              v-model="itemData.description_ar"
              label="Description_ar"
              dense
              outlined
              placeholder="
              العلامة التجارية: ألفا
              النوع: طعام جاف للكبار
              النكهة: دجاج
              الوزن: 20 كجم
              صنع فى الكويت
              "
              :rules="validRule"
            ></v-textarea>
          </v-col>
          <v-col>
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
              <v-text-field
                v-model="itemData.amount"
                dense
                type="number"
                outlined
                label="Quantity"
                :rules="validRule"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="itemData.discount"
                dense
                type="number"
                outlined
                label="discount"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="itemData.category_id"
                item-text="name"
                item-value="id"
                :items="categories"
                dense
                outlined
                label="category"
                :rules="validRule"
              ></v-select>
            </v-col>
            <v-col cols>
              <v-file-input
                prepend-icon="mdi-camera"
                chips
                accept="image/*"
                label="product image"
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
  props: ['itemData', 'categories'],
    data: () => ({
      form: {
        name_en: '',
          name_ar: '',
          ingredients_en: '',
          ingredients_ar: '',
          description_en: '',
          description_ar: '',
          category_id: '',
          price: '',
          amount: '',
          discount: '',
          image: null,
      },
      validRule: [(v) => !!v || "Field is required"],
    }),
    computed: {
      isFormValid() {
        return (
          this.itemData.name_en && this.itemData.name_ar && this.itemData.description_en &&
          this.itemData.description_ar && this.itemData.price && this.itemData.ingredients_en &&
          this.itemData.ingredients_ar &&
          this.itemData.category_id && this.itemData.amount
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
          formItems.append("ingredients_en", this.itemData.ingredients_en);
          formItems.append("ingredients_ar", this.itemData.ingredients_ar);
          formItems.append("description_en", this.itemData.description_en);
          formItems.append("description_ar", this.itemData.description_ar);
          formItems.append("category_id", this.itemData.category_id);
          formItems.append("price", this.itemData.price);
          formItems.append("amount", this.itemData.amount);
          formItems.append("discount", this.itemData.discount);
          formItems.append("image", this.itemData.image);
        if(this.itemData.id) {
          this.updateData(formItems)
        } else {
          this.addData(formItems)
        }
      },
      async addData(formItems) {
        const data = await this.$axios.$post('vendor/products', formItems)
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
        const data = await this.$axios.$post(`vendor/products/${this.itemData.id}`, formItems)
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
