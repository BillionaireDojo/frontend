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
          height: '650px',
          gap: '150px',
          autoplay: false,
          pauseOnHover: true,
          pauseOnFocus: false,
          interval: 10000,
          pagination: false,
          breakpoints: {
            576: {
              perPage: 1,
              gap: '20px',
            },
            767: {
              perPage: 2,
              gap: '10px',
            },
            991: {
              perPage: 2,
              gap: '20px',
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
        <SplideSlide v-for="(op, i) in opponentInfos" :key="i">
          <OpponentCard
            @select-clicked="handleSelect"
            class="card"
            :opponentInfo="op"
            :active="selectedFighter != -1"
          />
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import OpponentCard from "./OpponentCard.vue";

export default {
  name: "OpponentCarousel",
  components: {
    Splide,
    SplideSlide,
    OpponentCard,
  },
  props: {
    selectedFighter: Number,
  },
  mounted() {
    if (this.selectedFighter != -1) {
      this.opponentInfos = this.opponentInfos.filter((el) => {
        return el.billionaire != this.selectedFighter;
      });
    }
  },
  updated() {
    this.opponentInfos = this.fullOpInfos;
    if (this.selectedFighter != -1) {
      this.opponentInfos = this.opponentInfos.filter((el) => {
        return el.billionaire != this.selectedFighter;
      });
    }
  },
  methods: {
    handleSelect(msg) {
      this.$emit("select-click", { msg: "opponent", id: msg.id });
    },
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
  },
  data() {
    return {
      fullOpInfos: [
        {
          billionaire: 0,
          title: "Team Bezos",
          img: "bezos2.png",
        },
        {
          billionaire: 1,
          title: "Team Cook",
          img: "cook2.png",
        },
        {
          billionaire: 2,
          title: "Team Dorsey",
          img: "dorsey2.png",
        },
        {
          billionaire: 3,
          title: "Team Elon",
          img: "elon2.png",
        },
        {
          billionaire: 4,
          title: "Team Pichai",
          img: "pichai2.png",
        },
        {
          billionaire: 5,
          title: "Team Zuck",
          img: "zuck2.png",
        },
      ],
      opponentInfos: [
        {
          billionaire: 0,
          title: "Team Bezos",
          img: "bezos2.png",
        },
        {
          billionaire: 1,
          title: "Team Cook",
          img: "cook2.png",
        },
        {
          billionaire: 2,
          title: "Team Dorsey",
          img: "dorsey2.png",
        },
        {
          billionaire: 3,
          title: "Team Elon",
          img: "elon2.png",
        },
        {
          billionaire: 4,
          title: "Team Pichai",
          img: "pichai2.png",
        },
        {
          billionaire: 5,
          title: "Team Zuck",
          img: "zuck2.png",
        },
      ],
    };
  },
};
</script>

<style scoped>
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

@media screen and (min-width: 577px) and (max-width: 767px) {
  .main-container {
    margin-left: -50px;
    margin-right: -50px;
  }
}
</style>