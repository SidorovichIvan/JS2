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
    props: ['goods'],
    methods: {
        filteredGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoodsARR = this.goods.filter(res => regexp.test(res.product_name))
            console.log(this.filteredGoodsARR.length);
        }
    }

});

Vue.component('catalog', {
    template: ` <div class="goods" >
    <p v-if="filteredGoodsARR==0">Товар не найден</p>
    <catalog-item v-bind:cart="cart" v-bind:filteredGoodsARR="filteredGoodsARR" v-for="(item, id) in filteredGoodsARR" :name="item.product_name" :id="id" :price="item.price"></catalog-item>
    </div>`,
    data() {
        return {
            goods: [],
            filteredGoodsARR: []
            
        }
    },
    props: ['cart'],

    mounted() {
        fetch(
            'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        ).then(res => res.json()).then(res => {
            this.goods = [...res, ...res];
            this.filteredGoodsARR = [...res, ...res]
        });
    }
});

Vue.component('catalog-item', {
    template: ` <div class="goods-list">
    <h3>{{name}}</h3>
    <p>{{price}}</p>
    <button   @click="() => addCart(id)">Добавить</button>
    </div>`,
    props: ['name', 'cart', 'price', 'id', 'filteredGoodsARR'],
    methods: {
        addCart(id) {
            this.cart.push(this.filteredGoodsARR[id]);
        }
    },
})

Vue.component('cart', {
    template: ` <div class="cart"  >
    <h2>Корзина</h2>
    <p v-if="cart.length ==0">Корзина пуста</p>
    <div v-for="({product_name, price}, id) in cart">
        <hr>
        <h3>{{product_name}}</h3>
        <p>{{price}}</p>
        <button type="button" @click="() => deleteCart(id)">Убрать из корзины</button>
        <hr>
    </div>
    <p v-if="cart.length !=0">В корзине {{cartGoods}} товаров на сумму {{sumCart}} </p>
</div>`,
    data(){
        return {
            cart: []
        }
    }

})

const app = new Vue({
    el: '#app',
    data: {
        cart: [],
    },
    /* computed: {
         sumCart() {
             return this.cart.reduce((total, item) => total + item.price, 0)
         },
         cartGoods() {
             return this.cart.length
         },
         deleteCart(id) {
             this.cart.splice(id, 1);
         }
     },*/

});