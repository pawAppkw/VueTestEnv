<template>
  <div class="form">
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="itemData.room_number"
            dense
            outlined
            label="Room Number"
            :rules="validRule"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-select
                v-model="itemData.room_type"
                item-text="text"
                item-value="id"
                :items="roomTypes"
                dense
                outlined
                label="Room Type"
                :rules="validRule"
              ></v-select>
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
              <v-text-field
                  v-model="itemData.room_capacity"
                  dense
                  outlined
                  type="number"
                  label="Room Capacity"
                  :rules="validRule"
                ></v-text-field>
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
  props: ['itemData'],
    data: () => ({
      form: {
        room_number: '',
        room_type: '',
        description_en: '',
        description_ar: '',
        price: '',
        room_capacity: true,
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
          this.itemData.room_number && this.itemData.room_type && this.itemData.description_en &&
          this.itemData.description_ar && this.itemData.price && this.itemData.room_capacity
        );
      },
    },
    methods: {
      uploadimage (event){
        this.itemData.image = event
      },
      submit() {
        const formItems = new FormData();
          formItems.append("room_number", this.itemData.room_number);
          formItems.append("room_type", this.itemData.room_type);
          formItems.append("description_en", this.itemData.description_en);
          formItems.append("description_ar", this.itemData.description_ar);
          formItems.append("price", this.itemData.price);
          formItems.append("room_capacity", this.itemData.room_capacity);
          formItems.append("image", this.itemData.image);
        if(this.itemData.id) {
          this.updateData(formItems)
        } else {
          this.addData(formItems)
        }
      },
      async addData(formItems) {
        const data = await this.$axios.$post('vendor/hotel_rooms', formItems)
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
        const data = await this.$axios.$post(`vendor/hotel_rooms/${this.itemData.id}`, formItems)
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
