const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoodsARR: [],
        cart: [],
        searchLine: ''
    },
    computed: {
        sumCart(){
            return this.cart.reduce((total, item) => total + item.price ,0)
        },
        cartGoods(){
            return this.cart.length
        }
    },
    methods: {
        addCart(id) {
            this.cart.push(this.filteredGoodsARR[id]);
        },
        deleteCart(id) {
            this.cart.splice(id, 1);
        },
        filteredGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoodsARR = this.goods.filter(res => regexp.test(res.product_name))
            console.log(this.filteredGoodsARR.length);
        },
    },
    mounted() {
        fetch(
            'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        ).then(res => res.json()).then(res => {
            this.goods = [...res, ...res];
            this.filteredGoodsARR = [...res, ...res]
            console.log(this.goods);
            console.log(this.filteredGoodsARR);
        });
    }
});