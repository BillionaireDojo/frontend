<template>
  <div class="dojo-container">
    <Header :activeIdx="1" />
    <h1>Welcome to the Dojo</h1>
    <div class="img-container">
      <img class="img-fluid" src="../assets/dojo.png" alt="" />
    </div>
    <div class="container fighters-title-container">
      <div class="row">
        <div class="col-6">
          <h2>Your fighters:</h2>
          <h5>
            {{ tokenCount + `${tokenCount == 1 ? " fighter" : " fighters"}` }}
          </h5>
        </div>
        <div class="col-6 filter-container">
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
      </div>
      <h3 v-if="tokenCount == 0">
        You have no billionaire fighters yet. Go mint some!
      </h3>
    </div>
    <div class="container fighters-container">
      <div class="row fighters-row">
        <div
          v-for="(stat, i) in filteredStats.length > 0 || filtering
            ? filteredStats
            : stats"
          :key="i"
          class="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3"
        >
          <DojoCard
            :buttonTitle="stat.btnTitle"
            :stat="stat"
            @card-selected="handleCardSelect"
          />
        </div>
      </div>
    </div>
    <Loader v-if="loading" :loadingMsg="loadingMsg" />
  </div>
</template>

<script>
// TODO: Update stat when remove from octagon !
import Header from "@/components/Header.vue";
import DojoCard from "@/components/DojoCard.vue";
import Loader from "@/components/Loader.vue";
// import Ethers from "../services/ethers";
import router from "@/router";
import { useStatStore } from "@/services/store";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dojo",
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
      store: useStatStore(),
    };
  },
  components: {
    Header,
    DojoCard,
    Loader,
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
          balance: stat.balance.toNumber()
        };
        stats[tokenIds[i]] = stat;
      }
      const tokenInfo = await this.ethers.getTokenInfo(tokenIds[i]);

      let btnTitle;
      if (tokenInfo.recoverInfo.isRecovering) {
        btnTitle = "Leave recovery zone";
      } else if (!tokenInfo.isInOctagon) {
        btnTitle =
          stat.balance >= 150
            ? "Move to octagon"
            : "Move to recovery zone";
      } else {
        btnTitle = "Leave octagon";
      }

      this.stats.push({
        tokenId: tokenIds[i],
        billionaire: stat.billionaire,
        money: stat.money,
        charisma: stat.charisma,
        strength: stat.strength,
        empathy: stat.empathy,
        stamina: stat.stamina,
        balance: tokenInfo.recoverInfo.isRecovering
          ? this.calcRecoverEarnings(tokenInfo.recoverInfo)
          : tokenInfo.balance.toNumber(),
        isInOctagon: tokenInfo.isInOctagon,
        btnTitle: btnTitle,
        octagonEntry: tokenInfo.isInOctagon ? tokenInfo.octagonEntry : null,
      });
    }
    this.setCachedStats(stats);

    this.loading = false;
  },
  methods: {
    async handleCardSelect(stat) {
      let idx;
      for (let i = 0; i < this.stats.length; i++) {
        if (this.stats[i].tokenId == stat.tokenId) {
          idx = i;
          break;
        }
      }

      switch (stat.btnTitle) {
        case "Move to octagon":
          this.store.setStat(stat);
          router.push({ name: "Octagon" });
          break;
        case "Move to recovery zone":
          this.loading = true;
          var isOk = await this.ethers.enterRecoveryZone(stat.tokenId);
          if (isOk) {
            this.stats[idx].btnTitle = "Leave recovery zone";
            alert("Player is now in the recovery zone");
          }
          this.loading = false;
          break;
        case "Leave octagon":
          this.loading = true;
          isOk = await this.ethers.leaveOctagon(stat.tokenId);
          if (isOk) {
            this.stats[idx].isInOctagon = false;
            this.stats[idx].octagonEntry = null;
            this.stats[idx].btnTitle = "Move to octagon";
            alert("Player has left the octagon");
          }
          this.loading = false;
          break;
        case "Leave recovery zone":
          this.loading = true;
          isOk = await this.ethers.leaveRecoveryZone(stat.tokenId);
          if (isOk) {
            const newStat = await this.ethers.getStat(stat.tokenId);
            this.stats[idx].balance = newStat.balance;
            this.stats[idx].btnTitle =
              newStat.balance > 150
                ? "Move to octagon"
                : "Move to recovery zone";
            alert("Player has left the recovery zone");
          }
          this.loading = false;
          break;
      }
    },
    calcRecoverEarnings(recoverInfo) {
      const timestampMillis = Date.now();
      const timestampSeconds = Math.floor(timestampMillis / 1000);

      const recAm = (timestampSeconds - recoverInfo.recoverStart) / 10;
      const am = Math.round(recAm);
      if (am > 1000) {
        return 1000;
      }
      return am;
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
.dojo-container {
  margin-left: 50px;
  margin-right: 50px;
}
.fighters-title-container {
  margin-top: 100px;
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
h3 {
  font-family: "Bangers", sans-serif;
  font-size: 40px;
  color: #980bbf;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 80px;
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
  width: 60%;
}
.dropdown-menu {
  background-color: #12191d;
  border: 2px solid #980bbf;
  border-radius: 10px;
}
.dropdown-item {
  border: 0;
  border-radius: 0;
  color: white;
}

@media screen and (max-width: 459px) {
  .fighters-row {
    margin-left: -50px;
    margin-right: -50px;
  }
}
@media screen and (max-width: 576px) {
  h1 {
    font-size: 45px;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 30px;
  }
  h5 {
    font-size: 23px;
  }
  .img-fluid {
    max-width: 120%;
    width: 120%;
  }
  button {
    padding-left: 5px;
    padding-right: 5px;
    font-size: 22px;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .col-sm-10 {
    margin: auto;
  }
  h1 {
    font-size: 45px;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 30px;
  }
  h5 {
    font-size: 23px;
  }
}
@media screen and (min-width: 769px) and (max-width: 902px) {
  .fighters-row {
    margin-left: -50px;
    margin-right: -50px;
  }
  h2 {
    font-size: 35px;
  }
  h3 {
    font-size: 35px;
  }
}
@media screen and (min-width: 992px) and (max-width: 1249px) {
  .fighters-row {
    margin-left: -50px;
    margin-right: -50px;
  }
  .col-lg-4 {
    padding: 0;
  }
  .img-fluid {
    width: 70%;
  }
}
@media screen and (min-width: 577px) and (max-width: 799px) {
  .img-fluid {
    width: 100%;
  }
}

@media screen and (min-width: 800px) and (max-width: 991px) {
  .img-fluid {
    width: 80%;
  }
}
@media screen and (min-width: 1250px) {
  .fighters-row {
    margin-left: -50px;
    margin-right: -50px;
  }
}
</style>