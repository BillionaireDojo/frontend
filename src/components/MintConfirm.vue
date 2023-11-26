<template>
  <div class="background-view">
    <div class="mint-confirm-container"></div>
  </div>
</template>

<script>
export default {
  name: "MintConfirm",
};
</script>

<style scoped>
.background-view {
  position: absolute !important;
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

.mint-confirm-container {
  background-color: white;
  border-radius: 20px;
  width: 400px;
  height: 200px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.7);
  padding: 20px; 
}
</style>