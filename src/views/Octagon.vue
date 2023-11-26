<template>
  <div class="octagon-container">
    <Header :activeIdx="2" />
    <h1>Welcome to the Octagon, fighter</h1>
    <h2>Please choose a level:</h2>
    <LevelCarousel @select-click="scrollToView" />
    <div class="img-container steps-container steps-1">
      <img class="img-fluid" src="@/assets/footsteps.svg" alt="" />
    </div>
    <div ref="modeContainer" class="mode-container row justify-content-around">
      <div
        class="enter-octagon-container col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4"
      >
        <h3>Enter Octagon</h3>
        <div class="divider-line"></div>
        <p class="description">
          By entering the Octagon, your fighter remains there until it fought
          the number of rounds you specify, or until its balance is lost. <br />
          If you choose this, your fighter will automatically enter random fight
          without your supervision.
        </p>
        <button
          value="selectEnterOctagon"
          ref="selectEnterOctagon"
          class="select-btn"
          @click="handleSelectOctagon"
        >
          Select
        </button>
      </div>
      <h3 class="or-separator">OR</h3>
      <div
        class="pick-fight-container col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4"
      >
        <h3>Pick a random fight</h3>
        <div class="divider-line"></div>
        <p class="description">
          By picking a random fight, your fighter will choose a random fighter
          from the billionaire team you specify, and runs a fight with it. This
          happens instantly, and you will see the results, whether you lost or
          won, immediately.
        </p>
        <button
          value="selectPickFight"
          ref="selectPickFight"
          class="select-btn"
          @click="handleClick"
        >
          Select
        </button>
      </div>
    </div>
    <div
      v-if="enterOctagonSelected"
      class="rounds-container justify-content-center"
    >
      <h3 class="rounds-text">Select how many rounds you want to fight:</h3>
      <input
        class="rounds-input"
        type="number"
        v-model="value"
        @input="validateInput"
      />
      <button value="selectRoundsInput" @click="handleClick" class="select-btn">
        OK
      </button>
    </div>
    <div class="img-container steps-container steps-2">
      <img class="img-fluid" src="@/assets/footsteps.svg" alt="" />
    </div>
    <div class="fighter-container">
      <h3>Select your fighter</h3>
      <div class="divider-line figher-divider-line"></div>
      <div class="row fighter-row">
        <div v-if="statSelected" class="col-3 col-lg-2 filler"></div>
        <div
          v-if="statSelected"
          class="col-12 col-sm-8 col-md-7 col-lg-5 col-xl-4"
        >
          <DojoCard v-if="statSelected" :stat="selectedStat" />
        </div>
        <div
          :class="
            statSelected
              ? 'col-12 col-sm-4 col-md-5 col-lg-5 col-xl-4'
              : 'col-12'
          "
          class="another-fighter-container"
        >
          <button
            value="selectAnotherFighter"
            ref="selectAnotherFighter"
            class="another-fighter-button"
            @click="showFighterSelect"
            :style="{
              marginTop: statSelected ? '0' : '150px',
              marginBottom: statSelected ? '0' : '150px',
            }"
          >
            {{ statSelected ? "Choose another fighter" : "Choose a fighter" }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="pickFightSelected" ref="opponentCarouselContainer">
      <div class="img-container steps-container steps-3">
        <img class="img-fluid" src="@/assets/footsteps.svg" alt="" />
      </div>
      <div>
        <h3>Select opponent team</h3>
        <div class="divider-line figher-divider-line"></div>
      </div>
      <OpponentCarousel
        :selectedFighter="statSelected ? selectedStat.billionaire : -1"
        @select-click="scrollToView"
        class="opponent-carousel"
      />
    </div>
    <div class="img-container steps-container steps-4">
      <img class="img-fluid" src="@/assets/footsteps.svg" alt="" />
    </div>
    <div class="main-btn-container">
      <button
        :disabled="mainBtnDisabled"
        ref="launchFight"
        @click="launchFight"
        class="main-btn"
        :style="{ backgroundColor: mainBtnDisabled ? 'gray' : '#f20707' }"
      >
        {{ mainBtnTitle }}
      </button>
    </div>
    <FightAnimation
      v-if="animating"
      :style="{ display: animating ? 'block' : 'none' }"
      ref="fightAnimation"
      :isFight="pickFightSelected"
      :fighter="names[selectedStat.billionaire]"
      :opponent="opponentSelected != -1 ? names[opponentSelected] : 'bezos'"
      @stop-animating="stopAnimating"
    />
    <FighterSelect
      v-if="shouldShowFighterSelect"
      @close-clicked="this.shouldShowFighterSelect = false"
      @fighter-selected="fighterSelected"
    />
    <Loader v-if="loading" :loadingMsg="loadingMsg" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import LevelCarousel from "@/components/LevelCarousel.vue";
import DojoCard from "@/components/DojoCard.vue";
import OpponentCarousel from "@/components/OpponentCarousel.vue";
import FightAnimation from "@/components/FightAnimation.vue";
import FighterSelect from "@/components/FighterSelect.vue";
import Loader from "@/components/Loader.vue";
// import Ethers from "@/services/ethers";
import { useStatStore } from "@/services/store";
import { nextTick } from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Octagon",
  components: {
    Header,
    LevelCarousel,
    DojoCard,
    OpponentCarousel,
    FightAnimation,
    FighterSelect,
    Loader,
  },
  data() {
    return {
      ethers: Object,
      selectedStat: Object,
      statSelected: false,
      enterOctagonSelected: false,
      pickFightSelected: false,
      animating: false,
      levelSelected: 0,
      opponentSelected: -1,
      value: 1,
      min: 1,
      shouldShowFighterSelect: false,
      names: ["bezos", "cook", "dorsey", "elon", "pichai", "zuck"],
      loading: false,
      loadingMsg: "Loading...",
      winner: "",
      store: useStatStore(),
    };
  },
  computed: {
    mainBtnTitle() {
      return this.enterOctagonSelected ? "Enter Octagon" : "Launch fight";
    },
    mainBtnDisabled() {
      return (
        (!this.enterOctagonSelected && !this.pickFightSelected) ||
        (this.pickFightSelected && this.opponentSelected == -1)
      );
    },
  },
  created() {
    if (this.store.stat.tokenId != undefined) {
      this.selectedStat = this.store.stat;
      this.statSelected = true;
    }
  },
  async mounted() {
    window.scrollTo(0, 0);
    this.ethers = this.ethersInstance;
  },
  beforeRouteLeave() {
    this.store.setStat({});
  },
  methods: {
    fighterSelected(stat) {
      this.shouldShowFighterSelect = false;
      this.selectedStat = stat;
      this.statSelected = true;

      setTimeout(() => {
        let el;
        if (this.pickFightSelected) {
          el = this.$refs.opponentCarouselContainer;
        } else {
          el = this.$refs.launchFight;
        }

        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 100);
    },
    validateInput() {
      if (this.value < this.min) {
        this.value = this.min;
      }
    },
    scrollToView(msg) {
      if (msg.msg == "level-no-scroll") {
        this.levelSelected = msg.id;
      }
      if (msg.msg == "level") {
        this.levelSelected = msg.id;
        const el = this.$refs.modeContainer;
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      } else if (msg.msg == "opponent") {
        this.opponentSelected = msg.id;
        const el = this.$refs.launchFight;
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    },
    handleClick(e) {
      let el;
      if (
        e.srcElement.value == "selectPickFight" ||
        e.srcElement.value == "selectRoundsInput"
      ) {
        el = this.$refs.selectAnotherFighter;
      }

      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      if (e.srcElement.value == "selectPickFight") {
        this.enterOctagonSelected = false;
        this.pickFightSelected = true;
      }
    },
    handleSelectOctagon() {
      this.enterOctagonSelected = true;
      this.pickFightSelected = false;
    },
    async launchFight() {
      this.loading = true;

      if (!this.statSelected || this.selectedStat == undefined) {
        alert("Please select a fighter");
        this.loading = false;
        return;
      }
      if (this.pickFightSelected && this.opponentSelected == -1) {
        alert("Please select an opponent");
        this.loading = false;
        return;
      }

      let isOk;

      const ethers = this.ethersInstance

      const _this = this;

      if (this.enterOctagonSelected) {
        isOk = await this.ethers.enterOctagon(
          this.selectedStat.tokenId,
          this.levelSelected,
          this.value
        );
      } else if (this.pickFightSelected) {
        ethers.octagon.on("PickAFight", async (p1, p2, w) => {
          const winnerTeam =
            w.toNumber() == p1.toNumber()
              ? _this.selectedStat.billionaire
              : _this.opponentSelected;
          const winner = _this.names[winnerTeam];

          _this.loading = false;
          _this.animating = true;
          await nextTick();

          setTimeout(() => {
            const reff = _this.$refs.fightAnimation;
            if (reff == null) return;
            reff.animateWinner(winner);
          }, 100);
        });

        this.emitter.on("fight-picked", async () => {
          _this.loading = false;

          _this.store.setStat({});
          _this.loading = false;

          _this.animating = true;

          await nextTick();

          setTimeout(() => {
            const reff = _this.$refs.fightAnimation;
            if (reff == null) return;
            reff.animateDiv();
            reff.animateFighting();
          }, 100);
        });

        isOk = await this.ethers.pickAFight(
          this.selectedStat.tokenId,
          this.levelSelected,
          this.opponentSelected,
          this.emitter
        );
      }

      if (!isOk || this.pickFightSelected) {
        this.loading = false;
        return;
      }
      this.store.setStat({});
      this.loading = false;

      this.animating = true;

      await nextTick();

      setTimeout(() => {
        const reff = this.$refs.fightAnimation;
        if (reff == null) return;
        reff.animateDiv();
      }, 100);
    },
    showFighterSelect() {
      this.shouldShowFighterSelect = true;
    },
    stopAnimating() {
      this.animating = false;
    },
  },
};
</script>

<style scoped>
.octagon-container {
  margin-left: 50px;
  margin-right: 50px;
}
.pick-fight-container {
  text-align: center;
  padding: 0;
}
.enter-octagon-container {
  text-align: center;
  padding: 0;
}
h1 {
  font-family: "Bangers", sans-serif;
  font-size: 60px;
  color: #f20707;
  text-align: center;
  margin-top: 50px;
}
h2 {
  font-family: "Bangers", sans-serif;
  font-size: 50px;
  color: #980bbf;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px;
}
h3 {
  font-family: "Bangers", sans-serif;
  font-size: 40px;
  color: #f2e307;
  text-align: center;
  margin-top: 20px;
}
p {
  font-family: "Squada One", sans-serif;
  font-size: 30px;
  color: #04daf6;
  text-align: center;
  line-height: 100%;
  margin-top: 20px;
}
.img-container {
  text-align: center;
  margin-top: 30px;
}
.img-fluid {
  width: 25%;
}
.divider-line {
  background-color: #f2e307;
  height: 4px;
  width: 45%;
  margin: auto;
}
.select-btn {
  background-color: #2e003a;
  border-radius: 8px;
  border: 0;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
  font-family: "Bangers", sans-serif;
  font-size: 30px;
  color: #f2e307;
  padding-left: 50px;
  padding-right: 50px;
}
.rounds-container {
  display: flex;
  text-align: center;
  align-items: center;
  margin-top: 80px;
}
.rounds-text {
  color: #04daf6;
}
.rounds-input {
  background-color: transparent;
  border: 2px solid #04daf6;
  border-radius: 10px;
  height: 60px;
  margin-left: 60px;
  font-family: "Bangers", sans-serif;
  font-size: 30px;
  color: #04daf6;
  width: 200px;
  text-align: right;
  padding-right: 20px;
  margin-right: 40px;
}
.fighter-container {
  margin-top: 50px;
}
.figher-divider-line {
  width: 20%;
}
.another-fighter-button {
  background-color: transparent;
  border: 1px solid #f2e307;
  border-radius: 10px;
  color: #f2e307;
  font-family: "Bangers", sans-serif;
  font-size: 30px;
  padding-left: 30px;
  padding-right: 30px;
}
.another-fighter-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.opponent-carousel {
  margin-top: 30px;
}
.main-btn-container {
  display: flex;
  margin-top: 100px;
  margin-bottom: 100px;
}
.main-btn {
  margin: auto;
  color: #f2e307;
  border: 0;
  border-radius: 10px;
  font-family: "Bangers", sans-serif;
  font-size: 50px;
  width: 70%;
}

.or-separator {
  display: none;
}

@media screen and (max-width: 374px) {
  .description {
    font-size: 20px;
  }
  h3 {
    font-size: 25px;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 25px;
  }
  .steps-container {
    margin-top: -80px;
  }
  .img-fluid {
    width: 100%;
  }
  .select-btn {
    font-size: 20px;
  }
  .pick-fight-container {
    margin-bottom: 70px;
  }
  .another-fighter-container {
    padding: 0;
  }
  .another-fighter-button {
    margin-top: 30px !important;
    margin-bottom: 100px !important;
    font-size: 25px;
  }
  .main-btn {
    font-size: 33px;
    width: 100%;
  }
  .fighter-row {
    margin-left: -50px;
    margin-right: -50px;
  }
  .rounds-input {
    width: 100px;
  }
  .rounds-text {
    font-size: 23px;
  }
  .rounds-input {
    margin-left: 10px;
    margin-right: 10px;
  }
  .rounds-container {
    display: block;
    margin-top: 10px;
    margin-bottom: 80px;
    margin-left: -50px;
    margin-right: -50px;
  }
  .or-separator {
    display: block;
  }
}
@media screen and (min-width: 375px) and (max-width: 475px) {
  .another-fighter-button {
    margin-top: 30px !important;
    margin-bottom: 100px !important;
  }
  .description {
    font-size: 25px;
  }
  h3 {
    font-size: 30px;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 25px;
  }
  .steps-container {
    margin-top: -50px;
  }
  .img-fluid {
    width: 90%;
  }
  .select-btn {
    font-size: 25px;
  }
  .pick-fight-container {
    margin-bottom: 60px;
  }
  .main-btn {
    font-size: 40px;
    width: 100%;
  }
  .another-fighter-button {
    margin-top: 30px !important;
    margin-bottom: 100px !important;
    font-size: 30px;
  }
  .fighter-row {
    margin-left: -40px;
    margin-right: -40px;
  }
  .rounds-input {
    width: 100px;
  }
  .rounds-text {
    font-size: 25px;
  }
  .rounds-input {
    margin-left: 10px;
    margin-right: 10px;
  }
  .rounds-container {
    display: block;
    margin-top: 10px;
    margin-bottom: 80px;
    margin-left: -50px;
    margin-right: -50px;
  }
  .or-separator {
    display: block;
  }
}

@media screen and (min-width: 476px) and (max-width: 575px) {
  .description {
    font-size: 25px;
  }
  h3 {
    font-size: 30px;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 25px;
  }
  .steps-container {
    margin-top: -20px;
  }
  .steps-3 {
    margin-top: 0;
  }
  .steps-4 {
    margin-top: 0;
  }
  .img-fluid {
    width: 75%;
  }
  .main-btn {
    font-size: 35px;
    width: 80%;
  }
  .rounds-input {
    width: 100px;
  }
  .rounds-text {
    font-size: 28px;
  }
  .rounds-input {
    margin-left: 10px;
    margin-right: 10px;
  }
  .rounds-container {
    margin-left: -50px;
    margin-right: -50px;
    margin-bottom: 50px;
  }
  .or-separator {
    display: block;
  }
}
@media screen and (min-width: 576px) and (max-width: 676px) {
  .enter-octagon-container {
    padding-right: 20px;
  }
  .pick-fight-container {
    padding-left: 20px;
  }
  .description {
    font-size: 18px;
  }
  h3 {
    font-size: 28px;
  }
  h1 {
    font-size: 45px;
  }
  h2 {
    font-size: 30px;
  }
  .steps-container {
    margin-top: -70px;
  }
  .steps-2 {
    margin-top: 0;
  }
  .steps-4 {
    margin-top: 0;
  }
  .img-fluid {
    width: 70%;
  }
  .main-btn {
    font-size: 37px;
    width: 70%;
  }
  .filler {
    display: none;
  }
  .rounds-input {
    width: 100px;
  }
  .rounds-text {
    font-size: 28px;
  }
  .rounds-input {
    margin-left: 10px;
    margin-right: 10px;
  }
  .rounds-container {
    margin-left: -30px;
    margin-right: -30px;
  }
}
@media screen and (min-width: 677px) and (max-width: 768px) {
  .enter-octagon-container {
    padding-right: 20px;
  }
  .pick-fight-container {
    padding-left: 20px;
  }
  .description {
    font-size: 20px;
  }
  h3 {
    font-size: 30px;
  }
  h1 {
    font-size: 45px;
  }
  h2 {
    font-size: 30px;
  }
  .steps-container {
    margin-top: -10px;
  }
  .img-fluid {
    width: 60%;
  }
  .filler {
    display: none;
  }
  .rounds-input {
    width: 100px;
  }
  .rounds-text {
    font-size: 35px;
  }
  .rounds-input {
    margin-left: 10px;
    margin-right: 10px;
  }
  .rounds-container {
    margin-left: -10px;
    margin-right: -10px;
  }
}
@media screen and (min-width: 769px) and (max-width: 820px) {
  .enter-octagon-container {
    padding-right: 20px;
  }
  .pick-fight-container {
    padding-left: 20px;
  }
  .description {
    font-size: 25px;
  }
  h3 {
    font-size: 30px;
  }
  h2 {
    font-size: 35px;
  }
  h1 {
    font-size: 50px;
  }
  .steps-container {
    margin-top: -70px;
  }
  .steps-2 {
    margin-top: 0;
  }
  .steps-3 {
    margin-top: 0;
  }
  .steps-4 {
    margin-top: 0;
  }
  .img-fluid {
    width: 50%;
  }
  .filler {
    display: none;
  }
  .rounds-input {
    width: 100px;
  }
  .rounds-text {
    font-size: 35px;
  }
  .rounds-input {
    margin-left: 10px;
    margin-right: 10px;
  }
  .rounds-container {
    margin-left: -10px;
    margin-right: -10px;
  }
}
@media screen and (min-width: 821px) and (max-width: 902px) {
  .enter-octagon-container {
    padding-right: 20px;
  }
  .pick-fight-container {
    padding-left: 20px;
  }
  h2 {
    font-size: 35px;
  }
  h1 {
    font-size: 50px;
  }

  .steps-container {
    margin-top: -50px;
  }
  .steps-2 {
    margin-top: 0;
  }
  .img-fluid {
    width: 45%;
  }
  .filler {
    display: none;
  }
  .rounds-input {
    width: 100px;
  }
  .rounds-text {
    font-size: 35px;
  }
  .rounds-input {
    margin-left: 10px;
    margin-right: 10px;
  }
  .rounds-container {
    margin-left: -10px;
    margin-right: -10px;
  }
}
@media screen and (min-width: 903px) and (max-width: 1069px) {
  .enter-octagon-container {
    padding-right: 20px;
  }
  .pick-fight-container {
    padding-left: 20px;
  }
  .steps-container {
    margin-top: -10px;
  }
  .img-fluid {
    width: 40%;
  }
  .rounds-input {
    width: 100px;
  }
  .rounds-text {
    font-size: 35px;
  }
}
@media screen and (min-width: 903px) and (max-width: 991px) {
  .filler {
    display: none;
  }
  .rounds-container {
    margin-left: -10px;
    margin-right: -10px;
  }
  .rounds-input {
    margin-left: 10px;
    margin-right: 10px;
  }
}
@media screen and (min-width: 1070px) and (max-width: 1169px) {
  .steps-container {
    margin-top: -10px;
  }
  .img-fluid {
    width: 35%;
  }
  .rounds-input {
    width: 100px;
  }
}
@media screen and (min-width: 1169px) and (max-width: 1269px) {
  .steps-container {
    margin-top: -10px;
  }
  .img-fluid {
    width: 30%;
  }
}
@media screen and (max-width: 991px) {
  .mode-container {
    margin-left: -50px;
    margin-right: -50px;
  }
}
</style>