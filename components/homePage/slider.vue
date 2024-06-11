<template>
  <v-carousel v-model="model" class="slider">
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src="slide.src"
    >
    <div class="content h-100">
      <h1 class="">{{slide.title}}</h1>
      <p>{{slide.desc}}</p>
    </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import imageOne from '../../assets/images/slider-image.png';
import imageTwo from '../../assets/images/slider-image2.png';
import imageThree from '../../assets/images/slider-image3.png';
import imageFour from '../../assets/images/slider-image4.png';
  export default {
    data: () => ({
      model: 0,
      slides: [
        {
          src: imageOne,
          title: "Get Best Accommodation For Your Pet",
          desc: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
        },
        {
          src: imageTwo,
          title: "Make You Pet Happier With Good Food",
          desc: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
        },
        {
          src: imageThree,
          title: "Get Instant Vet Help Via Our Doctors",
          desc: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
        },
        {
          src: imageFour,
          title: "Groom Your Pet To Get Pro Comfort",
          desc: "Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
        },
      ],
    }),
  }
</script>
