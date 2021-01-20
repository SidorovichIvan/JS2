Vue.component('search', {
    template: `
    <div>
        <input type="text" v-model="searchLine"/>
        <span @click="filteredGoods">Искать</span>
    </div>
  `,
    data() {
        return {
            searchLine: ''
        }
    },
    methods: {
        filteredGoods() {
            this.$emit('search', this.searchLine);
        }
    }
});

Vue.component('catalog', {
    template: ` <div class="goods" >
    <p v-if="filteredGoods==0">Товар не найден</p>
    <catalog-item v-for="(item, id) in filteredGoods" :name="item.product_name" :id="id" :price="item.price" :goodsItem="goods" :filteredGoodsARRItem="filteredGoodsARR" :cartItem="cart"></catalog-item>
    </div>`,
    props: ['filter', 'cart'],
    data() {
        return {
            goods: [],
            filteredGoodsARR: []
        }
    },
    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.filter, 'i');
            console.log('приняли регексп');
            return this.filteredGoodsARR = this.goods.filter(res => regexp.test(res.product_name))
        }
    },
    mounted() {
        fetch(
            'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        ).then(res => res.json()).then(res => {
            this.goods = [...res, ...res];
            this.filteredGoodsARR = [...res, ...res];
            console.log(this.filteredGoodsARR);
        });
    }
});

Vue.component('catalog-item', {
    template: ` <div class="goods-list">
    <h3>{{name}}</h3>
    <p>{{price}}</p>
    <button   @click="() => addCart(id)">Добавить</button>
    </div>`,
    props: ['name', 'price', 'id', 'filteredGoodsARRItem', 'goodsItem', 'cartItem'],
    methods: {
        addCart(id) {
            this.cartItem.push(this.filteredGoodsARRItem[id]);
            console.log(this.cartItem);
        }
    },
})

Vue.component('cart', {
    template: ` <div class="cart"  >
    <h2>Корзина</h2>
    <p v-if="cart.length ==0">Корзина пуста</p>
    <cartDiv v-for="(item, id) in cartArr" :cart="cart" :name="item.product_name" :price="item.price" :id="id"></cartDiv>
    <p v-if="cart.length !=0">В корзине {{cartGoods}} товаров на сумму {{sumCart}} </p>
</div>`,
    props: ['cart'],
    computed: {
        sumCart() {
            return this.cart.reduce((total, item) => total + item.price, 0)
        },
        cartGoods() {
            return this.cart.length
        },
        cartArr() {
            return this.cart
        }
    }
})

Vue.component('cartDiv', {
    template: `<div>
    <h3>{{name}}</h3>
    <p>{{price}}</p>
    <button type="button" @click="() => deleteCart(id)">Убрать из корзины</button>
    <hr>
</div>`,
    props: ['cart', 'name', 'price', 'id'],
    methods: {
        deleteCart(id) {
            this.cart.splice(id, 1)
        }
    }
})

const app = new Vue({
    el: '#app',
    data: {
        cart: [],
        searchLine: ''
    },
    methods: {
        filteredGoodsMain(searchLine) {
            this.searchLine = searchLine;
        }
    }
});