<template>
  <div class="background-container">
    <div class="fight-select-container">
      <button class="close-btn" @click="close">Close</button>
      <div class="container fighters-title-container">
        <div class="row">
          <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <h2>Your fighters:</h2>
            <h5 class="fighter-count">
              {{ tokenCount + `${tokenCount == 1 ? " fighter" : " fighters"}` }}
            </h5>
          </div>
          <div
            class="col-4 col-sm-4 col-md-6 col-lg-6 col-xl-6 filter-container"
          >
            <div class="dropdown">
              <button
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ filterTxt }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button :value="0" class="dropdown-item" @click="handleFilter">
                  Team Bezos
                </button>
                <button :value="1" class="dropdown-item" @click="handleFilter">
                  Team Cook
                </button>
                <button :value="2" class="dropdown-item" @click="handleFilter">
                  Team Dorsey
                </button>
                <button :value="3" class="dropdown-item" @click="handleFilter">
                  Team Elon
                </button>
                <button :value="4" class="dropdown-item" @click="handleFilter">
                  Team Pichai
                </button>
                <button :value="5" class="dropdown-item" @click="handleFilter">
                  Team Zuck
                </button>
                <button :value="-1" class="dropdown-item" @click="handleFilter">
                  Clear...
                </button>
              </div>
            </div>
          </div>
          <div class="col-2">
            <button class="close-btn-sm" @click="close">X</button>
          </div>
        </div>
      </div>
      <div
        class="fighters-scroll-container"
        @touchstart="startDrag"
        ref="container"
      >
        <div
          class="fighters-container"
          ref="content"
          :style="contentStyle"
          @touchmove="handleDrag"
          @touchend="endDrag"
          @touchcancel="endDrag"
        >
          <Splide
            ref="splide"
            :options="{
              perPage: 4,
              height: '650px',
              gap: '1px',
              autoplay: false,
              pauseOnHover: true,
              pauseOnFocus: false,
              interval: 10000,
              pagination: false,
              breakpoints: {
                676: {
                  perPage: 1,
                  gap: '20px',
                },
                767: {
                  perPage: 2,
                },
                991: {
                  perPage: 2,
                },
                1200: {
                  perPage: 3,
                  gap: '0px',
                },
                1400: {
                  perPage: 3,
                  gap: '50px',
                },
              },
              focus: 'center',
              type: 'slide',
              rewind: true,
              arrows: true,
            }"
          >
            <SplideSlide
              v-for="(stat, i) in filteredStats.length > 0 || filtering
                ? filteredStats
                : stats"
              :key="i"
            >
              <DojoCard
                class="card"
                buttonTitle="Select"
                :stat="stat"
                @card-selected="fighterSelected"
              />
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </div>
    <h3
      v-if="filteredStats.length == 0 && filtering"
      class="no-fighters-filter"
    >
      You don't have fighters from this team
    </h3>
    <Loader v-if="loading" :loadingMsg="loadingMsg" />
  </div>
</template>

<script>
// import Ethers from "../services/ethers";

