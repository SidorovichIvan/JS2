<template>
  <div class="content__product container">
    <div class="menu__product">
      <navGood />
      <navGood />
      <navGood />
    </div>

    <div class="products">
      <div class="products__top">
        <div class="products__top__form__left">
          <h3>Trending now</h3>

          <div>
            <a href="#">Bohemian</a>
            <span>|</span>
            <a href="#">Floral</a>
            <span>|</span>
            <a href="#"> Lace</a>
            <a href="#">Floral</a>
            <span>|</span>
            <a href="#">Lace</a>
            <span>|</span>
            <a href="#">Bohemian</a>
          </div>
        </div>
        <div class="products__top__form__center">
          <h3>Size</h3>
          <div>
            <input type="checkbox" name="Size" id="SizeXXL" />
            <label for="SizeXXL">xxl</label>
            <input type="checkbox" name="Size" id="SizeXL" />
            <label for="SizeXL">xl</label>
            <input type="checkbox" name="Size" id="SizeL" />
            <label for="SizeL">l</label>
            <input type="checkbox" name="Size" id="SizeM" />
            <label for="SizeM">m</label>
            <input type="checkbox" name="Size" id="SizeS" />
            <label for="SizeS">s</label>
            <input type="checkbox" name="Size" id="SizeXS" />
            <label for="SizeXS">xs</label>
            <input type="checkbox" name="Size" id="SizeXXS" />
            <label for="SizeXXS">xxs</label>
          </div>
        </div>

        <div class="products__top__form__right">
          <h3>pRICE</h3>
          <div id="range" class="range">
            <div id="range__between" class="range__between"></div>
            <button id="range__button_1" class="range__button_1"></button>
            <button id="range__button_2" class="range__button_2"></button>
            <div class="input__range">
              <div>
                <p>$</p>
                <input
                  id="range_inpt1"
                  class="range_inpt1"
                  type="number"
                  min="0"
                  max="700"
                />
              </div>
              <div>
                <p>$</p>
                <input
                  id="range_inpt2"
                  class="range_inpt2"
                  type="number"
                  min="0"
                  max="700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="products__window__top">
        <div class="products__window__top__select__left">
          <div>
            <p>Sort By</p>
          </div>
          <select name="products__left__left" id="left">
            <option value="">name</option>
            <option value="">name1</option>
            <option value="">name2</option>
            <option value="">name3</option>
          </select>
          <img src="../../img/trrr.png" alt="" class="img__selct" />
        </div>
        <div class="products__window__top__select__right">
          <div>
            <p>Show</p>
          </div>
          <select name="products__left__right" id="right">
            <option value="">09</option>
            <option value="">02</option>
            <option value="">03</option>
            <option value="">01</option>
          </select>
          <img src="../../img/trrr.png" alt="" class="img__selct" />
        </div>
      </div>

      <div
        class="products__window"
        v-bind:class="{ center: loading || !filteredGoods.length }"
      >
        <load v-if="loading" />
        <itemGood
          v-else-if="filteredGoods.length"
          v-for="(item, id) in filteredGoods"
          :name="item.name"
          :price="item.price"
          :img_URl="item.img_URl"
          :goodsItem="filteredGoods"
          :id="id"
        />
        <p v-else>Ничего не найдено</p>
      </div>
      <div class="products__bottom">
        <div class="listing">
          <a href="#"><i class="fas fa-angle-left"></i></a>
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6.....20</a>
          <a href="#"><i class="fas fa-angle-right"></i></a>
        </div>
        <a href="#">
          <div class="products__bottom__button">
            <p>View All</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import itemGood from "../itemProd.vue";
import navGood from "./nav.vue";
import load from "../loader.vue";

export default {
  components: {
    itemGood,
    navGood,
    load,
  },
  props: ["filter"],
  data() {
    return {
      goods: [],
      loading: true,
    };
  },
  mounted() {
    this.render(),
      init2slider(
        "range",
        "range__between",
        "range__button_1",
        "range__button_2",
        "range_inpt1",
        "range_inpt2"
      );
  },
  methods: {
    render() {
      fetch("http://localhost:3000/data.")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            this.goods = res;
            this.loading = false;
          }, 1200);
        });
    },
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.filter, "i");
      return (this.filteredGoodsARR = this.goods.filter((res) =>
        regexp.test(res.name)
      ));
    },
  },
};

