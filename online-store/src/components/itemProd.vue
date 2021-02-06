<template>
  <div class="window">
    <div class="window-shadow">
      <div class="in-shadow" @click="() => addCart(id)">
        <img src="../img/Forma_1_copy.svg" alt="f1" />
        <p class="insh">&nbsp;Add to Cart</p>
      </div>
    </div>
    <div class="window-photo">
      <img :src="img_URl" alt="ph3" class="window-img" />
    </div>
    <div class="window-text">
      <h3 class="p-top">{{ name }}</h3>
      <p class="p-prise">$&nbsp; {{ price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "price", "img_URl", "goodsItem", "id"],
  methods: {
    addCart(id) {
      fetch("http://localhost:3000/addToCArt.", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.goodsItem[id]),
      });
    },
  },
};
</script>

<style lang="scss">
.window {
  position: relative;
  width: 263px;
  height: 364px;
  transition-duration: 0.2s;
  margin-bottom: 30px;
}

.window-text {
  display: flex;
  flex-direction: column;
  width: inherit;
  height: 83px;
  justify-content: space-around;
}

.window-shadow {
  position: absolute;
  opacity: 0;
  background-image: url(../img/Background.png);
  width: 261px;
  height: 280px;
  transition-duration: 0.3s;
}

.window:hover {
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
}

.window:hover .window-shadow {
  opacity: 1;
}

.p-top {
  font-family: Lato;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  margin-left: 15px;
}

.insh {
  color: #ffffff;
  font-family: Lato;
  font-size: 13px;
  cursor: pointer;
  font-weight: 700;
  margin-left: 8px;
}

.p-prise {
  color: $main-color;
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
  margin-left: 15px;
}

.window-img {
  height: inherit;
  object-fit: cover;
  object-position: top;
}

.window-photo {
  height: 280px;
}

.in-shadow {
  cursor: pointer;
  width: 123px;
  height: 39px;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 98px;
  margin-left: 70px;
  transition-duration: 0.2s;
  &:hover {
    background-color: darken($color: rgba(255, 255, 255, 0.5), $amount: 10);
  }
  &:active {
    background-color: lighten($color: rgba(255, 255, 255, 0.5), $amount: 10);
  }
}

.content-window-bottom-button {
  width: 212px;
  height: 48px;
  background-color: $main-color;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.4s;
  &:hover {
    background-color: darken($color: $main-color, $amount: 5);
  }
  &:active {
    background-color: lighten($color: $main-color, $amount: 5);
  }
}

.window-bottob-p {
  color: #ffffff;
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: 0.4px;
}

.content-window-bottom {
  margin-top: 58px;
}
</style>