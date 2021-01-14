class goodsList {
    constructor() {
        this.goods = [];
        this.product = [];
    }
    numberID() {
        for (var i = 0; i < list.goods.length; i++) {
            list.goods[i].id = i;
        }
    }

    sumPrice() {

        if (this.goods.length == 0) {
            return '-';
        } else {
            let result = this.goods.reduce((total, position) => total + position.price, 0);
            return result;
        }
    }

    sumCalries() {

        if (this.goods.length == 0) {
            return '-';
        } else {
            let result = this.goods.reduce((total, position) => total + position.calories, 0);
            return result;
        }
    }

    cart() {
        if (this.goods.length == 0) {
            return 'корзина пуста';
        } else {
            return `в козине ${this.goods[0].name} ${this.goods[1].name}${this.additionallyF()}`
        }
    }

    additionallyF() {
        if (this.goods.length <= 2) {
            return '';
        } else {
            return `+ ${this.goods[2].name}`
        }
    }

    render() {
        let divCart = document.querySelector('#cart')
        divCart.innerHTML = '';

        let name = document.createElement('h1');
        name.innerHTML = this.cart();

        let price = document.createElement('h2')
        price.innerHTML = `цена ${this.sumPrice()}`;

        let calories = document.createElement('h2');
        calories.innerHTML = `калорийность ${this.sumCalries()}`;

       // let additionally = document.createElement('h2');
       //additionally.innerHTML = additionallyF();

        divCart.appendChild(name);
        divCart.appendChild(price);
        divCart.appendChild(calories);

    }
}

let list = new goodsList();

function makeCounter() {
    var currentCount = 0;
    return function () {
        return currentCount++;
    };
}

let count = makeCounter();

class Burger {

    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
        this.id = count();
        this.render(this);
        this.addProduct(this);
    }

    addProduct() {
        list.product.push(this);
    }

    addCart() {
        list.goods.push(list.product[this.id]);

        let mainDivt = document.querySelector('#divForToping')
        mainDivt.style.display = 'flex';
        let mainDiv = document.querySelector('#mainDiv')
        mainDiv.style.display = 'none';
    }

    delete() {
        list.numberID();
        list.goods.splice(this.id, 1);

    }

    render() {
        let mainDiv = document.querySelector('#mainDiv')

        let div = document.createElement('div')

        mainDiv.appendChild(div);

        let name = document.createElement('h1');
        name.innerHTML = this.name;

        let price = document.createElement('h2')
        price.innerHTML = this.price;

        let calories = document.createElement('h2');
        calories.innerHTML = this.calories;

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(calories);
        let buttonEL = document.createElement('button')
        buttonEL.innerHTML = 'Купить';
        div.appendChild(buttonEL);
        buttonEL.setAttribute('id', this.id);
        buttonEL.addEventListener('click', this.addCart);
    }
}

class Toping extends Burger {
    addCart() {
        list.goods.push(list.product[this.id]);
        let mainDivt = document.querySelector('#divForToping')
        mainDivt.style.display = 'none';
        let mainDiva = document.querySelector('#Additionally')
        mainDiva.style.display = 'flex';
        list.render();
    }

    render() {
        let mainDivt = document.querySelector('#divForToping')
        let div = document.createElement('div')
        mainDivt.appendChild(div);
        let name = document.createElement('h1');
        name.innerHTML = this.name;
        let price = document.createElement('h2')
        price.innerHTML = this.price;
        let calories = document.createElement('h2');
        calories.innerHTML = this.calories;
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(calories);
        let buttonEL = document.createElement('button')
        buttonEL.innerHTML = 'Выбрать';
        div.appendChild(buttonEL);
        buttonEL.setAttribute('id', this.id);
        buttonEL.addEventListener('click', this.addCart);
    }
}

class Additionally extends Toping {
    addCart() {
        list.goods.push(list.product[this.id]);
        list.render();
        let mainDivt = document.querySelector('#Additionally')
        mainDivt.style.display = 'none';

    }
    render() {
        let mainDivt = document.querySelector('#Additionally')
        let div = document.createElement('div')
        mainDivt.appendChild(div);
        let name = document.createElement('h1');
        name.innerHTML = this.name;
        let price = document.createElement('h2')
        price.innerHTML = this.price;
        let calories = document.createElement('h2');
        calories.innerHTML = this.calories;
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(calories);
        let buttonEL = document.createElement('button')
        buttonEL.innerHTML = 'Добавить';
        div.appendChild(buttonEL);
        buttonEL.setAttribute('id', this.id);
        buttonEL.addEventListener('click', this.addCart);
    }
}


const test2 = new Burger("большой бургер", 100, 40);
const test = new Burger("маленький бургер", 50, 30);

const toping1 = new Toping("с сыром", 10, 20);
const toping2 = new Toping("с салатом", 20, 5);
const toping3 = new Toping("с картофелем", 15, 10);

const additionally1 = new Additionally("приправа", 15, 0);
const additionally2 = new Additionally("майонез", 20, 5);