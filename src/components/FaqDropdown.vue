<template>
  <div class="faq-container">
    <h3 class="faq-title">{{ title }}</h3>
    <button class="arrow-btn" @click="arrowClick">
      <img
        class="faq-arrow"
        :class="{ rotated: isRotated }"
        src="../assets/down.svg"
        alt=""
      />
    </button>
    <p
      class="description"
      :style="{ display: showDescription ? 'block' : 'none' }"
      v-html="description"
    ></p>
  </div>
</template>

<script>
export default {
  name: "FaqDropdown",
  props: {
    title: String,
    description: String,
  },
  data() {
    return {
      showDescription: false,
      isRotated: false,
    };
  },
  methods: {
    arrowClick(e) {
      e.preventDefault();
      this.showDescription = !this.showDescription;
      this.rotateArrow();
    },
    rotateArrow() {
      this.isRotated = !this.isRotated;
    },
  },
};
</script>

<style scoped>
.faq-container {
  width: 50%;
  margin: auto;
  height: fit-content;
  background-color: #353535;
  border-radius: 10px;
  margin-top: 30px !important;
  padding-top: 10px;
  padding-bottom: 10px;
}

.arrow-btn {
  float: right;
  padding-right: 15px;
  padding-top: 5px;
  border: 0;
  margin: 0;
  background-color: transparent;
}

.faq-title {
  display: inline-block;
  font-family: "Bangers", sans-serif;
  font-size: 30px;
  color: #04daf6;
  padding-left: 15px;
  margin: 0;
}

.description {
  display: none;
}

.rotate180-enter-active,
.rotate180-leave-active {
  transition: transform 0.5s;
}

.rotate180-enter,
.rotate180-leave-to {
  transform: rotate(0);
}

.rotated {
  transform: rotate(180deg);
}
p {
  color: #980bbf;
  padding: 10px;
  font-family: "Squada One", sans-serif;
  font-size: 20px;
  margin-bottom: 0px;
}

/* tiny */
@media screen and (max-width: 364px) {
      .faq-container {
    width: 100%;
    margin: 0;
  }
  .faq-title {
    font-size: 20px;
    max-width: 55%;
  }
  .faq-arrow {
    width: 60%;
    float: left;
  }
}

@media screen and (min-width: 365px) and (max-width: 412px) {
  .faq-container {
    width: 100%;
    margin: 0;
  }
  .faq-title {
    font-size: 18px;
    max-width: 65%;
  }
  .faq-arrow {
    width: 60%;
    float: left;
  }
}

/* extra small */
@media screen and (min-width: 413px) and (max-width: 632px) {
  .faq-container {
    width: 100%;
    margin: 0;
  }
  .faq-title {
    font-size: 20px;
    max-width: 75%;
  }
  .faq-arrow {
    width: 60%;
    float: left;
  }
}

/* small */
@media screen and (min-width: 633px) and (max-width: 799px) {
  .faq-container {
    width: 100%;
  }
  .faq-title {
    font-size: 25px;
  }
  .faq-arrow {
    width: 70%;
  }
}

/* medium */
@media screen and (min-width: 800px) and (max-width: 1059px) {
  .faq-container {
    width: 90%;
  }
}
/* large */
@media screen and (min-width: 1060px) and (max-width: 1299px) {
  .faq-container {
    width: 70%;
  }
}
</style>