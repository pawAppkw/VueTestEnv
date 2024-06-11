<template>
  <v-container>
    <v-card class="mb-5" v-show="true"> <!-- دائماً مرئي -->
      <v-card-title class="headline">Work Info</v-card-title>
      <v-card-text>
        <v-card class="mb-12 pa-2">
          <h3 class="text-center">Kindly Fill The Forms Below</h3>
          <v-row class="pa-2">
            <v-col md="4" cols="12">
              <v-text-field v-model="form.name_en" dense outlined label="English Name Company"
                :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.name_ar" dense outlined label="Arabic Name Company" :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.vendor_phone" dense outlined label="Vendor Phone"></v-text-field>
            </v-col>
              <v-select v-model="form.vendor_types" :items="types" chips outlined dense multiple label="vendor types"
                :rules="validRule"></v-select>
              <v-row v-if="form.vendor_types.includes('groomers')">
                <v-col cols="12">
                  <div class="radio-group-question">Select Groomers Type:</div>
                  <v-checkbox label="Store" value="store" v-model="form.store_or_truck_groomers"></v-checkbox>
                  <v-checkbox label="Truck" value="truck" v-model="form.store_or_truck_groomers"></v-checkbox>
                </v-col>
              </v-row>

              <!-- Select Vets Type section -->
              <v-row v-if="form.vendor_types.includes('stores')">
                <v-col cols="12">
                  <div class="radio-group-question">Select Stores Type:</div>
                  <v-checkbox label="Store" value="store" v-model="form.store_or_truck_vets"></v-checkbox>
                  <v-checkbox label="Truck" value="truck" v-model="form.store_or_truck_vets"></v-checkbox>
                </v-col>
              </v-row>
            <v-col md="4" cols="12" v-if="form.vendor_types.includes('vets') || form.vendor_types.includes('stores') || form.vendor_types.includes('pharmacies')">
              <div>
                <p>Do you have delivery Service?</p>
                <v-radio-group v-model="form.has_delivery" row>
                  <v-radio label="No" :value="false"></v-radio>
                  <v-radio label="Yes" :value="true"></v-radio>
                </v-radio-group>
              </div>
              <div v-if="form.has_delivery == 0">
                <p>Do you want to use the pawapp service?</p>
                <div v-if="form.has_delivery === false">
                  <v-radio-group v-model="form.pawApp_delivery" row>
                    <v-radio label="No" :value="false"></v-radio>
                    <v-radio label="Yes" :value="true"></v-radio>
                  </v-radio-group>
                </div>
              </div>
            </v-col>
            <v-col md="4" cols="12">
              <v-menu ref="menu" v-model="opening_from_menu" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="form.opening_from" label="Opening From"
                    prepend-icon="mdi-clock-time-four-outline" readonly outlined dense v-bind="attrs" v-on="on"
                    :rules="validRule"></v-text-field>
                </template>
                <v-time-picker v-if="opening_from_menu" v-model="form.opening_from" full-width
                  @click:minute="$refs.menu.save(form.opening_from)"></v-time-picker>
              </v-menu>
            </v-col>
            <v-col md="4" cols="12">
              <v-menu ref="menu" v-model="opening_to_menu" :close-on-content-click="false" :nudge-right="40"
                transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="form.opening_to" label="Opening To" prepend-icon="mdi-clock-time-four-outline"
                    readonly outlined dense v-bind="attrs" v-on="on" :rules="validRule"></v-text-field>
                </template>
                <v-time-picker v-if="opening_to_menu" v-model="form.opening_to" full-width
                  @click:minute="$refs.menu.save(form.opening_to)"></v-time-picker>
              </v-menu>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.address_en" dense outlined label="English Address Company"
                :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.address_ar" dense outlined label="Arabic Address Company"
                :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
                <v-select v-model="form.area" :items="cities" label="Area" outlined dense :rules="validRule"></v-select>
            </v-col>
            <v-col md="4" cols="12" v-if="form.pawApp_delivery === true">
            <v-text-field
                  v-model="form.delivery_time"
                  label="Delivery Time"
                  suffix="Min"
                  outlined
                  dense>
              </v-text-field>
            </v-col>

            <v-col md="4" cols="12">
              <v-text-field v-model="form.address" dense outlined label="location" @click="openMap()"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
                <p>Do you have a Licence?</p>
                <v-radio-group v-model="form.has_licence" row>
                  <v-radio label="Yes" :value="true"></v-radio>
                  <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
          </v-row>
        </v-card>

        <!-- <v-btn color="primary" @click="activateNextSection(2)" v-if="showSaveAndNext.step1">
          Save & Next
        </v-btn> -->
      </v-card-text>
    </v-card>

    <v-card class="mb-5" v-show="true"> <!-- دائماً مرئي -->
      <v-card-title class="headline">Needed Documents below</v-card-title>
      <v-card-text>
        <v-card class="mb-12 pa-2">
          <v-row>
            <v-col md="4" cols="12">
              <v-file-input outlined dense label="Civil Id Front" 
                ></v-file-input>
            </v-col>
            <v-col md="4" cols="12">
              <v-file-input outlined dense label="Civil Id Back" 
                ></v-file-input>
            </v-col>
            <v-col md="4" cols="12" v-if="form.has_licence === false">
              <v-file-input outlined dense label="Bank Collection Cetificate" @change="attachBankCollection"
                ></v-file-input>
            </v-col>
            <v-col md="4" cols="12" v-if="form.has_licence === true">
              <v-file-input outlined dense label="Articles Of Association" @change="attachFrontNationalID"
                :rules="validRule"></v-file-input>
            </v-col>
            <v-col md="4" cols="12" v-if="form.has_licence === true">
              <v-file-input outlined dense label="Commercial License" @change="attachBackNationalID"
                :rules="validRule"></v-file-input>
            </v-col>
            <v-col md="4" cols="12" v-if="form.has_licence === true">
              <v-file-input outlined dense label="Signature Certification" @change="attachUserAvatar"
                :rules="validRule"></v-file-input>
            </v-col>
            <v-col md="4" cols="12" v-if="form.has_licence === true">
              <v-file-input outlined dense label="Extract Certificate" @change="attachVendorLogoo"
                :rules="validRule"></v-file-input>
            </v-col>
            <v-col md="4" cols="12" v-if="form.has_licence === true">
              <v-file-input outlined dense label="Commercial Register" @change="attachVendorLicense"
                :rules="validRule"></v-file-input>
            </v-col>
            <v-col md="4" cols="12">
              <v-file-input outlined dense label="Vendor Logos" @change="attachVendorLogo"
                :rules="validRuleLogo"></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.bank_name" dense outlined label="Bank Name" :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.bank_branch" dense outlined label="Bank Branch"
                :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.iban" dense outlined label="IBAN" :rules="validRule"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.bank_acno" dense outlined label="Bank Account Number" :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.bank_beneficiary" dense outlined label="Bank Beneficiary Name"
                :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.bank_email" dense outlined label="Bank Registration Email" :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.bank_mobile" dense outlined label="Bank Registration Mobile"
                :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.instagram" dense outlined label="Instagram" ></v-text-field>
            </v-col>
          </v-row>
        </v-card>

        <!-- <v-btn color="primary" @click="activateNextSection(3)" v-if="showSaveAndNext.step2">
          Save & Next
        </v-btn> -->

      </v-card-text>
    </v-card>
    <v-card v-show="true"> <!-- دائماً مرئي -->
      <v-card-title class="headline">Account Infos</v-card-title>
      <v-card-text>
        <v-card class="mb-12 pa-2">
          <v-row>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.name" dense outlined label="Name the Person " :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.calling_code" dense outlined label="National phone code"
                :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.phone" dense outlined label="phone" :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.email" dense type="email" outlined label="Email"
                :rules="validRule"></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-text-field v-model="form.password" dense type="password" outlined label="Password"
                :rules="validRule"></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-btn color="primary" @click="signUp" :disabled="!canProceedToSignUp">
          Sign Up
        </v-btn>
       
      </v-card-text>
    </v-card>
    <v-dialog max-width="1500" height="800" v-model="mapDialog">
      <v-card>
        <div class="locations">
          <div>
            <div class="map-header">
              <label class="label-auto">
                <GmapAutocomplete :position.sync="markers[0].position" @keyup.enter="usePlace" @place_changed="setPlace"
                  :options="{
                fields: [
                  'geometry',
                  'formatted_address',
                  'address_components',
                ],
              }">
                </GmapAutocomplete>
              </label>
            </div>
            <br />
            <gmap-map :center="center" :zoom="10" map-type-id="terrain" style="width: 100%; height: 250px">
              <gmap-marker @dragend="updateMaker" :key="index" v-for="(m, index) in markers" :position="m.position"
                :clickable="true" :draggable="true" @click="center = m.position"></gmap-marker>
            </gmap-map>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
