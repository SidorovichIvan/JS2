function makeGETRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        // xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(JSON.parse(xhr.response))
            } else {
                resolve(JSON.parse(xhr.response))
            }
        }

        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send(JSON.stringify(body));
    })
}

const requestURL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class GoodsList {

    show() {
        makeGETRequest('GET', requestURL + '/catalogData.json')
            .then(data => {
                data.map(person => this.render(person));
            })
    }

    showCart() {
        makeGETRequest('GET', requestURL + '/getBasket.json')
            .then(data => {
                data.map(person => this.render(person));
            })
            .catch(err => console.log(err))
    }

    add() {

        makeGETRequest('POST', requestURL + '/addToBasket.json', this)
            .then(data => console.log(data))
            .catch(data => console.log(data))
    }

    delete() {
        makeGETRequest('delet', requestURL + '/deleteFromBasket.json', this)
            .then(data => console.log(data))
            .catch(data => console.log(data))
    }

    render({
        product_name,
        price
    }) {
        const $div = document.createElement('div');
        document.body.prepend($div);
        const $h3 = document.createElement('h3');

        $div.append($h3);
        $h3.innerHTML = product_name;
        const $p = document.createElement('p');

        $div.append($p);
        $p.innerHTML = price;
    }
}

const list = new GoodsList();
list.show();