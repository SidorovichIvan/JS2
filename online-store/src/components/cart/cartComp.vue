<template>
  <div class="cart__content container">
    <div class="cart__content--main--line--top">
      <div class="line--left">
        <h3>Product Details</h3>
      </div>
      <div class="line-right--main">
        <div class="line--rigth" id="size5">
          <h3>unite Price</h3>
        </div>
        <div class="line--rigth" id="size4">
          <h3>Quantity</h3>
        </div>
        <div class="line--rigth" id="size3">
          <h3>shipping</h3>
        </div>
        <div class="line--rigth" id="size2">
          <h3>Subtotal</h3>
        </div>
        <div class="line--rigth" id="size1">
          <h3>ACTION</h3>
        </div>
      </div>
    </div>

    <div class="cart-is-empty">
      <p>Корзина пуста</p>
    </div>

    <div class="cart__content--main">
      <cartGoods
        v-for="(item, id) in byeGood"
        v-bind:name="item.name"
        v-bind:price="item.price"
        v-bind:img_URl="item.img_URl"
        :byeGood="byeGood"
        :id="id"
        v-on:startRender="render"
      />
      <p class="massage" v-if="byeGood.length == 0">Корзина пуста</p>
    </div>
    <div class="cart-button">
      <div v-on:click="testI">
        <div class="cart-button-left" v-on:click="deleteCartAll">
          <p>cLEAR SHOPPING CART</p>
        </div>
      </div>
      <router-link to="/">
        <div class="cart-button-right">
          <p>cONTINUE sHOPPING</p>
        </div>
      </router-link>
    </div>

    <div class="cart__content--form">
      <div class="input__left">
        <h2>Shipping Adress</h2>
        <form action="" class="ff">
          <select
            name=""
            id="select1"
            placeholder="Bangladesh"
            class="input__cart--form"
          >
            <option>Bangladesh</option>
            <option>2</option>
            <option>3</option>
          </select>
          <input class="input__cart--form" type="text" placeholder="State" />
          <input
            class="input__cart--form"
            type="text"
            placeholder="Postcode / Zip"
          />
          <a href="#">
            <div class="button__input--cart">
              <p>get a quote</p>
            </div>
          </a>
        </form>
      </div>
      <div class="input__center">
        <h3>coupon discount</h3>
        <p>Enter yo ur coupon code if you have one</p>
        <form action="#">
          <input type="text" class="input__cart--form" placeholder="State" />
          <a href="#">
            <div class="button__input--center">
              <p>Apply coupon</p>
            </div>
          </a>
        </form>
      </div>
      <div class="input__right">
        <div class="input__right--top">
          <p>
            Sub total &nbsp;&nbsp;&nbsp;
            <span v-if="total !== 0">$&nbsp;{{ total }}</span>
            <span v-else>$&nbsp;0</span>
          </p>
          <h3>
            GRAND TOTAL&nbsp;&nbsp;&nbsp;
            <span id="span_Price" v-if="total !== 0">$&nbsp;{{ total }}</span>
            <span id="span_Price" v-else>$&nbsp;0</span>
          </h3>
        </div>
        <form action="#">
          <a href="#">
            <div class="input--right--button">
              <p>proceed to checkout</p>
            </div>
          </a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import cartGoods from "./cartGood";
export default {
  data() {
    return {
      byeGood: [],
    };
  },
  components: {
    cartGoods,
  },
  methods: {
    render() {
      fetch("http://localhost:3000/dataCart.")
        .then((res) => res.json())
        .then((res) => {
          this.byeGood = res;
        });
    },
    deleteCartAll() {
      fetch("http://localhost:3000/deleteCartAll.", {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(this.byeGood),
      }).then(() => {
        this.render();
      });
    },
  },
  mounted() {
    this.render();
  },
  computed: {
    total() {
      return this.byeGood.reduce((total, item) => total + item.price, 0);
    },
  },
};
</script>

<style lang="scss">
.massage {
  text-align: center;
  margin-top: 30px;
}
</style>