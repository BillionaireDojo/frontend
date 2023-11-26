<template>
  <div class="main-container">
    <div class="splide-container">
      <Splide
        @splide:inactive="onInactiveChange"
        @splide:active="onActiveChange"
        @splide:click="onSplideClick"
        @splide:pagination:mounted="onPaginationMounted"
        @splide:pagination:updated="onPaginationUpdated"
        ref="splide"
        :options="{
          perPage: 1,
          height: '850px',
          gap: '0px',
          autoplay: false,
          pauseOnHover: true,
          pauseOnFocus: false,
          interval: 10000,
          pagination: false,
          breakpoints: {
            1400: {
              height: '700px',
            },
            1300: {
              height: '850px',
            },
            1200: {
              height: '800px',
            },
            991: {
              height: '900px',
            },
            768: {
              height: '780px',
            },
          },
          focus: 'center',
          type: 'loop',
          rewind: true,
          arrows: true,
        }"
      >
        <SplideSlide>
          <LevelCard
            :id="0"
            img="maniac.png"
            title="Maniac"
            description="This is the point where things are guaranteed to get ugly. If you have a low risk tolerance, or you can't stomach bloodshed, you should turn back now. Weaklings often come out victorious, just because of their sheer recklessness or insanity. Randomness is high and you risk 500 every time."
            @select-clicked="handleSelect"
          />
        </SplideSlide>
        <SplideSlide>
          <LevelCard
            :id="1"
            img="normal.png"
            title="Normal"
            description="This level won't send you to a therapist afterward. You can't just count on sheer recklessness to win. The amount you'll be playing with is a cozy 300. This level is like a comfortable pair of socks - not too wild, not too dull - an nice cocktail of player's stats and randomness determine the outcome."
            @select-clicked="handleSelect"
          />
        </SplideSlide>
        <SplideSlide>
          <LevelCard
            :id="2"
            img="baby.png"
            title="Baby"
            description="In this level the training wheels are on. This is the land of gentle breezes and fluffy bunnies — a place where even a thumb-war champion can shine. Here, the randomness is about as rare as a unicorn sighting. With a humble 150 at stake, you will find that your player's stats mostly determine the outcome."
            @select-clicked="handleSelect"
          />
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import LevelCard from "./LevelCard.vue";

export default {
  name: "LevelCarousel",
  components: {
    Splide,
    SplideSlide,
    LevelCard,
  },
  methods: {
    handleSelect(msg) {
      this.$emit("select-click", { msg: "level", id: msg });
    },
    onActiveChange(splide) {
      this.$emit("select-click", { msg: "level-no-scroll", id: splide.index });
    }
  },
};
</script>

<style scoped>
@media screen and (max-width: 991px) {
  .main-container {
    margin-left: -50px;
    margin-right: -50px;
  }
}
</style>