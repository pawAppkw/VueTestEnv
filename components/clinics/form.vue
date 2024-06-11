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
              v-model="itemData.address_en"
              dense
              outlined
              label="En Address"
              :rules="validRule"
            ></v-textarea>
          </v-col>

          <v-col cols="6">
            <v-textarea
              v-model="itemData.address_ar"
              dense
              outlined
              label="Ar Address"
              :rules="validRule"
            ></v-textarea>
          </v-col>
          <v-col cols="6">
              <v-text-field
                  v-model="itemData.open_from"
                  label="Open From"
                  prepend-icon="mdi-clock-time-four-outline"
                  outlined
                  dense
                  type="number"
                  max="23"
                  min="0"
                  :rules="validRule"
                  persistent-hint
                  hint="time format 24 hours"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                  v-model="itemData.open_to"
                  label="Opening To"
                  prepend-icon="mdi-clock-time-four-outline"
                  outlined
                  dense
                  type="number"
                  max="23"
                  min="0"
                  persistent-hint
                  hint="time format 24 hours"
                  :rules="validRule"
                ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-switch
                      v-model="itemData.has_emergency"
                      label="Have Emergency"
                    ></v-switch>
                </v-col>
                <v-col md="6" v-if="itemData.has_emergency">
                  <v-text-field
                  v-model="itemData.emergency_from"
                  label="Emergency From"
                  prepend-icon="mdi-clock-time-four-outline"
                  outlined
                  dense
                  type="number"
                  max="23"
                  min="0"
                  persistent-hint
                  hint="time format 24 hours"
                ></v-text-field>
                </v-col>
                <v-col md="6" v-if="itemData.has_emergency">
                  <v-text-field
                  v-model="itemData.emergency_to"
                  label="Emergency To"
                  prepend-icon="mdi-clock-time-four-outline"
                  outlined
                  dense
                  type="number"
                  max="23"
                  min="0"
                  persistent-hint
                  hint="time format 24 hours"
                ></v-text-field>
                </v-col>
                  <v-col cols="12">
                    <div class="locations">
                      <div>
                        <div class="map-header">
                          <label class="label-auto">
                            <GmapAutocomplete
                              :position.sync="markers[0].position"
                              @keyup.enter="usePlace"
                              @place_changed="setPlace"
                              :options="{
                                fields: [
                                  'geometry',
                                  'formatted_address',
                                  'address_components',
                                ],
                              }"
                            >
                            </GmapAutocomplete>
                          </label>
                        </div>
                        <br />
                        <gmap-map
                          :center="center"
                          :zoom="10"
                          map-type-id="terrain"
                          style="width: 100%; height: 250px"
                        >
                          <gmap-marker
                            @dragend="updateMaker"
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            @click="center = m.position"
                          ></gmap-marker>
                        </gmap-map>
                      </div>
                    </div>
                  </v-col>
              <v-col cols="12">
                <v-file-input
                  prepend-icon="mdi-camera"
                  chips
                  accept="image/*"
                  label="Clinc Logo"
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
  props: ['itemData'],
    data: () => ({
      opening_from_menu: false,
      opening_to_menu: false,
      form: {
        name_en: '',
          name_ar: '',
          address_en: '',
          address_ar: '',
          latitude: '',
          longitude: '',
          image: null,
          open_from: '',
          open_to: '',
      },
      validRule: [(v) => !!v || "Field is required"],
    location:null,
    gettingLocation: false,
    errorStr:null,
    place: null,
    }),
    computed: {
      isFormValid() {
      return (
        this.itemData.name_en && this.itemData.name_ar && this.itemData.address_en
        && this.itemData.address_ar && this.markers[0].position.lat && this.markers[0].position.lng
        && this.itemData.open_from && this.itemData.open_to
      );
    },
      markers() {
        if (this.itemData.latitude && this.itemData.longitude) {
          return [{position: { lat: +this.itemData.latitude, lng: +this.itemData.longitude },},]
        } else {
          return [{position: { lat: 29.3895267, lng: 47.758407 },},]
        }
      },
      center() {
        if (this.itemData.latitude && this.itemData.longitude) {
          return { lat: +this.itemData.latitude, lng: +this.itemData.longitude }
        } else {
          return { lat: 29.3895267, lng: 47.758407 }
        }
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
          formItems.append("address_en", this.itemData.address_en);
          formItems.append("address_ar", this.itemData.address_ar);
          formItems.append("latitude", this.markers[0].position.lat);
          formItems.append("longitude", this.markers[0].position.lng);
          formItems.append("image", this.itemData.image);
          formItems.append("open_from", this.itemData.open_from);
          formItems.append("open_to", this.itemData.open_to);
          formItems.append("has_emergency", this.itemData.has_emergency ? 1 : 0);
          formItems.append("emergency_from", this.itemData.emergency_from);
          formItems.append("emergency_to", this.itemData.emergency_to);
        if(this.itemData.id) {
          this.updateData(formItems)
        } else {
          this.addData(formItems)
        }
      },
      async addData(formItems) {
        const data = await this.$axios.$post('vendor/clinics', formItems)
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
        const data = await this.$axios.$post(`vendor/clinics/${this.itemData.id}`, formItems)
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
    async getLocation() {

      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
          this.updateMyMaker(pos.coords)
        }, err => {
          reject(err);
        });

      });
    },
    async locateMe() {

      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
        this.center.lat = this.location.coords.latitude
        this.center.lng = this.location.coords.longitude

        this.markers[0].position.lat = this.location.coords.latitude
        this.markers[0].position.lng = this.location.coords.longitude

        this.form.latitude = this.location.coords.latitude
        this.form.longitude = this.location.coords.longitude
      } catch(e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }

    },
    setPlace(place) {
      this.place = place;
    },

    usePlace(place) {
      if (this.place) {
        var newPostion = {
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        };
        this.center = newPostion;
        this.markers[0].position = newPostion;
        this.form.latitude = newPostion.lat
        this.form.longitude = newPostion.lng
        this.place = null;
      }
    },

    updateMyMaker (event) {
      this.markers[0].position = {
        lat: event.latitude,
        lng: event.longitude,
      };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latLng: this.markers[0].position }, (result, status) => {

        this.shoppingTo.location.address = result[0].formatted_address;
        if (status === google.maps.GeocoderStatus.OK) {
          this.$refs.gmapAutocomplete.$refs.input.value =
            result[0].formatted_address;
        }
      });
    },
    updateMaker (event) {
      this.markers[0].position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latLng: event.latLng }, (result, status) => {

        this.shoppingTo.location.address = result[0].formatted_address;
        if (status === google.maps.GeocoderStatus.OK) {
          this.$refs.gmapAutocomplete.$refs.input.value =
            result[0].formatted_address;
        }
      });
    },
  }
}
</script>
