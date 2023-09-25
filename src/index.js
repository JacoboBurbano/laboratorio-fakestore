const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.setItem('pagination', '0')

const getData = async (api) => {
  const response = await fetch(api)
  const data = await response.json()
  if(response.status == 200){
      console.log(data)
      let products = data;
      let output = products.map(product => {
        return `<article class='Card'>
                      <img src='${product.images[1]}' alt='${product.title}'></img>
                      <h2>${product.title}
                      <small>${product.price}</small>
                      </h2>
                </article>`
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem); 
  }
  else{
    console.log(response.statusText)
  }
    
}
loadData =  async ({increase = 5} = {}) => {
  if(Number(localStorage.getItem('pagination')) < 200){
    getData(API + `?offset=${increase}&limit=10`);
  }
  else{
    intersectionObserver.unobserve($observe)
    let parrafo = document.createTextNode('Todos los productos Obtenidos.')
    $app.append(parrafo)
  }
}
// loadData({increase: false})
const intersectionObserver = new IntersectionObserver(entries => {
  // console.log(entries[0].isIntersecting)
  let count = Number(localStorage.getItem('pagination'))
    count += 5
    entries.innerHTML = loadData({increase: count})
    localStorage.setItem('pagination', JSON.stringify(count))
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
