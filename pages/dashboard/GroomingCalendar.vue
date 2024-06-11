<!--<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="headline">Yalla Pets Care</v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-toolbar-title class="subheading">{{ displayDate }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="text-center mb-4">
              <v-btn-toggle v-model="selectedDay" mandatory borderless>
                <v-btn v-for="(day, index) in days" :key="day" :value="index" depressed>
                  {{ day }}
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-list>
              <v-list-item-group v-model="selectedTimes" multiple>
                <v-list-item v-for="(time, index) in times" :key="time.id">
                  <v-list-item-content>{{ time.label }}</v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox v-model="time.slots[selectedDay]"></v-checkbox>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-checkbox label="Mark all Mondays as off days" @change="toggleMondays" class="mb-3"></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="close">Close</v-btn>
            <v-btn color="primary" @click="saveChanges">Save changes</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      times: [], // Will be populated based on opening hours
      selectedDay: new Date().getDay(), // Select current day by default
      selectedTimes: [],
      search: '',
      orders: [],
      openingFrom: 0, // Initialize with defaults
      openingTo: 23, // Initialize with defaults
      userId: null,
    };
  },
  computed: {
  displayDate() {
    const today = new Date(); // استخدم كائن Date لليوم الحالي
    const selectedDayIndex = this.selectedDay; // اليوم المختار بناءً على مؤشر الأيام من 0 (الأحد) إلى 6 (السبت)
    const currentDayIndex = today.getDay(); // مؤشر اليوم الحالي
    const dayDifference = selectedDayIndex - currentDayIndex;
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + dayDifference);
    return newDate.toLocaleDateString();
  }
},
  async created() {
    this.userId = this.getCurrentUserId();
    await this.getAllData();
    this.calculateOpeningHours();
    this.times = this.generateTimeSlots(); // Generate time slots based on opening hours
  },
  methods: {
    getCurrentUserId() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData && userData.id) {
        this.userId = userData.id;
        this.getAllData(); // استدعاء getAllData بعد التأكد من حصولنا على userId
      } else {
        console.error('No user ID found');
      }
      return userData.id;
    },
    async getAllData() {
      // Fetch data logic here. Placeholder example:
      try {
        const response = await this.$axios.$get('user/get-groomers');
        this.orders = response.data; // Assuming this is the correct data structure
        // Further processing can go here
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    calculateOpeningHours() {
      // Adjust this logic based on your actual data structure
      this.openingFrom = Math.min(...this.orders.map(order => order.opening_from));
      this.openingTo = Math.max(...this.orders.map(order => order.opening_to));
    },
    generateTimeSlots() {
      // Adjust to generate time slots as specified
      return Array.from({ length: this.openingTo - this.openingFrom }, (_, i) => ({
        id: i + this.openingFrom,
        label: `${i + this.openingFrom}:00 - ${i + this.openingFrom + 1}:00`,
        slots: new Array(7).fill(false),
      }));
    },
    toggleMondays(isChecked) {
      this.times.forEach((time) => {
        this.$set(time.slots, 1, isChecked); // Monday is index 1 in `days`
      });
    },
    close() {
      // Close logic here
    },
    saveChanges() {
      // Save changes logic here
      console.log('Saving changes...', this.times);
    },
  },
};
</script>

<style scoped>
.v-data-table__wrapper {
  overflow-x: auto;
}
</style>

-->






<!--
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="headline">Yalla Pets Care</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subheading">{{ displayDate }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="text-center mb-4">
              <v-btn-toggle v-model="selectedDay" mandatory borderless>
                <v-btn v-for="(day, index) in days" :key="day" :value="index" depressed>
                  {{ day }}
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-list>
              <v-list-item-group v-model="selectedTimes" multiple>
                <v-list-item v-for="(time, index) in times" :key="time.id">
                  <v-list-item-content>{{ time.label }}</v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox v-model="time.slots[selectedDay]"></v-checkbox>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-checkbox label="Mark all Mondays as off days" @change="toggleMondays" class="mb-3"></v-checkbox>
            <v-data-table :headers="headers" :items="orders" class="elevation-1"></v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="close">Close</v-btn>
            <v-btn color="primary" @click="saveChanges">Save changes</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      times: [],
      selectedDay: new Date().getDay(),
      selectedTimes: [],
      search: '',
      orders: [],
      groomers: [], // متغير جديد لتخزين بيانات الحلاقين
      openingFrom: 0,
      openingTo: 23,
      userId: null,
      headers: [
        { text: "Booking Time", value: "booking_time_format" },
        { text: "Booking Date", value: "booking_date" },
      ],
    };
  },
  computed: {
    displayDate() {
      const today = new Date();
      const selectedDayIndex = this.selectedDay;
      const currentDayIndex = today.getDay();
      const dayDifference = selectedDayIndex - currentDayIndex;
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + dayDifference);
      return newDate.toLocaleDateString();
    }
  },
  created() {
    this.userId = this.getCurrentUserId();
    this.fetchAllData();
  },
  methods: {
    getCurrentUserId() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData && userData.id) {
        return userData.id;
      } else {
        console.error('No user ID found');
        return null;
      }
    },
    async fetchAllData() {
      await this.fetchGroomers();
      await this.fetchOrders();
    },
    async fetchGroomers() {
      // استدعاء لجلب بيانات الحلاقين من 'user/get-groomers'
      try {
        const response = await this.$axios.$get('user/get-groomers');
        this.groomers = response.data; // فرض أن 'data' تحتوي على بيانات الحلاقين
      } catch (error) {
        console.error('Error fetching groomers:', error);
      }
    },
    async fetchOrders() {
      // استدعاء لجلب بيانات الحجوزات من 'vendor/groomers-booking'
      try {
        const response = await this.$axios.$get('vendor/groomers-booking');
        this.orders = response.data; // فرض أن 'data' تحتوي على بيانات الحجوزات
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    toggleMondays(isChecked) {
      this.times.forEach((time) => {
        this.$set(time.slots, 1, isChecked);
      });
    },
    close() {
      // إغلاق النافذة أو المكون
    },
    saveChanges() {
      // حفظ التغييرات
      console.log('Saving changes...', this.times);
    },
  },
};
</script>