function init2slider(id, bt, bt1, bt2, input1, input2) {
  let slider = document.getElementById(id);
  let between = document.getElementById(bt);
  let button1 = document.getElementById(bt1);
  let button2 = document.getElementById(bt2);
  let inpt1 = document.getElementById(input1);
  let inpt2 = document.getElementById(input2);

  let min = inpt1.min;
  let max = inpt1.max;

  button1.style.marginLeft = "20px";
  button2.style.marginLeft = slider.offsetWidth - button1.offsetWidth + "px";
  between.style.width = slider.offsetWidth - (button1.offsetWidth + 20) + "px";
  between.style.marginLeft = 20 + "px";
  inpt1.value = 56;
  inpt2.value = max;

  inpt1.onchange = function () {
    if (parseInt(inpt1.value) < min) inpt1.value = min;
    if (parseInt(inpt1.value) > max) inpt1.value = max;
    if (parseInt(inpt1.value) > parseInt(inpt2.value)) {
      var temp = inpt1.value;
      inpt1.value = inpt2.value;
      inpt2.value = temp;
    }

    let per1 = (parseInt(inpt1.value - min) * 100) / (max - min);
    let per2 = (parseInt(inpt2.value - min) * 100) / (max - min);
    let left1 = (per1 * (slider.offsetWidth - button1.offsetWidth)) / 100;
    let left2 = (per2 * (slider.offsetWidth - button1.offsetWidth)) / 100;

    button1.style.marginLeft = left1 + "px";
    button2.style.marginLeft = left2 + "px";

    if (left1 > left2) {
      between.style.width = left1 - left2 + "px";
      between.style.marginLeft = left2 + "px";
    } else {
      between.style.width = left2 - left1 + "px";
      between.style.marginLeft = left1 + "px";
    }
  };
  inpt2.onchange = function () {
    if (parseInt(inpt2.value) < min) inpt2.value = min;
    if (parseInt(inpt2.value) > max) inpt2.value = max;
    if (parseInt(inpt1.value) > parseInt(inpt2.value)) {
      var temp = inpt1.value;
      inpt1.value = inpt2.value;
      inpt2.value = temp;
    }

    let per1 = (parseInt(inpt1.value - min) * 100) / (max - min);
    let per2 = (parseInt(inpt2.value - min) * 100) / (max - min);
    let left1 = (per1 * (slider.offsetWidth - button1.offsetWidth)) / 100;
    let left2 = (per2 * (slider.offsetWidth - button1.offsetWidth)) / 100;

    button1.style.marginLeft = left1 + "px";
    button2.style.marginLeft = left2 + "px";

    if (left1 > left2) {
      between.style.width = left1 - left2 + "px";
      between.style.marginLeft = left2 + "px";
    } else {
      between.style.width = left2 - left1 + "px";
      between.style.marginLeft = left1 + "px";
    }
  };

  /*mouse*/
  button1.onmousedown = function (evt) {
    let sliderCoords = getCoords(slider);
    let buttonCoords1 = getCoords(button1);
    let buttonCoords2 = getCoords(button2);
    let shiftX2 = evt.pageX - buttonCoords2.left;
    let shiftX1 = evt.pageX - buttonCoords1.left;

    document.onmousemove = function (evt) {
      let left1 = evt.pageX - shiftX1 - sliderCoords.left;
      let right1 = slider.offsetWidth - button1.offsetWidth;
      if (left1 < 0) left1 = 0;
      if (left1 > right1) left1 = right1;
      button1.style.marginLeft = left1 + "px";

      shiftX2 = evt.pageX - buttonCoords2.left;
      let left2 = evt.pageX - shiftX2 - sliderCoords.left;
      let right2 = slider.offsetWidth - button2.offsetWidth;
      if (left2 < 0) left2 = 0;
      if (left2 > right2) left2 = right2;

      let per_min = 0;
      let per_max = 0;
      if (left1 > left2) {
        between.style.width = left1 - left2 + "px";
        between.style.marginLeft = left2 + "px";

        per_min = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
      } else {
        between.style.width = left2 - left1 + "px";
        between.style.marginLeft = left1 + "px";

        per_min = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
      }
      inpt1.value = parseInt(min) + Math.round(((max - min) * per_min) / 100);
      inpt2.value = parseInt(min) + Math.round(((max - min) * per_max) / 100);
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  button2.onmousedown = function (evt) {
    let sliderCoords = getCoords(slider);
    let buttonCoords1 = getCoords(button1);
    let buttonCoords2 = getCoords(button2);
    let shiftX2 = evt.pageX - buttonCoords2.left;
    let shiftX1 = evt.pageX - buttonCoords1.left;

    document.onmousemove = function (evt) {
      let left2 = evt.pageX - shiftX2 - sliderCoords.left;
      let right2 = slider.offsetWidth - button2.offsetWidth;
      if (left2 < 0) left2 = 0;
      if (left2 > right2) left2 = right2;
      button2.style.marginLeft = left2 + "px";

      shiftX1 = evt.pageX - buttonCoords1.left;
      let left1 = evt.pageX - shiftX1 - sliderCoords.left;
      let right1 = slider.offsetWidth - button1.offsetWidth;
      if (left1 < 0) left1 = 0;
      if (left1 > right1) left1 = right1;

      let per_min = 0;
      let per_max = 0;

      if (left1 > left2) {
        between.style.width = left1 - left2 + "px";
        between.style.marginLeft = left2 + "px";
        per_min = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
      } else {
        between.style.width = left2 - left1 + "px";
        between.style.marginLeft = left1 + "px";
        per_min = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
      }
      inpt1.value = parseInt(min) + Math.round(((max - min) * per_min) / 100);
      inpt2.value = parseInt(min) + Math.round(((max - min) * per_max) / 100);
    };
    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };
    return false;
  };

  button1.ondragstart = function () {
    return false;
  };
  button2.ondragstart = function () {
    return false;
  };

  function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
}
</script>

<style  scoped>
.center {
  justify-content: center;
}
</style>


<style lang="sass">
.content__product
  display: flex
  justify-content: space-between

.products
  max-width: 825px
  margin-top: 71px
  &__bottom
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 43px
    .listing
      display: flex
      justify-content: space-around
      align-items: center
      width: 261px
      height: 44px
      border-radius: 3px
      border: 1px solid #ebebeb
      background-color: #ffffff
      a
        color: #c4c4c4
        font-family: Lato
        font-size: 16px
        line-height: 26px
        transition-duration: 0.2s
        &:hover
          color: $main-color
        &:active
          color: lighten($color: $main-color , $amount: 15)

    a

      .products__bottom__button
        display: flex
        justify-content: center
        align-items: center
        width: 150px
        height: 44px
        border-radius: 3px
        border: 1px solid #ef5b70
        background-color: #ffffff
        transition-duration: 0.3s
        &:hover
          background-color: darken($color: #ffffff, $amount: 3)
          border: 1px solid lighten($color: #ef5b70, $amount: 10)
        &:active
          background-color: darken($color: #ffffff, $amount: 1)
          border: 1px solid lighten($color: #ef5b70, $amount: 10)

        p
          color: #ef5b70
          font-family: Lato
          font-size: 16px
          font-weight: bold
          line-height: 26px

.products__window
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  align-content: space-between
  min-height: 1166px
  min-height: 300px

.products__window__top
  width: 100%
  height: 50px
  background-color: #f3f3f3
  display: flex
  justify-content: flex-start
  align-items: center
  margin-bottom: 48px
  margin-top: 41px

  &__select__right
    display: flex
    align-items: center
    justify-content: space-between
    width: 119px
    height: 30px
    border: 1px solid #ebebeb
    background-color: #ffffff
    margin-left: 10px
    position: relative
    select
      width: 63px
      height: 100%
      border: none
      color: #6f6e6e
      font-family: Lato
      font-size: 14px
      font-weight: 400
      line-height: 26px
      padding-left: 11px
      position: relative
      z-index: 1
      opacity: 0.6
      option
        color: #6f6e6e
        font-family: Lato
        font-size: 14px
        font-weight: 400
        line-height: 26px

    div
      height: 100%
      width: 55px
      display: flex
      align-items: center
      justify-content: center
      border-right: 1px solid #ebebeb
      p
        color: #6f6e6e
        font-family: Lato
        font-size: 14px
        font-weight: 400
        line-height: 26px

  &__select__left
    display: flex
    align-items: center
    justify-content: space-between
    width: 153px
    height: 30px
    border: 1px solid #ebebeb
    background-color: #ffffff
    margin-left: 9px
    position: relative

    select
      width: 86px
      height: 100%
      border: none
      color: #6f6e6e
      font-family: Lato
      font-size: 14px
      font-weight: 400
      line-height: 26px
      padding-left: 11px
      position: relative
      z-index: 1
      opacity: 0.6

      option
        color: #6f6e6e
        font-family: Lato
        font-size: 14px
        font-weight: 400
        line-height: 26px

    div
      height: 100%
      width: 66px
      display: flex
      align-items: center
      justify-content: center
      border-right: 1px solid #ebebeb
      p
        color: #6f6e6e
        font-family: Lato
        font-size: 14px
        font-weight: 400
        line-height: 26px

.img__selct
  position: absolute
  z-index: 0
  right: 9px

.products__top
  display: flex
  justify-content: space-between
  align-items: center
  min-width: 825px

  &__form__center
    display: flex
    flex-direction: column
    h3
      color: #6f6e6e
      font-family: Lato
      font-size: 14px
      font-weight: 700
      line-height: 20px
      text-transform: uppercase

    div
      margin-top: 25px
      width: 257px
      display: flex
      flex-wrap: wrap
      display: flex
      align-items: center
      color: #6f6e6e
      font-family: "Open Sans"
      font-size: 14px
      font-weight: 400
      line-height: 20px
      text-transform: uppercase

      input[type="checkbox"]

        margin-right: 9px

      label
        margin-right: 23px
        display: flex
        align-items: center

      label:before
        content: ""
        display: inline-block
        width: 13px
        height: 13px
        border: 1px solid #ebebeb
        background-color: #ffffff
        transition-duration: 0.2s
        margin-right: 9px

      input[type="checkbox"]:checked + label:before
        content: ""
        display: inline-block
        width: 13px
        height: 13px
        border: 1px solid #ebebeb
        background-color: #ffffff
        background-image: url(../../img/klipartz.com.png)
        background-size: 90%
        background-position: center

  &__form__left
    display: flex
    flex-direction: column
    h3
      color: #6f6e6e
      font-family: Lato
      font-size: 14px
      font-weight: 700
      line-height: 20px
      text-transform: uppercase

    div
      margin-top: 25px
      width: 201px
      display: flex
      flex-wrap: wrap
      a
        transition-duration: 0.2s
        &:hover
          color: $main-color
        &:active
          color: lighten($color: $main-color , $amount: 15)

      span
        margin-left: 13px
        margin-right: 13px

input[type='number']
  -moz-appearance: textfield

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none

.products__top__form__right
  height: 85px

  h3
    color: #6f6e6e
    font-family: Lato
    font-size: 14px
    font-weight: 700
    line-height: 20px
    text-transform: uppercase

  .range
    width: 262px
    margin-top: 24px
    width: 262px
    height: 6px
    border-radius: 3px
    background-color: #f0f0f0
    display: flex
    flex-direction: column

    .input__range
      display: flex
      justify-content: space-between
      margin-top: 21px

      div
        display: flex

    .range__between
      height: 6px
      background-color: #f16d7f
      border: none
      position: absolute

    .range__button_1, .range__button_2
      width: 14px
      height: 14px
      background-color: #f16d7f
      position: absolute
      cursor: pointer
      transform: translateY(-50%)
      border: none
      border-radius: 50%
      margin-top: 3px

    .range__button_1
      margin-left: 28px

    .range_inpt1, .range_inpt2
      width: 30px
      border: none
      color: #6f6e6e
      font-family: "Open Sans"
      font-size: 14px
      font-weight: 400
      line-height: 26px

    p
      margin-right: 3px
      color: #6f6e6e
      font-family: "Open Sans"
      font-size: 14px
      font-weight: 400
      line-height: 26px

  .abs__product
    margin-top: 24px
    width: 262px
    height: 6px
    border-radius: 3px
    background-color: #f0f0f0
    position: relative
    div:nth-child(2)
      position: absolute
      width: 124px
      height: 6px
      background-color: #f16d7f
      left: 31px
      bottom: 0px
    div:not(:nth-child(2))
      position: absolute
      width: 14px
      height: 14px
      border-radius: 50%
      background-color: #f16d7f
      bottom: -4px
    div:first-child
      left: 23px

    div:last-child
      left: 147px

.menu__product_animation
  margin-left: 35px
  background-color: #ffffff
  height: 0px
  display: flex
  position: relative
  transition-duration: 0.5s
  transition-duration: 0.5s
  overflow: hidden
  ul
    li
      list-style-type: none

      a
        color: #6f6e6e
        font-family: Lato
        font-size: 14px
        font-weight: 400
        line-height: 33px
        &:hover
          color: lighten($color: #6f6e6e, $amount: 20)

        &:active
          color: lighten($color: #6f6e6e, $amount: 5)

.checkbox__product
  display: flex
  justify-content: space-between
  align-items: center
  margin-top: 18px
  width: 243px
  height: 37px
  cursor: pointer
  border-bottom: 1px solid #ebebeb
  border-left: 5px solid #ef5b70

  .p__i
    color: #6f6e6e
    font-size: 14px
    font-weight: 700
    line-height: 20px
    text-transform: uppercase

  h3
    color: #6f6e6e
    font-family: Lato
    font-size: 14px
    font-weight: 700
    line-height: 20px
    text-transform: uppercase
    margin-left: 11px

label[for="product"]
  position: relative

.menu__product
  margin-top: 59px
</style>