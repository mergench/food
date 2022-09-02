const food = [
    {
        name: 'Гамбургер простой',
        price: 10000,
        amount: 0,
        kcall: 560,
        id: 'plainBurger',
    },
    {
        name: 'Гамбургер Fresh',
        price: 20500,
        amount: 0,
        kcall: 710,
        id: 'freshBurger'
    },
    {
        name: 'Fresh Combo',
        price: 31900,
        amount: 0,
        kcall: 950,
        id: 'freshCombo'
    },
];

const dataExtra = [
    {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 50,
        extraId: 'doubleMayonnaise'
    },
    {
        name: 'Салатный лист',
        price: 500,
        kcall: 10,
        extraId: 'lettuce'
    },
    {
        name: 'Сыр',
        price: 3000,
        kcall: 30,
        extraId: 'cheese'
    },
];
//... - spread оператор - разбивает массив на составляющие
const btns = [...document.querySelectorAll('.main__product-btn')];

let calc = (amount, something) => amount * something;

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function(e){
       e.preventDefault();
       counterBurger(this);
    });
}

function counterBurger(btn){
    const parent = btn.closest('.main__product'),
          parentId = parent.getAttribute('id'),
          count = parent.querySelector('.main__product-num'),
          kcall = parent.querySelector('.main__product-kcall span'),
          price = parent.querySelector('.main__product-price span'),
          symbol = btn.getAttribute('data-symbol');
  
    let index = food.findIndex(item => item.id == parentId);

    if(symbol == '+' && food[index].amount < 100){
        food[index].amount++;
    }
    else if(symbol == '-' && food[index].amount > 0){
        food[index].amount--;
    }
    count.textContent = food[index].amount;
    price.textContent = calc(food[index].amount, food[index].price);
    kcall.textContent = calc(food[index].amount, food[index].kcall);
};


const extraBtns = [...document.querySelectorAll('.main__product-checkbox')];

extraBtns.forEach(item => {
    item.addEventListener('click', function(){
        countExtraProducts(this);
    });
});

function countExtraProducts(btn){
    const parent = btn.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        symbol = btn.getAttribute('data-extra');

    let index = food.findIndex(item => item.id == parentId);
    let extraId = dataExtra.findIndex(item => item.extraId == symbol);
    food[index][symbol] = btn.checked;
    if(food[index][symbol]){
        food[index].price += dataExtra[extraId].price;
        food[index].kcall += dataExtra[extraId].kcall;
    }
    else {
        food[index].price -= dataExtra[extraId].price;
        food[index].kcall -= dataExtra[extraId].kcall;
    }
    price.textContent = calc(food[index].amount, food[index].price);
    kcall.textContent = calc(food[index].amount, food[index].kcall);
}


const orderBtn= document.querySelector('.addCart'),
      receipt = document.querySelector('.receipt'),
      receiptWindow = document.querySelector('.receipt__window-out'),
      payBtn = document.querySelector('.receipt__window-btn');

orderBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(food.some(item => item.amount > 0 ? item : false)){
        receipt.classList.add('active');
        let totalName = '';
        let totalPrice = 0;
        let totalKcall =0;
        for (let i = 0; i < food.length; i++) {
            if(food[i].amount > 0){
                totalName += `${food[i].name} - ${food[i].amount}шт\n`;
                totalPrice += calc(food[i].amount, food[i].price);
                totalKcall += calc(food[i].amount, food[i].kcall);
                for (const key in food[i]){
                    if(food[i][key] === true){
                       let data = dataExtra.findIndex(item => item.extraId == key);
                       totalName += `\t${dataExtra[data].name}\n`;
                    }
                }
            }
        }
        receiptWindow.innerHTML = `Вы заказали:\n${totalName}Общая стоимость: ${totalPrice}\nОбщая калорийность: ${totalKcall}`
    }
    else alert('Вы ничего не заказали');
})

payBtn.addEventListener('click', function(e){
    e.preventDefault();
    window.location.reload();
})


const timer = document.querySelector('.header__timer-extra');
function counter(){
    if(timer.textContent < 100){
        timer.textContent++;
        setTimeout(counter, 100);
    }
}
counter();


const burgerImages = document.querySelectorAll('.main__product-info'),
      view = document.querySelector('.view'),
      viewClose = document.querySelector('.view__close'),
      viewPicture = document.querySelector('.view__picture');

burgerImages.forEach(item => {
    item.addEventListener('click', function(){
        let img = this.querySelector('img');
        view.classList.add('active');
        viewPicture.src = img.src;
    })
});

// viewClose.addEventListener('click', function(){
//     view.classList.closest('active');
// })

view.addEventListener('click', function(e){
    if(!e.target.closest('img') || e.target.closest('.view__close')){
        this.classList.remove('active');
    }
})