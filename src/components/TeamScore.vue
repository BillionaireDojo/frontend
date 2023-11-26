<template>
    <div class="team-score-container justify-content-around">
        <img class="img-fluid" :src="getResource(teamData.img)" alt="">
        <h2 :style="{textDecoration: teamData.score == 0 || (teamData.bal != undefined && teamData.bal == 0) ? 'line-through' : ''}" >{{rank+1}}. {{ teamData.title }} - <span class="score">{{ teamData.score }}</span></h2>
        <div :style="{display: 'flex'}">
        </div>
    </div>
</template>

<script>
export default {
    name: "TeamScore",
    props: {
        teamData: Object,
        isLeftDivider: Boolean,
        rank: Number,
    },
    async mounted() {


    },
    methods: {
        getResource(resource) {
            return require(`../assets/leaderboard/${resource}`)
        }
    }
}
</script>

<style scoped>
.team-score-container {
    display: flex;
    align-items: center;
    margin: auto;
}
.img-fluid {
    width: 13%;
}
h2 {
    font-family: 'Bangers', sans-serif;
    font-size: 35px;
    color: #04DAF6;
    height: fit-content;
    margin-left: 20px;
    text-align: left;
}
.score {
    color: #F20707;
}
@media screen and (max-width: 991px) {
    .img-fluid {
        width: 18%;
    }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
    .img-fluid {
        width: 17%;
    }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  h2 {
    font-size: 30px;
  }
}

@media screen and (min-width: 577px) and (max-width: 767px) {
  h2 {
    font-size: 25px;
  }
}

@media screen and (min-width: 427px) and (max-width: 576px) {
  h2 {
    font-size: 30px;
  }
}
@media screen and (max-width: 426px) {
  h2 {
    font-size: 25px;
  }
}
</style>