<style scoped>
.v-data-table__wrapper {
  overflow-x: auto;
}
</style>
 -->



 <template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="headline">Grooming Calendar</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- هذا العنصر مخفي الآن باستخدام CSS class "hidden-date" -->
            <v-toolbar-title class="subheading hidden-date">{{ displayDate }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="text-center mb-4">
              <v-btn-toggle v-model="selectedDay" mandatory borderless>
                <v-btn v-for="(day, index) in days" :key="day" :value="index" depressed>
                  {{ day }}
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-list>
              <v-list-item-group v-model="selectedTimes" multiple>
                <v-list-item v-for="(time, index) in times" :key="time.id">
                  <v-list-item-content>
                    <!-- نعرض فقط الوقت هنا، دون التاريخ -->
                    <span>{{ time.label.split(' ')[1] }}</span>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox v-model="time.isChecked"></v-checkbox>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-checkbox label="Mark all Mondays as off days" @change="toggleMondays" class="mb-3"></v-checkbox>
            <v-data-table :headers="headers" :items="orders" class="elevation-1"></v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="close">Close</v-btn>
            <v-btn color="primary" @click="saveChanges">Save changes</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      times: [], // Will be populated based on opening hours
      
      selectedDay: new Date().getDay(), // Select current day by default
      selectedTimes: [],
      orders: [],
      groomers: [],
      openingFrom: 0, // Initialize with defaults
      openingTo: 23, // Initialize with defaults
      userId: null,
      headers: [
        { text: "Booking Time", value: "booking_time_format" },
        { text: "Booking Date", value: "booking_date" },
        // Add other headers as needed
      ],
    };
  },
  computed: {
    displayDate() {
      const today = new Date();
      const selectedDayIndex = this.selectedDay;
      const currentDayIndex = today.getDay();
      const dayDifference = selectedDayIndex - currentDayIndex;
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + dayDifference);
      return newDate.toLocaleDateString();
    }
  },
  watch: {
    async selectedDay(newDay) {
      this.times = this.generateTimeSlots();
      this.userId = this.getCurrentUserId();
      
      await this.fetchAllData();

      this.updateTimeSlotsWithBookings();
    }

  },
  async created() {
    this.userId = this.getCurrentUserId();
    this.times = this.generateTimeSlots();
    await this.fetchAllData();
  },
  methods: {
    getCurrentUserId() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData && userData.id) {
        return userData.id;
      } else {
        console.error('No user ID found');
        return null;
      }
    },
    async fetchAllData() {
      await this.fetchGroomers();
      await this.fetchOrders();
      this.calculateOpeningHours();
    },
    async fetchGroomers() {
      try {
        const response = await this.$axios.$get('user/get-groomers');
        this.groomers = response.data;
      } catch (error) {
        console.error('Error fetching groomers:', error);
      }
    },
    updateTimeSlotsWithBookings() {
      this.times.forEach((slot) => {
        this.orders.forEach((order) => {
          // فحص التطابق بين تاريخ ووقت الحجز مع الفتحات الزمنية
          if (slot.label.includes(order.booking_date) && slot.label.includes(order.booking_time_format)) {

            slot.isChecked = true; 
            // تحديث حالة الفتحة الزمنية
          }
        });
      });
    },


    async fetchOrders() {
      try {
        const response = await this.$axios.$get('vendor/groomers-booking');
        this.orders = response.data.map(order => {
          // Convert the booking date to a readable format.
          const bookingDate = new Date(order.booking_date);
          // Convert the booking time to a 12-hour format with AM/PM.
          const time = new Date();
          time.setHours(parseInt(order.booking_time), 0, 0);
          const bookingTimeFormat = time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          return {
            ...order,
            booking_time_format: bookingTimeFormat,
            booking_date: bookingDate.toLocaleDateString('en-US'),
          };
        });
        this.updateTimeSlotsWithBookings();
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },



    calculateOpeningHours() {
      this.openingFrom = Math.min(...this.groomers.map(groomer => groomer.opening_from));
      this.openingTo = Math.max(...this.groomers.map(groomer => groomer.opening_to));
    },
    generateTimeSlots() {
      
      const selectedDateFormatted = this.displayDate;
      
      return Array.from({ length: this.openingTo - this.openingFrom }, (_, i) => {
        const time = new Date();
        time.setHours(i + this.openingFrom, 0, 0);
        const timeLabel = time.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });


        return {
          id: i + this.openingFrom,
          label: `${selectedDateFormatted} ${timeLabel}`,
          slots: new Array(7).fill(false),
          isChecked: false, // إضافة الخاصية هنا
        };
      });
    },
    
    toggleMondays(isChecked) {
      this.times.forEach((time) => {
        this.$set(time.slots, 1, isChecked);
      });
    },
    close() {
      // Logic to close the component or modal
    },
    saveChanges() {
      // قم بتنفيذ فحص الأوقات المحجوزة قبل حفظ التغييرات

      // قم بتنفيذ العمليات اللازمة الأخرى لحفظ التغييرات
      console.log('Saving changes...', this.times);
    },
  },
};
</script>

<style scoped>
.v-data-table__wrapper {
  overflow-x: auto;
}
</style>