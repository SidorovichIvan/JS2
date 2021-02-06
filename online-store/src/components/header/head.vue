<template>
  <header class="header container">
    <div class="header__right">
      <router-link to="/">
        <div class="logo">
          <img src="../../img/logo.png" alt="logo" class="logo__img" />
          <div class="logo__name">Bran<span>d</span></div>
        </div></router-link
      >
      <div class="search">
        <div class="search__browse">
          Browse&nbsp;&nbsp;<i class="fas fa-caret-down" id="1"></i>
        </div>
        <input
          v-model="searchLine"
          type="text"
          class="search__input"
          name="search"
          placeholder="Search for Item..."
        />
        <button class="search__button" @click="filteredGoods">
          <i class="fas fa-search" id="2"></i>
        </button>
      </div>
    </div>
    <div class="header__left">
      <div class="cart">
        <router-link to="/cart"
          ><img src="../../img/cart.png" alt="cart"
        /></router-link>
      </div>
      <a href="#" id="size__batton--myAccount" class="link__header">
        <div class="my-account">
          My Account<i class="fas fa-caret-down"></i>
        </div>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchLine: "",
    };
  },
  methods: {
    filteredGoods() {
      this.$emit("search", this.searchLine);
    },
  },
};
</script>
