const ROOT_URL = 'http://localhost:8080/api/';
const ROOT_PICTURE = 'http://localhost:8080/';
const PRODUCT_URL = 'http://127.0.0.1:5500/client/pages/product.html';
const fetchData = async () => {
  const clothesRes = await fetch(`${ROOT_URL}clothes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  clothes = await clothesRes.json();
  fillPage(clothes);
};
fetchData();

const fillPage = (clothesList) => {
  const wrapper = document.getElementById('item-list');
  for (let clothes of clothesList) {
    const itemWrapper = document.createElement('div');
    itemWrapper.classList.add('item');
    const image = document.createElement('img');
    image.src = `${ROOT_PICTURE}${clothes.imagePath}`;
    const buttonAdd = document.createElement('button');
    buttonAdd.classList.add('btn-add');
    buttonAdd.textContent = '+';

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('item-info');
    const leftPartWrapper = document.createElement('div');
    leftPartWrapper.classList.add('left-part');
    const name = document.createElement('span');
    name.textContent = clothes.name.toUpperCase();
    const color = document.createElement('div');
    color.classList.add('color');
    color.style.background = clothes.color.hex;
    leftPartWrapper.appendChild(name);
    leftPartWrapper.appendChild(color);
    const price = document.createElement('span');
    price.textContent = `${clothes.cost} Р`;
    const popUp = document.createElement('div');
    popUp.hidden = true;
    popUp.classList.add('popup');
    for (let size of clothes.sizes) {
      const sizeBtn = document.createElement('button');
      sizeBtn.textContent = `EUR ${size.nameEur} / RUS ${size.nameRus}`;
      sizeBtn.onclick = (e) => {
        console.log('Clicked');
        e.preventDefault();
        handleAddToCart(clothes, size);
        popUp.hidden = true;
      };
      popUp.appendChild(sizeBtn);
    }
    buttonAdd.onclick = (e) => {
      e.preventDefault();
      popUp.hidden = !popUp.hidden;
    };

    infoWrapper.appendChild(leftPartWrapper);
    infoWrapper.appendChild(price);
    itemWrapper.appendChild(image);
    itemWrapper.appendChild(buttonAdd);
    itemWrapper.appendChild(popUp);
    itemWrapper.appendChild(infoWrapper);
    wrapper.appendChild(itemWrapper);

    image.onclick = () => {
      window.location.href = `${PRODUCT_URL}?id=${clothes.id}`;
    };
  }
};

const getLengthOfCart = () => {
  let cart = [];
  if (localStorage.getItem('cart')) {
    cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
  }
  let length = 0;
  for (const cartItem of cart) {
    length += cartItem.count;
  }
  return length;
};
const handleAddToCart = (clothes, size) => {
  let cart = [];
  if (localStorage.getItem('cart')) {
    cart = localStorage.getItem('cart');
    cart = JSON.parse(cart);
  }
  let isRepeating = false;
  for (let cartItem of cart) {
    if (cartItem.id === clothes.id && cartItem.size.id === size.id) {
      isRepeating = true;
      cartItem.count += 1;
      break;
    }
  }
  if (!isRepeating) {
    clothes.size = size;
    clothes.count = 1;
    cart.push(clothes);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cart-count').textContent = getLengthOfCart();
  cart = localStorage.getItem('cart');
  console.log(JSON.parse(localStorage.getItem('cart')));
};

const onLoad = () => {
  document.getElementById('cart-count').textContent = getLengthOfCart();
};

document.addEventListener('DOMContentLoaded', onLoad);
