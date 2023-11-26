<template>
  <div class="card-container">
    <div class="img-container">
      <img :src="getResource(img)" class="img-fluid" alt="" />
    </div>
    <div class="details-container">
      <img
        v-if="title == 'Maniac'"
        class="title-img"
        :src="getResource(`${title}-title.svg`)"
        alt=""
      />
      <h2 v-if="title != 'Maniac'" class="title-text" :style="getTitleStyle()">
        {{ title }}
      </h2>
      <div class="divider-line"></div>
      <p :style="getDescriptionStyle()" class="description">
        {{ description }}
      </p>
      <button class="select-btn" @click="handleSelect">
        <img
          class="select-title"
          src="../assets/levels/select-title.svg"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LevelCard",
  props: {
    id: Number,
    img: String,
    title: String,
    description: String,
  },
  methods: {
    handleSelect() {
      this.$emit("select-clicked", this.id);
    },
    getResource(resource) {
      return require(`../assets/levels/${resource}`);
    },
    getTitleStyle() {
      if (this.title == "Normal") {
        return {
          color: "#F20707",
          fontFamily: "Bangers",
          fontSize: "40px",
        };
      } else {
        return {
          color: "pink",
          fontFamily: "Ephesis",
          fontSize: "50px",
        };
      }
    },
    getDescriptionStyle() {
      if (this.title == "Maniac") {
        return {
          color: "#F20707",
          fontFamily: "Bangers",
        };
      } else if (this.title == "Normal") {
        return {
          color: "#F20707",
          fontFamily: "Squada One",
        }
      } else {
        return {
          color: "pink",
          fontFamily: "Ephesis",
          fontSize: "30px",
          lineHeight: "95%",
        };
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
}
.img-container {
  text-align: center;
}
.img-fluid {
  width: 30%;
}
.details-container {
  text-align: center;
  width: 50%;
  margin: auto;
}
.title-img {
  width: 20%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.title-text {
  margin-top: 20px;
}
.divider-line {
  background-color: #f20707;
  height: 4px;
  width: 20%;
  margin: auto;
  margin-bottom: 15px;
}
.description {
  font-family: "Bangers", sans-serif;
  font-size: 23px;
  color: #f20707;
  padding-left: 15px;
  padding-right: 15px;
}
.select-btn {
  background-color: #2e003a;
  border-radius: 8px;
  border: 0;
  width: 35%;
  height: 10%;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.select-title {
  padding-top: 10px;
  padding-bottom: 10px;
  width: 33%;
}

@media screen and (max-width: 449px) {
  .img-fluid {
    width: 90%;
  }
  .select-title {
    width: 50%;
  }
  .title-img {
    width: 35%;
  }
  .details-container {
    width: 100%;
  }
  .description {
    font-size: 20px;
  }
  .select-btn {
    width: 45%;
  }
}
/* large */
@media screen and (min-width: 450px) and (max-width: 576px) {
  .img-fluid {
    width: 80%;
  }
  .select-title {
    width: 35%;
  }
  .title-img {
    width: 35%;
  }
  .details-container {
    width: 100%;
  }
  .description {
    font-size: 20px;
  }
  .select-btn {
    width: 45%;
  }
}

/* large */
@media screen and (min-width: 577px) and (max-width: 768px) {
  .img-fluid {
    width: 60%;
  }
  .select-title {
    width: 30%;
  }
  .title-img {
    width: 30%;
  }
  .details-container {
    width: 90%;
  }
  .description {
    font-size: 20px;
  }
  .select-btn {
    width: 45%;
  }
}

/* large */
@media screen and (min-width: 769px) and (max-width: 991px) {
  .img-fluid {
    width: 50%;
  }

  .select-title {
    width: 38%;
  }
  .title-img {
    width: 38%;
  }
    .select-btn {
    width: 50%;
  }
}
/* large */
@media screen and (min-width: 992px) and (max-width: 1300px) {
  .img-fluid {
    width: 40%;
  }
  .select-title {
    width: 35%;
  }
  .title-img {
    width: 35%;
  }
}
</style>