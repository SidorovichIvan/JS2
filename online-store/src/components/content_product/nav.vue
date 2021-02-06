<template>
  <div
    class="menu-item2"
   
  >
    <div class="checkbox__product"  v-on:click="chenge">
      <h3>Category</h3>
      <p class="p__i"><i class="fas fa-sort-down"></i></p>
    </div>
    <div class="menu__product_animation" id="visible"  v-bind:class="{ done: invisible }">
      <ul>
        <li><a href="#">Accessories</a></li>
        <li><a href="#">Bags</a></li>
        <li><a href="#">Denim</a></li>
        <li><a href="#">Hoodies & Sweatshirts</a></li>
        <li><a href="#">Jackets & Coats</a></li>
        <li><a href="#">Pants</a></li>
        <li><a href="#">Polos</a></li>
        <li><a href="#">Shirts</a></li>
        <li><a href="#">Shoes</a></li>
        <li><a href="#">Shorts</a></li>
        <li><a href="#">Sweaters & Knits</a></li>
        <li><a href="#">T-Shirts</a></li>
        <li><a href="#">Tanks</a></li>
      </ul> 
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      invisible: false,
    };
  },
  methods: {
    chenge() {
      this.invisible = !this.invisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.done {
  transition-duration: 0.5s;
  height: 455px;
  overflow: hidden;
}
</style>