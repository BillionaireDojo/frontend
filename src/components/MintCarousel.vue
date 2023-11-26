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
          perPage: 3,
          height: '850px',
          gap: '150px',
          autoplay: false,
          pauseOnHover: true,
          pauseOnFocus: false,
          interval: 10000,
          breakpoints: {
            767: {
              perPage: 1,
              gap: '20px',
            },
            991: {
              perPage: 2,
              gap: '50px',
            },
            1200: {
              perPage: 3,
              gap: '50px',
            },
          },
          focus: 'center',
          type: 'loop',
          rewind: true,
          arrows: true,
        }"
      >
        <SplideSlide>
          <MintCard
            @loading="handleLoading"
            :player="players[0]"
            class="card"
          />
        </SplideSlide>

        <SplideSlide>
          <MintCard
            @loading="handleLoading"
            :player="players[1]"
            class="card"
          />
        </SplideSlide>

        <SplideSlide>
          <MintCard
            @loading="handleLoading"
            :player="players[2]"
            class="card"
          />
        </SplideSlide>

        <SplideSlide>
          <MintCard
            @loading="handleLoading"
            :player="players[3]"
            class="card"
          />
        </SplideSlide>

        <SplideSlide>
          <MintCard
            @loading="handleLoading"
            :player="players[4]"
            class="card"
          />
        </SplideSlide>

        <SplideSlide>
          <MintCard
            @loading="handleLoading"
            :player="players[5]"
            class="card"
          />
        </SplideSlide>
      </Splide>
    </div>
    <Loader v-if="loading" :loadingMsg="loadingMsg" />
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import MintCard from "./MintCard.vue";
import playersJson from "../players.json";
import Loader from "@/components/Loader.vue";

export default {
  name: "MintCarousel",
  data() {
    return {
      players: playersJson,
      loading: false,
      loadingMsg: "Joining the dojo...",
    };
  },
  components: {
    Splide,
    SplideSlide,
    MintCard,
    Loader,
  },
  methods: {
    onPaginationMounted(_, data) {
      data.items.forEach(function (item) {
        item.button.style.width = "25px";
        item.button.style.height = "2px";
        item.button.style.borderRadius = 0;
        item.button.style.background = "#980BBF";
        item.li.style.margin = "3px";
      });
    },
    onPaginationUpdated(_, data, prev, curr) {
      if (prev !== undefined) {
        prev.button.style.background = "#980BBF";
      }
      curr.button.style.background = "#F2E307";
    },
    onSplideClick(el, e) {
      const splide = this.$refs.splide;
      splide.go(e.index);
    },
    onActiveChange(el, splide) {
      const img = document.querySelector(`#${splide.slide.id} > .card`);
      img.classList.remove("img-inactive");
      img.classList.add("img-active");
    },
    onInactiveChange(el, splide) {
      const img = document.querySelector(`#${splide.slide.id} > .card`);
      img.classList.add("img-inactive");
      img.classList.remove("img-active");
    },
    handleLoading(loading) {
      this.loading = loading;
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.splide__slide {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.splide__slide.is-visible.is-active .card.img-active {
  transform: scale(1.1) translateY(-40px);
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.img-inactive {
  transform: unset;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.img-fluid {
  pointer-events: none;
  width: 70%;
}

/* small */
@media screen and (max-width: 547px) {
  p {
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  .main-container {
    margin-top: 70px;
    margin-left: -50px;
    margin-right: -50px;
  }
  .splide__slide {
    height: 750px !important;
  }
}

@media screen and (min-width: 548px) and (max-width: 700px) {
  .splide__slide {
    height: 800px !important;
  }
}
@media screen and (min-width: 701px) and (max-width: 767px) {
  .splide__slide {
    height: 850px !important;
  }
}
/* medium */
@media screen and (min-width: 768px) and (max-width: 1091px) {
  p {
    text-align: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  .main-container {
    margin-top: 70px;
    margin-bottom: 120px;
    margin-left: -50px;
    margin-right: -50px;
  }
  .splide__slide {
    height: 850px !important;
  }
}

/* large */
@media screen and (min-width: 1200px) and (max-width: 1699px) {
  p {
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    text-align: center;
    margin-top: 24px;
    width: 65%;
  }

  .main-container {
    margin-bottom: 120px;
    margin-left: -50px;
    margin-right: -50px;
  }

    .splide__slide {
    height: 950px !important;
  }
}

@media screen and (min-width: 1700px) {
  .splide__slide {
    height: 800px !important;
  }
}
</style>