export default {
  layout: "empty",
  middleware: 'unauthenticated',
  data: () => ({
    types: ["stores", "hotels", "vets", "groomers", "pharmacies"],
    cities:["Ahmadi", 'Frawaniya' , 'Jahra' , 'Hawalli' , 'Mubarak Al-Kabeer' ,' Al Aasima'],
    selectedCity: '',
    opening_from_menu: false,
    opening_to_menu: false,
    mapDialog: false,
    step: 1,
    activeStep: 1,
    isSaveAndNextDisabled: false,
    isSignUpDisabled: false,
    showSaveNextButton: true,

    showSaveAndNext: {
      step1: true,
      step2: true,
    },
    validRuleLogo: [ (v) => !!v || "Field is required",
    (v) => {
      if (!v) return true; // If no file is selected, consider it valid
      const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedFormats.includes(v.type)) {
        return 'Allowed file formats: PNG, JPG, JPEG';
      }
        return true;
    }],
    validRule: [(v) => !!v || "Field is required"],
    validRuleStepOne: [(v) => !!v || "Field is required"],
    validRuleStepTwo: [(v) => !!v || "Field is required"],
    validRuleStepThree: [(v) => !!v || "Field is required"],
    markers: [
      {
        position: {
          lat: 29.3895267,
          lng: 47.758407
        },
      },
    ],
    center: { lat: 29.3895267, lng: 47.758407 },
    form: {
      name_en: "",
      name_ar: '',
      address_en: '',
      address_ar: '',
      latitude: '',
      longitude: '',
      vendor_phone: '',
      area: '',
      opening_from: '09:00',
      opening_to: '15:00',
      delivery_time: '',
      bank_name: '',
      bank_branch: '',
      iban: '',
      name: '',
      password: '',
      email: '',
      address: '',
      calling_code: '',
      phone: '',
      front_national_id: null,
      back_national_id: null,
      user_avatar: null,
      vendor_logo: null,
      vendor_license: null,
      vendor_logoo: null,
      vendor_types: '',
      is_store: null,
      is_store_groomers: null,
      is_store_vets: null,

      has_delivery: null,
      pawApp_delivery: null,
      store_or_truck_groomers: [],
      store_or_truck_vets: [],


    },
  }),
  computed: {
    isStepOneValid() {
      return (
        this.form.name_en && this.form.name_ar && this.form.vendor_phone &&
        this.form.vendor_types && this.form.opening_from && this.form.opening_to &&
        this.form.address_en && this.form.address_ar && this.form.area &&
        this.form.delivery_time
      );
    },
    isStepTwoValid() {
      return (
        this.form.front_national_id && this.form.back_national_id && this.form.user_avatar &&
        this.form.vendor_logo && this.form.vendor_license && this.form.vendor_logoo &&
        this.form.bank_name && this.form.bank_branch && this.form.iban
      );
    },
    isStepThreeValid() {
      return (
        this.form.phone && this.form.name && this.form.email &&
        this.form.password && this.form.calling_code
      );
    },
    isFormValid() {
      // Here you can check the validity for all fields
      // and return true if all required fields are filled out
      switch (this.activeStep) {
        case 1:
          return this.isStepOneValid;
        case 2:
          return this.isStepTwoValid;
        case 3:
          return this.isStepThreeValid;
        default:
          return false;
      }
    },
    isDeliveryTimeDisabled() {
      // The field is disabled if the user answers 'No' to both questions
      return this.form.has_delivery === false && this.form.pawApp_delivery === false;
    },
    canProceedToSignUp() {
      // Check if all steps are valid before enabling the sign-up button
      return this.isStepOneValid && this.isStepTwoValid && this.isStepThreeValid;
    },
  }, 
  methods: {
    attachFrontNationalID(event) {
      this.form.front_national_id = event
    },
    attachBackNationalID(event) {
      this.form.back_national_id = event
    },
    attachUserAvatar(event) {
      this.form.user_avatar = event
    },
    attachVendorLogo(event) {
      this.form.vendor_logo = event
    },
    attachVendorLicense(event) {
      this.form.vendor_license = event
    },
    attachVendorLogoo(event) {
      this.form.vendor_logoo = event
    },
    attachBankCollection(event) {
      this.form.bank_collection = event
    },
    submit(step) {
      if (step === 1 && this.form.vendor_types.length == 0) {
        this.$toast.error('Please select vendor type', { icon: 'mdi-alert-circle' })
      } else if (step === 1 && (this.form.vendor_types.includes('vets') || this.form.vendor_types.includes('stores')) && this.form.has_delivery == null) {
        this.$toast.error('Please answer on "Do you have delivery Service?"', { icon: 'mdi-alert-circle' })
      } else if (step === 1 && (this.form.vendor_types.includes('vets') || this.form.vendor_types.includes('stores')) && this.form.has_delivery == 0 && this.form.pawApp_delivery == null) {
        this.$toast.error('Please answer on "Do you want to use the pawapp service?"', { icon: 'mdi-alert-circle' })
      }

      if (step === 1 && this.form.vendor_types.length == 0) {
        this.$toast.error('Please select vendor type', { icon: 'mdi-alert-circle' })
      } else if (step === 1 && (this.form.vendor_types.includes('vets') || this.form.vendor_types.includes('pharmacies')) && this.form.has_delivery == null) {
        this.$toast.error('Please answer on "Do you have delivery Service?"', { icon: 'mdi-alert-circle' })
      } else if (step === 1 && (this.form.vendor_types.includes('vets') || this.form.vendor_types.includes('pharmacies')) && this.form.has_delivery == 0 && this.form.pawApp_delivery == null) {
        this.$toast.error('Please answer on "Do you want to use the pawapp service?"', { icon: 'mdi-alert-circle' })
      }

      // Example validation for groomers
      if (step === 1 && this.form.vendor_types.includes('groomers') && this.form.is_store_groomers === null) {
        this.$toast.error('Please select Store or Truck for Groomers', { icon: 'mdi-alert-circle' });
        return;
      }
      if (step === 1 && this.form.vendor_types.includes('groomers') && this.form.store_or_truck_groomers.length === 0) {
        this.$toast.error('Please select at least one option for Groomers', { icon: 'mdi-alert-circle' });
        return;
      }

      // Validate selection for vets
      if (step === 1 && this.form.vendor_types.includes('vets') && this.form.store_or_truck_vets.length === 0) {
        this.$toast.error('Please select at least one option for Vets', { icon: 'mdi-alert-circle' });
        return;
      }


    },
    activateNextSection(stepNumber) {
      // Check if the form for the current step is valid
      if (this.isFormValid) {
        // If valid, update the activeStep to the next step
        this.activeStep = stepNumber;
        // Hide the 'Save & Next' button for the current section
        if (stepNumber === 2) {
          this.showSaveAndNext.step1 = false;
        } else if (stepNumber === 3) {
          this.showSaveAndNext.step2 = false;
        }
      } else {
        // If the form is not valid, show an error message
        this.$toast.error('Please fill all required fields.', { icon: 'mdi-alert-circle' });
      }
    },

    async signUp() {
      if (this.isStepThreeValid) {
        // Your existing sign-up logic     
        const formItems = new FormData();
        formItems.append("name_en", this.form.name_en);
        formItems.append("name_ar", this.form.name_ar);
        formItems.append("address_en", this.form.address_en);
        formItems.append("address_ar", this.form.address_ar);
        formItems.append("latitude", this.form.latitude);
        formItems.append("longitude", this.form.longitude);
        formItems.append("vendor_phone", this.form.vendor_phone);
        formItems.append("area", this.form.area);
        formItems.append("opening_from", this.form.opening_from);
        formItems.append("opening_to", this.form.opening_to);
        formItems.append("bank_name", this.form.bank_name);
        formItems.append("delivery_time", this.form.delivery_time);
        formItems.append("bank_branch", this.form.bank_branch);
        formItems.append("iban", this.form.iban);
        formItems.append("name", this.form.name);
        formItems.append("password", this.form.password);
        formItems.append("email", this.form.email);
        formItems.append("address", this.form.address);
        formItems.append("calling_code", this.form.calling_code);
        formItems.append("phone", this.form.phone);
        formItems.append("front_national_id", this.form.front_national_id);
        formItems.append("back_national_id", this.form.back_national_id);
        formItems.append("user_avatar", this.form.user_avatar);
        formItems.append("vendor_logo", this.form.vendor_logo);
        formItems.append("vendor_license", this.form.vendor_license);
        formItems.append("vendor_logoo", this.form.vendor_logoo);
        //formItems.append("is_store", this.form.is_store);
        this.form.store_or_truck_groomers.forEach((item, index) => {
          formItems.append(`store_or_truck_groomers[${index}]`, item);
        });
        this.form.store_or_truck_vets.forEach((item, index) => {
          formItems.append(`store_or_truck_vets[${index}]`, item);
        });
        formItems.append("has_delivery", this.form.has_delivery);
        formItems.append("pawApp_delivery", this.form.pawApp_delivery);
        this.form.vendor_types.forEach((item, i) => {
          formItems.append(`vendor_types[${i}]`, item);
        })
        const data = await this.$axios.$post('/vendor/create', formItems)
        if (data.success === true) {
          localStorage.setItem('phone', this.form.phone)
          this.submit(3)
          this.$router.push('/auth/verify-phone')
        }
      }

    },
    
    goTo(step) {
      if (step < this.step) {
        this.step = step
      }
    },
    openMap() {
      this.mapDialog = true
    },
    async getLocation() {
      return new Promise((resolve, reject) => {

        if (!("geolocation" in navigator)) {
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
      } catch (e) {
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
    updateMyMaker(event) {
      this.markers[0].position = {
        lat: event.latitude,
        lng: event.longitude,
      };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latLng: this.markers[0].position }, (result, status) => {

        this.form.address = result[0].formatted_address;
        if (status === google.maps.GeocoderStatus.OK) {
          this.$refs.gmapAutocomplete.$refs.input.value =
            result[0].formatted_address;
        }
      });
    },
    updateMaker(event) {
      this.form.latitude = event.latLng.lat()
      this.form.longitude = event.latLng.lng()
      this.markers[0].position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latLng: event.latLng }, (result, status) => {
        this.form.address = result[0].formatted_address;
        if (status === google.maps.GeocoderStatus.OK) {
          this.$refs.gmapAutocomplete.$refs.input.value =
            result[0].formatted_address;
        }
      });
    },
  },

  watch: {
    activeStep(newVal, oldVal) {
      // Whenever activeStep changes, decide if you need to show the button
      if (newVal > oldVal) {
        // We've moved to a new section, hide the save & next button
        this.showSaveNextButton = false;
      } else if (newVal < oldVal) {
        // We've moved back, show the save & next button
        this.showSaveNextButton = true;
      }
    },
    // Watch your form fields that are required for enabling the Save & Next button
    // 'form.name_en': function(newVal) {
    //   this.checkFormValidity();
    // },
    // 'form.name_ar': function(newVal) {
    //   this.checkFormValidity();
    // },
    // Add all other required fields similarly
  }
};
</script>
<style lang="scss">
.v-stepper__header {
  width: 50%;
  height: 72px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-shadow: unset !important;

  .v-stepper__step {
    display: block;
    margin: auto;
    text-align: center;
  }

  .v-stepper__step--active {
    .v-stepper__step__step {
      border: 3px solid #33333385;
    }
  }
}

.radio-group-question {
  margin-bottom: 8px;
  /* Spacing between question and options */
  font-size: 1rem;
  /* Match font size as in the image */
  font-weight: normal;
  /* Adjust weight as necessary */
  color: #000;
  /* Adjust color as necessary */
  /* Include any other styles such as font-family to match the uploaded image */
}

.label-auto {
  input {
    padding: 10px;
    margin: 10px 40%;
    border: 1px solid #333;
    border-radius: 10px;
  }

}
</style>
