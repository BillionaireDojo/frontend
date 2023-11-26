<template>
  <div class="card-container">
    <div class="img-container">
      <div v-if="stat.isInOctagon" class="box">{{currentLevel}} - {{roundsRemaining}} rounds remaining</div>
      <img class="img-fluid" :src="getImg(stat.billionaire)" alt="" />
    </div>
    <div class="details-container">
      <div class="top-container">
        <div class="name-container">
          <img class="name-img" :src="getName(stat.billionaire)" alt="" />
          <h5 class="token-id">{{ stat.tokenId }}</h5>
        </div>
      </div>
      <div class="divider-line"></div>
      <div class="stats-container">
        <h5>Stats</h5>
        <div class="row">
          <div class="col-6">
            <span>
              <h5>
                Money: <span class="stat-el">{{ stat.money }}</span>
              </h5>
            </span>
          </div>
          <div class="col-6">
            <span>
              <h5>
                Charisma: <span class="stat-el">{{ stat.charisma }}</span>
              </h5>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <span>
              <h5>
                Strength: <span class="stat-el">{{ stat.strength }}</span>
              </h5>
            </span>
          </div>
          <div class="col-6">
            <span>
              <h5>
                Empathy: <span class="stat-el">{{ stat.empathy }}</span>
              </h5>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <span>
              <h5>
                Stamina: <span class="stat-el">{{ stat.stamina }}</span>
              </h5>
            </span>
          </div>
          <div class="col-6">
            <span>
              <h5>
                <span class="stat-balance-el">Balance: </span
                ><span class="stat-el">{{ stat.balance }}</span>
              </h5>
            </span>
          </div>
        </div>
      </div>
      <button
        class="mint-btn"
        @click="select"
        :style="{
          backgroundColor:
            buttonTitle == 'Move to octagon' ? '#980bbf' : '#290034',
          color:
            buttonTitle != undefined && buttonTitle.includes('recovery zone')
              ? '#04DAF6'
              : '#f2e307',
        }"
      >
        {{ buttonTitle }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DojoCard",
  props: {
    stat: Object,
    buttonTitle: String,
  },
  data() {
    return {
      currentLevel: String,
      roundsRemaining: Number,
    }
  },
  mounted() {

    if (this.stat.isInOctagon && this.stat.octagonEntry != undefined) {
      this.roundsRemaining = this.stat.octagonEntry.rounds;
      if (this.stat.octagonEntry.level == 0) {
        this.currentLevel = "Maniac"
      } else if (this.stat.octagonEntry.level == 1) {
        this.currentLevel = "Normal"
      } else {
        this.currentLevel = "Baby"
      }
    }
  },
  methods: {
    select() {
      this.$emit("card-selected", this.stat);
    },
    getImg(billionaire) {
      const imgName = this.getImgPathForBillionaire(billionaire);
      return require(`../assets/nft/${imgName}`);
    },
    getName(billionaire) {
      const name = this.getNamePathForBillionaire(billionaire);
      return require(`../assets/cards/${name}`);
    },
    getImgPathForBillionaire(id) {
      switch (id) {
        case 0:
          return "bezos2.png";
        case 1:
          return "cook2.png";
        case 2:
          return "dorsey2.png";
        case 3:
          return "elon2.png";
        case 4:
          return "pichai2.png";
        case 5:
          return "zuck2.png";
        default:
          return "";
      }
    },
    getNamePathForBillionaire(id) {
      switch (id) {
        case 0:
          return "bezos-card-name.svg";
        case 1:
          return "cook-card-name.svg";
        case 2:
          return "dorsey-card-name.svg";
        case 3:
          return "elon-card-name.svg";
        case 4:
          return "pichai-card-name.svg";
        case 5:
          return "zuck-card-name.svg";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.box {
  background-color: black;
  position: absolute;
  top: 0px;
  width: 90%;
  height: 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  font-family: "Bangers", sans-serif;
  color: yellow;
  font-size: 23px;
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
h5 {
  font-family: "Bangers", sans-serif;
  font-size: 22px;
  color: black;
  text-align: center;
}
.stat-el {
  color: #f20707;
}
.stat-balance-el {
  color: #980bbf;
}
.card-container {
  text-align: center;
  background-color: transparent;
  border: 0;
  margin-top: 40px;
  margin-bottom: 40px;
}
.img-container {
  position: relative;
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Horizontally center the child */
  align-items: center;
}
.img-fluid {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 90%;
}
.name-container {
  text-align: left;
  display: flex;
  align-items: center !important;
}
.token-id {
  width: fit-content;
  padding-top: 17px;
  margin-right: 40px !important;
  margin-left: auto;
  font-size: 30px;
}
.name-img {
  margin-top: 10px;
  margin-left: 20px;
  width: 45%;
}
.details-container {
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
  width: 80%;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 15px;
}

.stats-container {
  margin-bottom: 20px;
}

.mint-btn {
  border-radius: 8px;
  border: 0;
  width: 60%;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Bangers", sans-serif;
  font-size: 20px;
}
.mint-title {
  padding-top: 5px;
  padding-bottom: 5px;
  width: 75%;
}

@media screen and (min-width: 992px) {
  .mint-btn {
    width: 80%;
  }
}
</style>