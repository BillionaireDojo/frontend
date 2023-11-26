<template>
  <button class="btn btn-outline-light btn-normal" @click="connectWallet">
    {{
      this.address !== ""
        ? `${this.address.substring(0, 12)}...`
        : "Connect wallet"
    }}
  </button>
  <button class="btn btn-outline-light btn-small" @click="connectWallet">
    {{
      this.address !== ""
        ? `${this.address.substring(0, 7)}...`
        : "Connect"
    }}
  </button>
</template>

<script>
// import Ethers from "../services/ethers";

export default {
  name: "ConnectWallet",
  data() {
    return {
     // ethers: Object,
      address : "",
    }
  },
  async mounted() {
    this.address = this.ethersInstance.address;
  },
  methods: {
    async connectWallet() {
      await this.ethers.connect();
    },
  },
};
</script>

<style scoped>
.btn {
  font-family: "Bangers", sans-serif;
  font-size: 22px;
  color: #04daf6;
  border-color: #04daf6;
}
.btn-small {
  display: none;
}

@media screen and (max-width: 500px) {
  .btn {
    width: 100px;
    overflow: hidden;
  }
  .btn-normal {
    display: none;
  }
  .btn-small {
    display: block;
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>