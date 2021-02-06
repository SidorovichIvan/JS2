<template>
  <div class="cart__content--main--line--bottom">
    <div class="line--left-bottom">
      <img :src="img_URl" alt="l43" />
      <div class="line--left-bottom-text">
        <h3>{{ name }}</h3>
        <p>Color: <span>Red</span> <br />Size: <span> Xll</span></p>
      </div>
    </div>
    <div class="line-right--main">
      <div class="line--rigth-bottom" id="size5">
        <p>{{ price }}</p>
      </div>
      <div class="line--rigth-bottom" id="size4">
        <input type="number" class="input__cart" placeholder="1" />
      </div>
      <div class="line--rigth-bottom" id="size3">
        <p>FREE</p>
      </div>
      <div class="line--rigth-bottom" id="size2">
        <p>$300</p>
      </div>
      <div class="line--rigth-bottom" id="size1" v-on:click="deleteCart(id)">
        <i class="fas fa-times-circle"></i>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: ["name", "price", "img_URl", "id", "byeGood"],
  methods: {
    deleteCart(id) {
      fetch("http://localhost:3000/deleteCart.", {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(this.byeGood[id]),
      }).then(() => this.$emit("startRender"));
    },
  },
  computed: {
    total() {
      return this.byeGood.reduce((total, item) => total + item.price, 0);
    },
  },
};
</script>