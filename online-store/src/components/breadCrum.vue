<template>
  <div class="breadcrumb">
    <div class="breadcrumb__content container">
      <div class="breadcrumb__content--left">
        <h2>New Arrivals</h2>
      </div>
      <div class="breadcrumb__content--right">
        <p>Home / Men /<span>New Arrivals</span></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.breadcrumb {
  height: 148px;
  background-color: #f8f3f4;
  display: flex;
}

.breadcrumb__content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb__content--left {
  color: #f16d7f;

  font-size: 24px;
  font-weight: 400;
  line-height: 20px;
  text-transform: uppercase;
}

.breadcrumb__content--right {
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: #636363;
  font-weight: 300;
}

.breadcrumb__content--right > p > span {
  color: #f16d7f;

  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-transform: uppercase;
}
</style>