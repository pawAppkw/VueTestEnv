<template>
  <v-card>
    <v-toolbar elevation="0">
      <v-toolbar-title>Top Trending Products</v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col>
          <v-btn @click="filterProducts('All')" color="primary" rounded :outlined="!filter.includes('All')" >All</v-btn>
          <v-btn @click="filterProducts('Cats')" color="primary" rounded :outlined="!filter.includes('Cats')" >Cats</v-btn>
          <v-btn @click="filterProducts('Dogs')" color="primary" rounded :outlined="!filter.includes('Dogs')" >Dogs</v-btn>
          <v-btn @click="filterProducts('Fish')" color="primary" rounded :outlined="!filter.includes('Fish')" >Fish</v-btn>
          <v-btn @click="filterProducts('Hamster')" color="primary" rounded :outlined="!filter.includes('Hamster')" >Hamster</v-btn>
          <v-btn @click="filterProducts('Bird')" color="primary" rounded :outlined="!filter.includes('Bird')" >Bird</v-btn>
          <v-btn @click="filterProducts('Horses')" color="primary" rounded :outlined="!filter.includes('Horses')" >Horses</v-btn>
          <v-btn @click="filterProducts('Reptiles')" color="primary" rounded :outlined="!filter.includes('Reptiles')" >Reptiles</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" v-for="(product, index) in filteredProducts" :key="index">
          <v-card rounded="xl">
            <v-img :src="product.image" height="150"></v-img>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn rounded min-width="30" min-height="30" class="px-0 py-0"  v-on="on" absolute top="0" color="white" right="0">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="editProduct(product)">تحرير</v-list-item>
                  <v-list-item @click="deleteProduct(product)">حذف</v-list-item>
                </v-list>
              </v-menu>
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-subtitle class="d-flex align-center">
              <h2 class="black--text">{{product.title}}</h2>
              <span text class="ml-auto primary--text"> 300<v-icon color="#000">mdi-arrow-top-right</v-icon></span>
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col class="primary--text">{{product.categories.join(", ")}}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="primary--text">{{product.weight}} gm</v-col>
                <v-col cols="6" class="text-right"><span class="primary px-1 py-1 rounded-xl secondary--text">{{product.price}} $</span></v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
        filter: ['All'],
      products: [
        {
          id: 1,
          title: "طعام القطط",
          image: "https://picsum.photos/id/237/200/300",
          weight: 320,
          price: 15.99,
          categories: ["Cats"],
        },
        {
          id: 2,
          title: "طعام الأسماك",
          image: "https://picsum.photos/id/238/200/300",
          weight: 200,
          price: 8.99,
          categories: ["Fish", "Dogs"],
        },
        {
          id: 3,
          title: "حلوى الكلاب",
          image: "https://picsum.photos/id/239/200/300",
          weight: 500,
          price: 12.99,
          categories: ["Dogs"],
        },
        {
          id: 4,
          title: "طعام الهامستر",
          image: "https://picsum.photos/id/240/200/300",
          weight: 250,
          price: 6.99,
          categories: ["Hamster"],
        },
        {
          id: 5,
          title: "بذور الطيور",
          image: "https://picsum.photos/id/241/200/300",
          weight: 800,
          price: 13.99,
          categories: ["Bird"],
        },
        {
          id: 6,
          title: "مجموعة تجميل الخيل",
          image: "https://picsum.photos/id/242/200/300",
          weight: 1,
          price: 39.99,
          categories: ["Horse"],
        },
        {
          id: 7,
          title: "بيئة الزواحف",
          image: "https://picsum.photos/id/243/200/300",
          weight: 1,
          price: 99.99,
          categories: ["Reptiles"],
        },
      ],
      filteredProducts: [],
    };
  },
  methods: {
    filterProducts(category) {
      this.filter = [category]
      if (category === "All") {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter((product) =>
          product.categories.includes(category)
        );
      }
    },
    editProduct(product) {
      console.log("تحرير", product);
    },
    deleteProduct(product) {
      console.log("حذف", product);
    },
  },
  created() {
    this.filteredProducts = this.products;
  },
};
</script>
