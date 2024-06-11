<template>
  <div class="services-component">
    <v-container>
      <v-row >
        <v-col cols="12" justify="center" align="center">
          <h2 class="section-title" color="primary">
            Our Services
          </h2>
          <p class="section-subtitle">
            We look after your little family, we ensure that we will
            give the best treatment for your little family
          </p>
        </v-col>
        <v-col cols="12">
          <div class="swiper-container">
            <div v-swiper:mySwiper="swiperOption">
              <div class="swiper-wrapper">

                  <div class="swiper-slide" v-for="(slide, i) in sliderData" :key="i">
                      <v-card class="slide-card">
                        <v-card-text class="text-center">
                          <img :src="slide.image" alt="">
                          <h4 class="card-title">{{slide.title}}</h4>
                          <p class="card-subtitle">
                            {{ slide.subtitle }}
                          </p>
                        </v-card-text>
                      </v-card>
                  </div>
              </div>
              <!-- <div class="swiper-navigation"></div> -->
          </div>
          <div class="swiper-button-next"> <v-icon>mdi-chevron-right</v-icon></div>
          <div class="swiper-button-prev"> <v-icon>mdi-chevron-left</v-icon> </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>
<script>
import hotels from '../../assets/images/hotels.svg';
import doctor from '../../assets/images/doctor.svg';
import growing from '../../assets/images/growing.svg';
import shelter from '../../assets/images/shelter.svg';
import store from '../../assets/images/store.svg';
import train from '../../assets/images/train.svg';
import vets from '../../assets/images/vets.svg';
export default {
    data() {
        return {
            swiperOption: {
              loop: false,
              slidesPerView: 3,
              spaceBetween: 20,
              // pagination: {
              //   el: ".swiper-pagination",
              //   clickable: true,
              // },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              autoplay: {
                delay: 5000,
              },
              breakpoints: {
              // when window width is <= 768px
              768: {
                  slidesPerView: 1,
                  spaceBetween: 20
              },
              // when window width is <= 992px
              992: {
                  slidesPerView: 2,
                  spaceBetween: 30
              }
          }
            },
            sliderData: [
              {
                title: 'Hotels',
                subtitle: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
                image: hotels,
              },
              {
                title: 'Stores',
                subtitle: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
                image: store,
              },
              {
                title: 'Vets',
                subtitle: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
                image: vets,
              },
              {
                title: 'Grooming',
                subtitle: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
                image: growing,
              },
              {
                title: 'Train',
                subtitle: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
                image: train,
              },
              {
                title: 'Doctor',
                subtitle: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
                image: doctor,
              },
              {
                title: 'Shelter',
                subtitle: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
                image: shelter,
              }
            ]
        };
    }
}
</script>
