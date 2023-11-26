<template>
  <div class="header-container row">
    <div class="btn-container col-8">
      <button :value="0" @click="navigate" class="header-btn" :class="activeIdx == 0 ? 'header-btn-active' : ''">Home</button>
      <button :value="1" @click="navigate" class="header-btn" :class="activeIdx == 1 ? 'header-btn-active' : ''">Dojo</button>
      <button :value="2" @click="navigate" class="header-btn" :class="activeIdx == 2 ? 'header-btn-active' : ''">Octagon</button>
      <button :value="3" @click="navigate" class="header-btn" :class="activeIdx == 3 ? 'header-btn-active' : ''">Leaderboard</button>
    </div>
    <div class="hamburger-container col-4">
      <button class="hamburger-btn" @click="btnClick">
        <img class="menu-img" src="../assets/hamburger.svg" alt="">
      </button>
      <div class="hamburger-btn-container" :style="{ display: showButtons ? 'block' : 'none' }">
        <button :value="0" @click="navigate" class="header-btn row header-hamburger-btn" :class="activeIdx == 0 ? 'header-btn-active' : ''">Home</button>
        <button :value="1" @click="navigate" class="header-btn row header-hamburger-btn" :class="activeIdx == 1 ? 'header-btn-active' : ''">Dojo</button>
        <button :value="2" @click="navigate" class="header-btn row header-hamburger-btn" :class="activeIdx == 2 ? 'header-btn-active' : ''">Octagon</button>
        <button :value="3" @click="navigate" class="header-btn row header-hamburger-btn" :class="activeIdx == 3 ? 'header-btn-active' : ''">Leaderboard</button>
      </div>
    </div>
    <div class="connect-container col-4">
      <ConnectWallet />
    </div>
  </div>
</template>

<script>
import router from '@/router';
import ConnectWallet from "./ConnectWallet.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  components: {
    ConnectWallet,
  },
  data() {
    return {
      routes: ['/', '/dojo', '/octagon', 'leaderboard'],
      showButtons: false
    }
  },
  props: {
    activeIdx: Number,
  },
  methods: {
    navigate(e) {
      router.push(this.routes[e.srcElement.value]);
    },
    btnClick() {
      this.showButtons = !this.showButtons
    }
  }
};
</script>

<style scoped>
.header-container {
  margin-top: 30px;
}
.btn-container {
  margin-left: 0 !important;
  margin-right: auto;  
}
.connect-container {
  width: fit-content;
  margin-left: auto;
  margin-right: 0 !important;
}
.header-btn {
  background-color: transparent;
  color: #980BBF;
  font-family: "Bangers", sans-serif;
  font-size: 23px;
  padding-right: 30px;
  border: 0;
}
.header-btn-active {
    color: #04DAF6;
}
.hamburger-btn {
  background-color: transparent;
  border: 0;
}
.menu-img {
  width: 35px;
}

.hamburger-btn-container {
  background-color: #12191d;
  width: fit-content;
  margin-top: 10px;
  border-radius: 8px;
}

.header-hamburger-btn {
  padding-left: 40px;
  padding-right: 60px;
}

/* small */
@media screen and (max-width: 786px) {
  .btn-container {
    display: none;
  }
}

/* medium & large */
@media screen and (min-width: 787px) {
  .hamburger-container {
    display: none;
  }
}
</style>