import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import DojoCard from "@/components/DojoCard.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "FightSelect",
  components: {
    DojoCard,
    Loader,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      ethers: Object,
      stats: [],
      filteredStats: [],
      filtering: false,
      tokenCount: 0,
      loading: false,
      loadingMsg: "Loading...",
      filterTxt: "Filter...",
      names: ["Bezos", "Cook", "Dorsey", "Elon", "Pichai", "Zuck"],
      isDragging: false,
      startY: 0,
      currentY: 0,
      dragStarted: false,
    };
  },
  async mounted() {
    this.loading = true;

    this.ethers = this.ethersInstance;

    const tokenIds = await this.ethers.walletOfOwner();
    this.tokenCount = tokenIds.length;

    let stats = this.getCachedStats();
    if (stats == null) {
      stats = {};
    }

    for (let i = 0; i < tokenIds.length; i++) {
      let stat = stats[tokenIds[i]];

      const tokenInfo = await this.ethers.getTokenInfo(tokenIds[i]);

      if (tokenInfo.isInOctagon) {
        continue;
      }
      if (tokenInfo.recoverInfo.isRecovering) {
        continue;
      }

      if (stat == undefined) {
        stat = await this.ethers.getStat(tokenIds[i]);

        stat = {
          tokenId: tokenIds[i],
          billionaire: stat.billionaire,
          money: stat.money.toNumber(),
          charisma: stat.charisma.toNumber(),
          strength: stat.strength.toNumber(),
          empathy: stat.empathy.toNumber(),
          stamina: stat.stamina.toNumber(),
          balance: stat.balance.toNumber(),
        };
        stats[tokenIds[i]] = stat;
      }

      this.stats.push({
        tokenId: tokenIds[i],
        billionaire: stat.billionaire,
        money: stat.money,
        charisma: stat.charisma,
        strength: stat.strength,
        empathy: stat.empathy,
        stamina: stat.stamina,
        balance: stat.balance,
      });
    }
    this.setCachedStats(stats);
    this.loading = false;
  },
  computed: {
    contentStyle() {
      return {
        transform: `translateY(${this.currentY}px)`,
      };
    },
  },
  methods: {
    close() {
      this.$emit("close-clicked");
    },
    fighterSelected(stat) {
      this.$emit("fighter-selected", stat);
    },
    handleFilter(e) {
      const billionaireTeam = e.srcElement.value;

      if (billionaireTeam == -1) {
        this.filteredStats = [];
        this.tokenCount = this.stats.length;
        this.filtering = false;
        this.filterTxt = "Filter...";
        return;
      }

      this.filteredStats = this.stats.filter((stat) => {
        return stat.billionaire == billionaireTeam;
      });
      this.tokenCount = this.filteredStats.length;
      this.filtering = true;
      this.filterTxt = `${this.names[billionaireTeam]}`;
    },

    startDrag(event) {
      if (this.dragStarted) return;
      event.preventDefault();
      this.isDragging = true;
      this.startY = event.clientY || event.touches[0].clientY;
      this.currentY = this.$refs.container.scrollTop;
      this.$refs.content.style.cursor = "grabbing";
      this.$refs.content.style.userSelect = "none";
      document.body.style.overflow = "hidden";
      this.dragStarted = true;
    },
    handleDrag(event) {
      console.log("Dragging ");
      if (!this.isDragging) return;
      event.preventDefault();
      const clientY = event.clientY || event.touches[0].clientY;
      const deltaY = clientY - this.startY;
      this.$refs.container.scrollTop = this.currentY - deltaY;
    },
    endDrag() {
      console.log("end dragging");
      this.isDragging = false;
      this.$refs.content.style.cursor = "grab";
      this.$refs.container.style.overflowY = "auto"; // Re-enable container scroll
      document.body.style.overflow = "auto";
    },
    setCachedStats(stats) {
      localStorage.setItem("cachedStats", JSON.stringify(stats));
    },
    getCachedStats() {
      let cachedJson = localStorage.getItem("cachedStats");
      if (cachedJson) {
        return JSON.parse(cachedJson);
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
.background-container {
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

.no-fighters-filter {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-family: "Bangers", sans-serif;
  font-size: 30px;
  color: #980bbf;
  text-align: center;
}

.fight-select-container {
  width: 80%;
  height: 92%;
  background-color: white;
  border-radius: 20px;
}

.fighters-title-container {
  margin-top: 20px;
}
.card-container {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}

h1 {
  font-family: "Bangers", sans-serif;
  font-size: 60px;
  color: #04daf6;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
h2 {
  font-family: "Bangers", sans-serif;
  font-size: 40px;
  color: #980bbf;
}
h5 {
  font-family: "Bangers", sans-serif;
  font-size: 25px;
  color: #980bbf;
}
.filter-container {
  text-align: right;
}
button {
  background-color: transparent;
  border: 2px solid #980bbf;
  border-radius: 10px;
  font-family: "Bangers", sans-serif;
  font-size: 25px;
  color: #980bbf;
  padding-left: 30px;
  padding-right: 30px;
}
.img-container {
  display: flex;
  justify-content: center;
}
.img-fluid {
  width: 50%;
}
.close-btn {
  display: flex;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.close-btn-sm {
  display: none;
}
.dropdown-menu {
  background-color: white;
  border: 2px solid #980bbf;
  border-radius: 10px;
}
.dropdown-item {
  border: 0;
  border-radius: 0;
  color: black;
}
@media screen and (max-width: 399px) {
  h2 {
    font-size: 25px;
    margin-bottom: 0;
  }
  h5 {
    font-size: 20px;
  }
  .card {
    margin-left: 10px;
    margin-right: 10px;
  }
  .fight-select-container {
    width: 95%;
    height: 95%;
  }
  button {
    font-size: 20px;
    padding-left: 5px;
    padding-right: 5px;
  }
}
@media screen and (min-width: 400px) and (max-width: 499px) {
  h2 {
    font-size: 25px;
    margin-bottom: 0;
  }
  h5 {
    font-size: 20px;
  }
  .card {
    margin-left: 20px;
    margin-right: 20px;
  }
  .fight-select-container {
    height: 95%;
    width: 95%;
  }
  button {
    font-size: 20px;
    padding-left: 5px;
    padding-right: 5px;
  }
}

@media screen and (min-width: 500px) and (max-width: 576px) {
  h2 {
    font-size: 30px;
    margin-bottom: 0;
  }
  h5 {
    font-size: 25px;
  }
  .card {
    margin-left: 45px;
    margin-right: 45px;
  }
  .fight-select-container {
    height: 95%;
  }
  button {
    font-size: 23px;
    padding-left: 15px;
    padding-right: 15px;
  }
}
@media screen and (min-width: 577px) and (max-width: 676px) {
  h2 {
    font-size: 30px;
    margin-bottom: 0;
  }
  h5 {
    font-size: 25px;
  }
  .card {
    margin-left: 80px;
    margin-right: 80px;
  }
  .fight-select-container {
    height: 95%;
  }
}
@media screen and (min-width: 677px) and (max-width: 767px) {
  h2 {
    font-size: 30px;
    margin-bottom: 0;
  }
  h5 {
    font-size: 25px;
  }
}
@media screen and (min-width: 768px) and (max-width: 890px) {
  .card {
    width: 95%;
  }
  h2 {
    font-size: 30px;
  }
  h5 {
    font-size: 25px;
  }
}
@media screen and (min-width: 891px) and (max-width: 991px) {
  .card {
    width: 82%;
  }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .fight-select-container {
    width: 90%;
    height: 95%;
  }
}

@media screen and (max-height: 750px) {
  .fight-select-container {
    height: 100%;
  }
  .fighter-count {
    display: none;
  }

  .fighters-title-container {
    margin-top: 10px;
  }
  .close-btn-sm {
    margin-left: auto;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
    color: yellow;
    background: red;
  }
}

@media screen and (max-height: 750px) and (max-width: 767px) {
  .close-btn {
    display: none;
  }
  .close-btn-sm {
    display: flex;
  }
}

@media screen and (max-height: 950px) {
  .fighters-scroll-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .fighters.container {
    position: relative;
    cursor: grab;
  }
}
</style>