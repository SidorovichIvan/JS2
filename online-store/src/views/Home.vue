<template>
  <div class="body">
     <headerComponent v-on:search="filteredGoods" />
    <breadcrum />
    <product v-bind:filter="searchLine" />
  </div>
</template>

<script>
import headerComponent from "../components/header/header.vue";
import itemProd from "../components/itemProd.vue";
import breadcrum from "../components/breadCrum.vue";
import product from "../components/content_product/product.vue";

export default {
  data() {
    return {
      searchLine: "",
    };
  },
  methods: {
    filteredGoods(searchLine) {
      this.searchLine = searchLine;
    },
  },
  name: "Home",
  components: {
    itemProd,
    breadcrum,
    product,
    headerComponent
  }
};
</script>
<style lang="sass">

</style>
