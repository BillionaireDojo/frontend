<template>
  <div class="card-container">
    <h1>{{ opponentInfo.title }}</h1>
    <div class="img-container">
      <img class="img-fluid" :src="getResource(opponentInfo.img)" alt="" />
    </div>
    <button
      @click="handleSelect"
      :style="{
        backgroundColor: active ? '#2E003A' : '#464646',
        color: active ? '#F2E307' : '#2a2927',
      }"
      class="select-btn"
    >
      {{active ? 'Select' : 'Select a fighter first'}}
    </button>
  </div>
</template>

<script>
export default {
  name: "OpponentCard",
  props: {
    opponentInfo: Object,
    active: Boolean,
  },
  methods: {
    getResource(resource) {
      return require(`../assets/nft/${resource}`);
    },
    handleSelect() {
        if (this.active) {
            this.$emit("select-clicked", { id: this.opponentInfo.billionaire });
        }
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Bangers", sans-serif;
  font-size: 35px;
  color: #04daf6;
}
.card-container {
  text-align: center;
  background-color: transparent;
  border: 0;
}
.img-container {
  text-align: center;
}
.img-fluid {
  width: 90%;
  border-radius: 20px;
}

.select-btn {
  font-family: "Bangers", sans-serif;
  font-size: 30px;
  border-radius: 10px;
  border: 0;
  width: 90%;
  margin: auto;
  margin-top: 20px;
}
</style>