<template>
  <DialogForm
    :value="value"
    @input="(v) => $emit('input', v)"
    title="Delivery Range"
    :loading="loading"
  >
    <template v-slot:default>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="form.est_time"
            dense
            outlined
            label="Estimated time "
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="form.charges"
            dense
            outlined
            placeholder="5$"
            label="Delivery Charges"
          ></v-text-field>
        </v-col>

        <v-col cols="6">
          <v-select
            v-model="form.status"
            item-text="text"
            item-value="value"
            :items="statuses"
            dense
            outlined
            label="Order Status"
          />
        </v-col>
      </v-row>
    </template>
    <template v-slot:action>
      <v-btn color="primary" @click="submit" block rounded>Save</v-btn>
    </template>
  </DialogForm>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
    },
  },
  data: () => ({
    statuses: [
      { value: "accepted", text: "Accepted" },
      { value: "in_preparation", text: "In preparation" },
      { value: "on_the_way", text: "On The Way" },
    ],
    loading: false,
    form: {},
  }),
  methods: {
    submit() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
};
</script>
