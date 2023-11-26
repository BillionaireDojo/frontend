<template>
  <div class="leaderboard-container">
    <Header :activeIdx="3" />
    <h1>Leaderboard</h1>
    <div class="row top-stats-container">
      <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
        <h3>Total number of fighters: {{ numToken }}</h3>
      </div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
        <h3>Total number of fights: {{ numFights }}</h3>
      </div>
      <div class="col-12 col-md-4 col-lg-4 col-xl-4">
        <h3>Fighters in octagon now: {{ numInOctagon }}</h3>
      </div>
    </div>
    <div class="">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <h2>Team scores</h2>
          <div class="team-score" v-for="(score, i) in teamScores" :key="i">
            <TeamScore :rank="i" :teamData="score" />
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <h2>Team members</h2>
          <div class="team-score" v-for="(score, i) in teamMembers" :key="i">
            <TeamScore :rank="i" :teamData="score" />
          </div>
        </div>
      </div>
    </div>
    <Loader v-if="loading" :loadingMsg="loadingMsg" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import TeamScore from "@/components/TeamScore.vue";
// import Ethers from "@/services/ethers";
import Loader from "@/components/Loader.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Leaderboard",
  components: {
    Header,
    TeamScore,
    Loader,
  },
  async mounted() {
    this.loading = true;
    await this.getOtherInfos(this.ethersInstance);
    await this.getLeaderboardInfo(this.ethersInstance);
    this.loading = false;
  },
  data() {
    return {
      loading: false,
      loadingMsg: "Loading...",
      numToken: 0,
      numFights: 0,
      numInOctagon: 0,
      teamScores: [
        {
          img: "bezos2l.png",
          title: "Team Bezos",
          score: 0,
        },
        {
          img: "cook2l.png",
          title: "Team Cook",
          score: 0,
        },
        {
          img: "dorsey2l.png",
          title: "Team Dorsey",
          score: 0,
        },
        {
          img: "elon2l.png",
          title: "Team Elon",
          score: 0,
        },
        {
          img: "pichai2l.png",
          title: "Team Pichai",
          score: 0,
        },
        {
          img: "zuck2l.png",
          title: "Team Zuck",
          score: 0,
        },
      ],
      teamMembers: [
        {
          img: "bezos2l.png",
          title: "Team Bezos",
          score: 0,
        },
        {
          img: "cook2l.png",
          title: "Team Cook",
          score: 0,
        },
        {
          img: "dorsey2l.png",
          title: "Team Dorsey",
          score: 0,
        },
        {
          img: "elon2l.png",
          title: "Team Elon",
          score: 0,
        },
        {
          img: "pichai2l.png",
          title: "Team Pichai",
          score: 0,
        },
        {
          img: "zuck2l.png",
          title: "Team Zuck",
          score: 0,
        },
      ],
    };
  },
  methods: {
    async getLeaderboardInfo(ethers) {
      await this.getTeamMemberCount(ethers);
      await this.getTeamScores(ethers);
      this.teamScores = this.teamScores.sort((a, b) => {
        return b.score - a.score;
      });
      this.teamMembers = this.teamMembers.sort((a, b) => {
        return b.score - a.score;
      });
    },
    async getTeamMemberCount(ethers) {
      for (let i = 0; i < 6; i++) {
        const count = await ethers.getTeamMemberCount(i);
        this.teamMembers[i].score = count;
      }
    },
    async getTeamScores(ethers) {
      for (let i = 0; i < 6; i++) {
        const balance = await ethers.getTeamBalance(i);
        this.teamScores[i].score = balance;
        this.teamMembers[i].bal = balance;
      }
    },
    async getOtherInfos(ethers) {
      this.numToken = await ethers.getTokenCount();
      this.numFights = await ethers.getTotalFights();
      this.numInOctagon = await ethers.getInOctagonCount();
    },
  },
};
</script>

<style scoped>
.leaderboard-container {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
}

.top-stats-container {
  border: 1px solid #04daf6;
  border-radius: 20px;
  margin-top: 50px;
}

h1 {
  font-family: "Bangers", sans-serif;
  font-size: 60px;
  color: #04daf6;
  text-align: center;
  margin-top: 50px;
  text-decoration: underline;
}
h2 {
  font-family: "Bangers", sans-serif;
  font-size: 50px;
  color: #04daf6;
  text-align: center;
  margin-top: 50px;
}
h3 {
  font-family: "Bangers", sans-serif;
  font-size: 30px;
  color: #04daf6;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.team-score {
  margin-top: 20px;
  text-align: center;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 426px) {
  h1 {
    font-size: 45px;
  }
  h2 {
    font-size: 35px;
  }
  h3 {
    font-size: 21px;
  }
}

@media screen and (min-width: 427px) and (max-width: 576px) {
  h1 {
    font-size: 48px;
  }
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 23px;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  h2 {
    font-size: 40px;
  }
}

@media screen and (min-width: 577px) and (max-width: 767px) {
  h2 {
    font-size: 35px;
  }
  h3 {
    font-size: 24px;
  }
}
</style>