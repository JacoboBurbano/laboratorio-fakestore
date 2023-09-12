const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.setItem('pagination', '5')
const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        return `<article class='Card'>
                      <img src='${product.images[1]}' alt='${product.title}'></img>
                      <h2>${product.title}
                      <small>${product.price}</small>
                      </h2>
                </article>`
      });
      console.log(products)
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}
const loadData = ({increase = false} = {}) => {
  let count = Number(localStorage.getItem('pagination'))
  if(increase){
    count += 10
    localStorage.setItem('pagination', JSON.stringify(count))
  }
     getData(API + `?offset=${count}&limit=10`);
}
loadData({increase: false})
const intersectionObserver = new IntersectionObserver(entries => {
  // console.log(entries[0].isIntersecting)
    entries.innerHTML = loadData({increase : true})
}, {
  rootMargin: '0px 0px 100% 0px',
});

// intersectionObserver.observe($observe);
