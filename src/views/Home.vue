<template>
  <div class="home-container">
    <Header :activeIdx="0" />
    <div class="img-container">
      <img class="img-fluid" src="../assets/title.svg" alt="" />
    </div>

    <div class="dropdown-container">
      <FaqDropdown
        title="What is this game and how does it work?"
        description="
Billionaire Dojo is a blockchain-based game where tech billionaires can be minted as NFTs and entered into matches against each other. Each billionaire represents a team (i.e. Team Elon, Team Zuck etc.), and the goal of the game is to take the balance of other teams and make your team more wealthy. Other teams can also be ousted from the game if the balance of all their players go down to zero. In the end, there can be only one. <br> <br>
Each billionaire has 5 stats that will determine how he does in a fight. Money, which is usually very high for all players, strength, stamina, and charisma, which can be anything between 1 and 100, and will play the most part in how a battle ends. <br> <br>
Finally, there is empathy, which is sadly very low for most of our billionaires. If you happen to mint one who has an empathy above 30, then don`t let go! Billionaires with that much empathy are very rare! They will very often be victorious, even if they don`t have a lot of strength or charisma.<br> <br>
In the Dojo tab you can see and manage all your players. You can move to the octagon to fight, take a  player out of the octagon, or put a player in the recovery zone if its balance hit zero. <br> <br>
The Octagon tab is where players fight. There are 3 levels: the more difficult the level, the higher the role of randomness in the outcome, and the more balance the player risks each round. <br> <br>
The Leaderboard tab is where you can see how each team is doing. A team is eliminated if all the members balances hit zero. The game ends once there is only one team left. <br> <br>
         "
      />

      <FaqDropdown
        title="What is the mint price and why is it not free?"
        description="
        The smart contracts will be deployed on Polygon Mainnet. This means gas will cost pennies. Because of this, we have to protect against the game getting ruined by bots and spam, so we can't do a free mint. <br> <br>
        The price of one NFT will be 20 MATIC, which is approximately 14 USD. This price should be small enough that most people who want to play can afford it, but sufficient to prevent people from spamming the contracts.
        "
      />

      <FaqDropdown
        title="Where can I learn more about Billionaire Dojo?"
        description="
        We don't have a Discord, a roadmap, or a vision for this project. Our only goal is to create a fun, simple, funny game that makes people laugh and takes their minds off from all the bullshit that's happening in the world right now at least for a little while. <br> <br>
        We share occasional updates on our <a href='https://twitter.com/billionairedojo' target='_blank'>Twitter</a> so if you want to keep up with the latest updates follow us there. <br>
        Our smart contracts will also be open-sourced before the game launches.
        "
      />
    </div>
    <div class="main-bottom-container">
      <img class="cta" src="../assets/cta.svg" alt="" />
      <MintCarousel />
    </div>
    <Loader v-if="loading" :loadingMsg="loadingMsg" />
  </div>
</template>

<script>
// Bangers
// https://fonts.google.com/specimen/Bungee+Hairline?category=Display

import MintCarousel from "@/components/MintCarousel.vue";
import FaqDropdown from "@/components/FaqDropdown.vue";
import Header from "@/components/Header.vue";
import Loader from "@/components/Loader.vue";

// import Ethers from "../services/ethers";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    MintCarousel,
    FaqDropdown,
    Loader,
    Header,
  },
  data() {
    return {
      ethers: Object,
      showDescription: false,
      isRotated: false,
      loading: false,
      loadingMsg: "Joining the dojo...",
    };
  },
  async mounted() {
    this.ethers = this.ethersInstance;
  },
  methods: {
    arrowClick(e) {
      e.preventDefault();
      this.showDescription = !this.showDescription;
      this.rotateArrow();
    },
    rotateArrow() {
      this.isRotated = !this.isRotated;
    },
  },
};
</script>

<style scoped>
.home-container {
  margin-left: 50px;
  margin-right: 50px;
}
.img-container {
  text-align: center;
  margin-top: 30px;
}

.dropdown-container {
  margin-top: 80px;
}
.rotate180-enter-active,
.rotate180-leave-active {
  transition: transform 0.5s;
}

.rotate180-enter,
.rotate180-leave-to {
  transform: rotate(0);
}

.rotated {
  transform: rotate(180deg);
}
p {
  color: #980bbf;
  padding: 15px;
  font-family: "Squada One", sans-serif;
  font-size: 20px;
}
.cta {
  width: 60%;
  margin-top: 150px;
  margin-bottom: 80px;
}
.main-bottom-container {
  text-align: center;
}

/* extra small */
@media screen and (max-width: 632px) {
  .dropdown-container {
    margin-top: 40px;
  }
  .cta {
    margin-top: 50px;
    margin-bottom: 10px;
    width: 100%;
  }
  .main-container {
    margin-top: 0;
  }
}

/* small */
@media screen and (min-width: 633px) and (max-width: 799px) {
  .dropdown-container {
    margin-top: 40px;
  }
  .cta {
    margin-top: 50px;
    margin-bottom: 30px;
    width: 100%;
  }
  .main-container {
    margin-top: 0;
  }
}
@media screen and (min-width: 992px) {
  .cta {
    margin-top: 80px;
    margin-bottom: 10px;
    width: 80%;
  }
  .main-container {
    margin-top: 0;
  }
}

@media screen and (min-width: 800px) and (max-width: 991px) {
  .dropdown-container {
    margin-top: 40px;
  }
  .cta {
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;
  }
  .main-container {
    margin-top: 0;
  }
}
</style>
