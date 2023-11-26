<template>
  <div class="background-view">
    <div class="row">
      <Vue3Lottie class="animation" :animationData="LoaderJson" />
      <p>{{ loadingMsg }}</p>
    </div>
  </div>
</template>

<script>
import LoaderJson from "@/loader.json";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Loader",
  props: {
    loadingMsg: String,
  },
  data() {
    return {
      LoaderJson,
    };
  },
};
</script>

<style scoped>
.background-view {
  position: fixed !important;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.animation {
  text-align: center;
  z-index: inherit2;
  width: 40%;
}
p {
    font-family: 'Bangers', sans-serif;
    font-size: 30px;
    font-weight: 600;
    color: #F20707;
    text-align: center;
    margin-top: -60px;
}
</style>