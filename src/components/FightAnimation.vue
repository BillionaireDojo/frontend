<template>
  <div class="anim-container">
    <img
      ref="myDiv"
      class="div-animate"
      :style="{ transform: scaleValue }"
      src="../assets/fight/bg.png"
      alt=""
    />
    <img
      :class="isFight ? 'left-animate-fight' : 'left-animate'"
      ref="left"
      :style="{
        transform: isFight
          ? `translateX(${translateValueLeft}px)`
          : `translateY(${translateValueY}px)`,
        width: isFight ? 'initial' : '60%',
        marginLeft: isFight ? '0' : '400px',
      }"
      :src="getFighter()"
      @click="hideEnter"
      alt=""
    />
    <img
      class="right-animate"
      ref="right"
      :style="{ transform: `translateX(${translateValueRight}px)` }"
      :src="getOpponent()"
      alt=""
    />
    <h1 :style="{ transform: scaleValue }" ref="fightingTitle">
      The giants are fighting...
    </h1>
    <div class="winner-view" :style="{display: 'none'}" @click="hideWinnerView" ref="winnerView">
      <div class="winner-view-inner-container">
        <img class="joe" src="../assets/joe.png" alt="" />
        <h2 ref="winnerTitle" class="winner-title">
          Team {{ winner }} wins this round!
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scaleValue: "scale(0)",
      translateValueLeft: -1000,
      translateValueRight: 1000,
      translateValueY: 1000,
      winner: "",
    };
  },
  props: {
    isFight: Boolean,
    fighter: String,
    opponent: String,
  },
  methods: {
    getFighter() {
      if (this.fighter == undefined) return;
      if (this.isFight) {
        return require(`../assets/fight/${this.fighter}-left.png`);
      } else {
        return require(`../assets/fight/${this.fighter}-scream.png`);
      }
    },
    getOpponent() {
      if (this.fighter == undefined) return;
      return require(`../assets/fight/${this.opponent}-right.png`);
    },
    animateDiv() {
      const div = this.$refs.myDiv;
      div.style.transform = "scale(1.5)";

      setTimeout(() => {
        div.style.transition = "transform 0.1s ease-in-out";
        div.style.transform = "scale(1)";
      }, 1000);

      setTimeout(() => {
        this.animateFighters();
      }, 500);
    },

    animateFighters() {
      if (this.isFight == false) {
        const div = this.$refs.left;

        div.style.transition = "transform 0.5s ease-in-out";
        div.style.transform = "translateY(0)";
        setTimeout(() => {
          this.$emit("stop-animating");
        }, 10000);
      } else {
        const div = this.$refs.left;
        div.style.transition = "transform 0.5s ease-in-out";
        div.style.transform = "translateX(0)";

        const div2 = this.$refs.right;
        div2.style.transition = "transform 0.5s ease-in-out";
        div2.style.transform = "translateX(0)";
      }
    },

    animateWinner(winner) {
      this.winner = winner;
      const winnerDiv = this.$refs.winnerView;
      winnerDiv.style.display ='flex';

      setTimeout(() => {
        this.$emit("stop-animating");
      }, 10000);
    },

    animateFighting() {
      const div = this.$refs.fightingTitle;
      div.style.transform = "scale(1.5)";

      setTimeout(() => {
        div.style.transition = "transform 0.1s ease-in-out";
        div.style.transform = "scale(1)";
      }, 1500);
    },
    hideWinnerView() {
      this.$emit("stop-animating");
    },
    hideEnter() {
      if (this.isFight == false) {
        this.$emit("stop-animating");
      }
    }
  },
};
</script>

<style scoped>
@keyframes slideInFromBottom {
  from {
    transform: translateY(100%); /* Start offscreen below */
  }
  to {
    transform: translateY(0); /* End at its normal position */
  }
}

h1 {
  font-family: "Bangers", sans-serif;
  font-size: 50px;
  color: black !important;
  background-color: white;
  text-align: center;
  position: absolute;
  top: 70%;
  transform: translate(-40%, -70%);
}
.div-animate {
  transition: transform 0.8s ease-in-out;
}
.anim-btn {
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
}
.left-animate {
  position: absolute;
  top: 0;
  left: 0;
}
.left-animate-fight {
  position: absolute;
  top: 0;
  left: 0;
}
.right-animate {
  position: absolute;
  top: 0;
  right: 0;
}
.anim-container {
  position: fixed !important;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.winner-view {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  display: flex;
  transform: translateY(100%);
  animation: slideInFromBottom 0.7s ease-in-out forwards;
}

.winner-view-inner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content; /* Width of container adjusts to the child */
  height: fit-content;
  position: relative;
}

.joe {
  width: 600px;
}

.winner-title {
  font-family: "Bangers", sans-serif;
  font-size: 40px;
  text-align: center;
  color: black !important;
  position: absolute;
  top: 15%;
  left: 13%;
  max-width: 250px;
}

@media screen and (max-width: 576px) {
  .div-animate {
    width: 100%;
    height: 110%;
  }
  .left-animate {
    margin-left: 0 !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 100% !important;
    height: 70% !important;
  }
  .left-animate-fight {
    margin-left: 0 !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 80% !important;
    height: 80%;
  }
  .right-animate {
    margin-right: 0 !important;
    bottom: 0;
    right: 0;
    top: auto;
    width: 80% !important;
    height: 80%;
  }
  h1 {
    font-size: 40px;
  }
}

@media screen and (max-width: 477px) {
  .joe {
    width: 400px;
  }

  .winner-title {
    font-size: 25px;
    top: 15%;
    left: 7%;
    max-width: 200px;
  }
}

@media screen and (min-width: 478px) and (max-width: 576px) {
  .joe {
    width: 500px;
  }

  .winner-title {
    font-size: 32px;
    top: 15%;
    left: 8%;
    max-width: 250px;
  }
}
@media screen and (min-width: 577px) and (max-width: 767px) {
  .div-animate {
    width: 100%;
    height: 110%;
  }
  .left-animate {
    margin-left: 0 !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 100% !important;
  }

  .left-animate-fight {
    margin-left: 0 !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 80% !important;
    height: 80%;
  }
  .right-animate {
    margin-right: 0 !important;
    bottom: 0;
    right: 0;
    top: auto;
    width: 80% !important;
    height: 80%;
  }

  .joe {
    width: 500px;
  }

  .winner-title {
    font-size: 32px;
    top: 15%;
    left: 8%;
    max-width: 250px;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
  .div-animate {
    width: 100%;
    height: 110%;
  }
  .left-animate {
    margin-left: 50px !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 85% !important;
  }
  .left-animate-fight {
    margin-left: 0 !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 80% !important;
    height: 80%;
  }
  .right-animate {
    margin-right: 0 !important;
    bottom: 0;
    right: 0;
    top: auto;
    width: 80% !important;
    height: 80%;
  }

  .joe {
    width: 550px;
  }

  .winner-title {
    font-size: 35px;
    top: 15%;
    left: 10%;
    max-width: 250px;
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .left-animate {
    margin-left: 180px !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 70% !important;
  }
  .left-animate-fight {
    margin-left: 0 !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 80% !important;
    height: 80%;
  }
  .right-animate {
    margin-right: 0 !important;
    bottom: 0;
    right: 0;
    top: auto;
    width: 80% !important;
    height: 80%;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1400px) {
  .left-animate {
    margin-left: 240px !important;
    bottom: 0;
    left: 0;
    top: auto;
    width: 60% !important;
  }
}
@media screen and (min-width: 1401px) and (max-width: 1430px) {
  .left-animate {
    bottom: 0;
    top: auto;
  }
}
</style>
