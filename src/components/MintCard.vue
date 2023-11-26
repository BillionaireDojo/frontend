<template>
  <div class="card-container">
    <div class="img-container">
      <img class="img-fluid" :src="getResource(player.img)" alt="" />
    </div>
    <div class="details-container">
      <img class="player-name-img" :src="getResource(player.name)" alt="" />
      <div class="divider-line"></div>
      <p class="player-description">
        {{ player.description }}
      </p>
      <div class="amount-container">
        <h3>Amount to mint:</h3>
        <input
          class="amount-input"
          type="number"
          v-model="value"
          @input="validateInput"
          @focus="clearInput"
          @blur="updateInput"
          min="1"
          max="5"
        />
      </div>
      <button class="mint-btn" @click="mint">
        <img class="mint-title" src="../assets/mint-title.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
// import Ethers from "../services/ethers";

export default {
  name: "MintCard",
  data() {
    return {
      ethers: Object,
      numToMint: 1,
      value: 1,
      min: 1,
      max: 5,
      lastValue: 1,
    };
  },

  props: {
    player: Object,
  },
  methods: {
    clearInput() {
      this.lastValue = this.value;
      this.value = null;
    },
    updateInput() {
      if (this.value == null) {
        this.value = this.lastValue;
      }
    },
    getResource(resource) {
      return require(`../assets/cards/${resource}`);
    },
    async mint() {
      const amount = this.value;

      this.$emit("loading", true);
      const ethers = this.ethersInstance;

      let isOk;

      if (amount == 1) {
        isOk = await ethers.mint(this.player.id);
      } else {
        isOk = await ethers.mintMultiple(this.player.id, amount);
      }

      if (isOk) {
        alert("Welcome to the Billionaire Dojo, KID!");
      }
      this.$emit("loading", false);
    },

    validateInput() {
      if (this.value < this.min) {
        this.value = this.min;
      } else if (this.value > this.max) {
        this.value = this.max;
      }
    },
  },
};
</script>

<style scoped>
.card-container {
  text-align: center;
  background-color: transparent;
  border: 0;
  position: relative;
}
.amount-container {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
}
h3 {
  font-family: "Bangers", sans-serif;
  font-size: 25px;
  color: blue;
  text-align: center;
  margin-top: 10px;
  width: fit-content;
}
.amount-input {
  background-color: transparent;
  border: 1px solid black;
  border-radius: 10px;
  font-family: "Bangers", sans-serif;
  font-size: 25px;
  color: black;
  text-align: center;
  margin-left: 20px;
  padding-left: 5px;
  padding-right: 8px;
  padding-top: 0;
  padding-bottom: 0;
}
.img-container {
  text-align: center;
}
.img-fluid {
  width: 90%;
}
.details-container {
  background-color: white;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  margin: auto;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.8);
}
.player-name-img {
  width: 40%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.divider-line {
  background-color: #980bbf;
  height: 2px;
  width: 50%;
  margin: auto;
  margin-bottom: 15px;
}
.player-description {
  font-family: "Bangers", sans-serif;
  font-size: 18px;
  color: black;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 0;
}

.mint-btn {
  background-color: #980bbf;
  border-radius: 8px;
  border: 0;
  width: 60%;
  text-align: center;
  margin-bottom: 20px;
}

.mint-title {
  padding-top: 5px;
  padding-bottom: 5px;
  width: 25%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* Firefox */
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
  width: 40px;
}

@media screen and (max-width: 502px) {
  .mint-btn {
    width: 70%;
  }
  .mint-title {
    width: 30%;
  }
  .img-fluid {
    width: 65%;
  }
  .details-container {
    width: 65%;
  }
  .player-description {
    font-size: 15px;
  }
}
@media screen and (min-width: 503px) and (max-width: 767px) {
  .img-fluid {
    width: 65%;
  }
  .details-container {
    width: 65%;
  }
  .player-description {
    font-size: 15px;
  }
  .mint-title {
    width: 30%;
  }
}

@media screen and (max-width: 378px) {
  h3 {
    font-size: 22px;
  }
  .amount-input {
    font-size: 23px;
  }
}
</style>