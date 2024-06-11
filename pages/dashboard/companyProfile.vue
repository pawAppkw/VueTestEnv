<template>
  <div class="userProfile">
    <v-container>
      <v-row v-if="info.email && info.company">
        <v-col cols="12">
          <v-avatar size="128">
            <img
              :src="info.company.logo"
              alt="User"
            >
          </v-avatar>
        </v-col>
        <v-col md="6" cols="12">
          <p><b>Name:</b> {{ info.company.name }}</p>
        </v-col>
        <v-col md="6" cols="12" v-if="permissions.includes('manage_hotel')">
          <p><b>address:</b> {{ info.company.address }}</p>
        </v-col>
        <v-col md="6" cols="12">
          <p><b>Bank name:</b> {{ info.company.bank_name }}</p>
        </v-col>
        <v-col md="6" cols="12">
          <p><b>Bank branch:</b> {{ info.company.bank_branch }}</p>
        </v-col>
        <v-col md="6" cols="12">
          <p><b>IBAN:</b> {{ info.company.iban }}</p>
        </v-col>
        <v-col md="6" cols="12" v-if="info.stores && info.stores.length >= 1">
          <p><b>Delivery Fees:</b> {{ info.stores[0].delivery_fees }}</p>
        </v-col>
        <v-col md="6" cols="12" v-if="info.stores && info.stores.length >= 1">
          <p><b>Delivery Time:</b> {{ info.stores[0].delivery_time }} Min</p>
        </v-col>
        <v-col cols="12">
        <hr />
        </v-col>
        <v-col cols="12" v-if="permissions.includes('manage_hotel')">
          <h2>Hotel Data</h2>
        </v-col>
        <v-col cols="12" v-if="permissions.includes('manage_hotel')">
          <v-row v-for="hotel in info.hotels" :key="hotel.id">
            <v-col md="6" cols="12">
            <p><b>description:</b> {{ hotel.description }}</p>
            </v-col>
            <v-col md="6" cols="12">
              <p><b>address:</b> {{ hotel.address }}</p>
            </v-col>
            <v-col md="6" cols="12">
              <p><b>check in:</b> {{ hotel.check_in_format }}</p>
            </v-col>
            <v-col md="6" cols="12">
              <p><b>check out:</b> {{ hotel.check_out_format }}</p>
            </v-col>
            <v-col cols="12">
              <v-row>
              <!-- <div class="image-container" > -->
                  <v-col md="4" v-for="image in hotel.hotel_images" :key="image.id" class="p-relative">
                    <img class="hotel-image" :src="image.original_url" alt="hotel image">
                    <v-btn icon outlined color="red" class="delete-btn" @click="confirmDelete(image)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
              <!-- </div> -->
            </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-btn class="primary text-color" outlined @click="openEditDialog()">
            Edit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      max-width="900"
    >
      <v-card>
        <v-card-title class="text-h5 secandery">
          Company Data
        </v-card-title>

        <v-card-text class="mt-3">
          <v-row>
            <v-col md="6" cols="12">
              <v-text-field
                v-model="userData.name_en"
                label="En Name"
                placeholder="En Name"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12">
              <v-text-field
                v-model="userData.name_ar"
                label="Ar name"
                placeholder="Ar name"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12">
              <v-text-field
              v-model="userData.address_en"
              label="address en"
              placeholder="address en"
              outlined
              dense
            ></v-text-field>
            </v-col>
            <v-col md="6" cols="12">
              <v-text-field
              v-model="userData.address_ar"
              label="address ar"
              placeholder="address ar"
              outlined
              dense
            ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" v-if="info.stores && info.stores.length >= 1">
              <v-text-field
              v-model="userData.delivery_fees"
              label="Delivery Fees"
              placeholder="Delivery Fees"
              outlined
              dense
              type="number"
            ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" v-if="info.stores && info.stores.length >= 1">
              <v-text-field
              v-model="userData.delivery_time"
              label="Delivery Time"
              placeholder="Delivery Time"
              outlined
              dense
              type="number"
            ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
              label="Logo"
              outlined
              dense
              @change="fileAtteched"
            ></v-file-input>
            </v-col>
            <v-col cols="12" v-if="permissions.includes('manage_hotel')">
              <h2>hotels Data</h2>
            </v-col>
            <v-col cols="12" v-if="permissions.includes('manage_hotel')">
              <v-file-input
              label="hotel images"
              persistent-hint
              hint="375 x 296"
              outlined
              multiple
              dense
              @change="imagesAtteched"
            ></v-file-input>
            </v-col>
            <v-col md="6" cols="12" v-if="permissions.includes('manage_hotel')">
              <v-textarea
                v-model="userData.description_en"
                label="EN Description"
                placeholder="EN Description"
                outlined
                dense
              ></v-textarea>
            </v-col>
            <v-col md="6" cols="12" v-if="permissions.includes('manage_hotel')">
              <v-textarea
                v-model="userData.description_ar"
                label="AR Description"
                placeholder="AR Description"
                outlined
                dense
              ></v-textarea>
            </v-col>
            <v-col md="6" cols="12" v-if="permissions.includes('manage_hotel')">
              <v-text-field
                v-model="userData.check_in"
                label="check in"
                placeholder="check in"
                outlined
                type="number"
                dense
                persistent-hint
                hint="time format 24 hours"
                min="0"
                max="23"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" v-if="permissions.includes('manage_hotel')">
              <v-text-field
                v-model="userData.check_out"
                label="check out"
                placeholder="check out"
                outlined
                type="number"
                dense
                persistent-hint
                hint="time format 24 hours"
                min="1"
                max="23"
              ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" v-if="permissions.includes('manage_hotel')">
              <v-text-field
              v-model="userData.hotel_address_en"
              label="Hotel address en"
              placeholder="Hotel address en"
              outlined
              dense
            ></v-text-field>
            </v-col>
            <v-col md="6" cols="12" v-if="permissions.includes('manage_hotel')">
              <v-text-field
              v-model="userData.hotel_address_ar"
              label="Hotel address ar"
              placeholder="Hotel address ar"
              outlined
              dense
            ></v-text-field>
            </v-col>
            <v-col cols="12" v-if="permissions.includes('manage_hotel')">
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
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="updateInfo()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
    v-model="deleteDialog"
    max-width="600"
  >
    <v-card>
      <v-card-title class="text-h5 secandery">
        Delete confirmation
      </v-card-title>

      <v-card-text class="mt-3">
        Are You sure to delete this image?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          @click="deleteDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="deleteImage()"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      deleteDialog: false,
      info: {},
      userData: {
        name_en: '',
        name_ar: '',
        vendor_logo: '',
        hotel_images: [],
        check_in: '',
        check_out: '',
        description_en: '',
        description_ar: '',
        latitude: null,
        longitude: null,
        hotel_address_en: '',
        hotel_address_ar: '',
        address_en: '',
        address_ar: '',
        delivery_fees:'',
        delivery_time: ''
      },
      dialog: false,
      markers: [
      {
        position: {
          lat: 29.3895267,
          lng: 47.758407
        },
      },
    ],
    center: { lat: 29.3895267, lng: 47.758407 },
    imageData: {},
    permissions: []
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    if(localStorage.getItem('userData')) {
      JSON.parse(localStorage.getItem('userData')).roles[0].permissions.forEach(item => {
        this.permissions.push(item.name)
      })
    }
  },
  methods: {
    confirmDelete(image) {
      this.imageData = image
      this.deleteDialog = true
    },
    async deleteImage() {
      const delete_image = await this.$axios.$delete(`/vendor/delete-hotel-image/${this.imageData.id}`)
      console.log('delete_image', delete_image)
      if(delete_image.success === true) {
        this.imageData= {},
        this.deleteDialog = false
        this.getData()
      }
    },
    async  getData () {
      const info = await this.$axios.$get('/vendor/get-info')
      this.info = info.admin
    },
    fileAtteched (event) {
      this.userData.vendor_logo = event
    },
    imagesAtteched (event) {
      event.forEach(item => {
        this.userData.hotel_images.push(item)
      });
    },
    async updateInfo () {
      const formItems = new FormData();
          formItems.append("name_en", this.userData.name_en);
          formItems.append("name_ar", this.userData.name_ar);
          formItems.append("vendor_logo", this.userData.vendor_logo);
          if(this.userData.hotel_images.length >0 ) {
            this.userData.hotel_images.forEach(item => {
              formItems.append("hotel_images[]", item);
            })
          }
          formItems.append("check_in", this.userData.check_in);
          formItems.append("check_out", this.userData.check_out);
          formItems.append("description_en", this.userData.description_en);
          formItems.append("description_ar", this.userData.description_ar);
          formItems.append("latitude", this.userData.latitude);
          formItems.append("longitude", this.userData.longitude);
          formItems.append("hotel_address_en", this.userData.hotel_address_en);
          formItems.append("hotel_address_ar", this.userData.hotel_address_ar);
          formItems.append("address_en", this.userData.address_en);
          formItems.append("address_ar", this.userData.address_ar);
          formItems.append("delivery_fees", +this.userData.delivery_fees);
          formItems.append("delivery_time", +this.userData.delivery_time);

          const data = await this.$axios.$post('vendor/edit-company', formItems)
          console.log('data', data)
          if(data.success === true){
            this.getData()
            this.dialog = false
          }
    },
    openEditDialog() {
      this.userData.name_en = this.info.company.name_en
      this.userData.name_ar = this.info.company.name_ar
      this.userData.check_in = this.info.hotels[0] ? this.info.hotels[0].check_in : null
      this.userData.check_out = this.info.hotels[0] ? this.info.hotels[0].check_out : null
      this.userData.description_en = this.info.hotels[0] ? this.info.hotels[0].description_en : null
      this.userData.description_ar = this.info.hotels[0] ? this.info.hotels[0].description_ar : null
      this.userData.hotel_address_en = this.info.hotels[0] ? his.info.hotels[0].address_en : null
      this.userData.hotel_address_ar = this.info.hotels[0] ? this.info.hotels[0].address_ar : null
      this.userData.address_en = this.info.company.address_en
      this.userData.address_ar = this.info.company.address_ar
      this.userData.latitude = this.info.hotels[0] ? this.info.hotels[0].latitude : null
      this.userData.longitude = this.info.hotels[0] ? this.info.hotels[0].longitude : null
      this.userData.delivery_fees = this.info.stores[0] ? this.info.stores[0].delivery_fees : null
      this.userData.delivery_time = this.info.stores[0] ? this.info.stores[0].delivery_time : null
      this.markers[0].position.lat = this.info.hotels[0] ?  +this.info.hotels[0].latitude : null
      this.markers[0].position.lng = this.info.hotels[0] ?  +this.info.hotels[0].longitude : null
      this.center.lat = this.info.hotels[0] ? +this.info.hotels[0].latitude : null
      this.center.lng = this.info.hotels[0] ?  +this.info.hotels[0].longitude : null
      this.dialog = true
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

      this.userData.latitude = this.location.coords.latitude
      this.userData.longitude = this.location.coords.longitude
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
      this.userData.latitude = newPostion.lat
      this.userData.longitude = newPostion.lng
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

      // this.userData.address = result[0].formatted_address;
      if (status === google.maps.GeocoderStatus.OK) {
        this.$refs.gmapAutocomplete.$refs.input.value =
          result[0].formatted_address;
      }
    });
    },
    updateMaker (event) {
      this.userData.latitude = event.latLng.lat()
      this.userData.longitude = event.latLng.lng()
      this.markers[0].position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: event.latLng }, (result, status) => {
      // this.form.address = result[0].formatted_address;
      if (status === google.maps.GeocoderStatus.OK) {
        this.$refs.gmapAutocomplete.$refs.input.value =
          result[0].formatted_address;
      }
    });
    },
  }
}
</script>
<style lang="scss">
.text-color{
  .v-btn__content{
    color: #fff;
  }
}
.hotel-image{
  width: 100%;
}
.p-relative{
  position: relative;
}
.delete-btn{
  position: absolute !important;
  top: 15px !important;
  right: 15px !important;
}
</style>
