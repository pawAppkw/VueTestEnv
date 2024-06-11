<template>
  <div class="form">
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="itemData.name_en"
            dense
            outlined
            label="Promotion EN Name"
            :rules="validRule"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="itemData.name_ar"
            dense
            outlined
            label="Promotion AR Name"
            :rules="validRule"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="itemData.code"
            dense
            outlined
            label="Promotion Code"
            :rules="validRule"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <h3>Select Price Type</h3>
          <v-radio-group v-model="itemData.discount_type">
            <v-row>
              <v-col cols="6"><v-radio :value="1" label="fixed Amount" :rules="validRule"/></v-col>
              <v-col cols="6"
                ><v-text-field
                v-if="itemData.discount_type == 1"
                  outlined
                  hide-details
                  dense
                  v-model="itemData.discount"
                  suffix="KWD"
                  :rules="validRule"
              /></v-col>
              <v-col cols="6">
                <v-radio :value="2" label="Percentage" :rules="validRule"/>
              </v-col>
              <v-col cols="6"
                ><v-text-field
                  v-if="itemData.discount_type == 2"
                  outlined
                  hide-details
                  dense
                  v-model="itemData.discount"
                  append-icon="mdi-percent-outline"
                  :rules="validRule"
              /></v-col>
            </v-row>
          </v-radio-group>
        </v-col>
        <v-col cols="6">
          <h3>Select Status</h3>
          <v-radio-group v-model="itemData.is_active" :rules="validRule">
            <v-radio :value="1" label="Active" />
            <v-radio :value="2" label="InActive" />
          </v-radio-group>
        </v-col>
        <v-col cols="6">
          <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
            v-model="itemData.start_date"
              label="dd/mm/yyyy"
              prepend-icon="mdi-calendar"
              readonly
              outlined
              dense
              v-bind="attrs"
              v-on="on"
              :rules="validRule"
            ></v-text-field>
          </template>
          <v-date-picker
          v-model="itemData.start_date"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
          <!-- <v-text-field
            outlined
            placeholder="dd/mm/yyyy"
            dense
            v-model="itemData.start_date"
            v-mask="['##/##/####']"
            :rules="validRule"
          /> -->
        </v-col>
        <v-col cols="6">
          <v-menu
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
            v-model="itemData.end_date"
              label="dd/mm/yyyy"
              prepend-icon="mdi-calendar"
              readonly
              outlined
              dense
              v-bind="attrs"
              v-on="on"
              :rules="validRule"
            ></v-text-field>
          </template>
          <v-date-picker
          v-model="itemData.end_date"
            @input="menu3 = false"
          ></v-date-picker>
        </v-menu>
          <!-- <v-text-field
            outlined
            dense
            placeholder="dd/mm/yyyy"
            v-model="itemData.end_date"
            v-mask="['##/##/####']"
            :rules="validRule"
          /> -->
        </v-col>
      </v-row>
      <v-btn :disabled="!isFormValid" color="primary" @click="submit" block rounded>Save</v-btn>
  </div>
</template>
<script>
export default {
  props: ['itemData'],
    data: () => ({
      menu2: false,
      menu3: false,
      form: {
        name_en: '',
        name_ar: '',
        code: '',
        discount_type: '',
        discount: '',
        is_active: '',
        start_date: '',
        end_date: ''
      },
      validRule: [(v) => !!v || "Field is required"],
    }),
    computed: {
      isFormValid() {
      return (
        this.itemData.name_en && this.itemData.name_ar && this.itemData.code
        && this.itemData.discount_type && this.itemData.discount && this.itemData.is_active &&
        this.itemData.start_date && this.itemData.end_date
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
        const data = await this.$axios.$post('vendor/promo_codes', this.itemData)
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
        const data = await this.$axios.$post(`vendor/promo_codes/${this.itemData.id}`, this.itemData)
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
};
</script>
