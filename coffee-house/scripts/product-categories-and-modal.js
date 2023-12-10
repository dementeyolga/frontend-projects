const productCardsWrapper = document.querySelector('.menu__cards');
const menuTabList = document.querySelectorAll('.menu__tab');

let URL = './../assets/json/products.json';
let response = await fetch(URL);
let products = await response.json();

let activeTab;
let activeCategory;
findActiveCategory();
showActiveCategoryProducts(activeCategory);

menuTabList.forEach((tab) =>
  tab.addEventListener('click', function () {
    menuTabList.forEach((tab) => tab.classList.remove('active'));
    this.classList.add('active');

    findActiveCategory();
    showActiveCategoryProducts(activeCategory);
  })
);

function findActiveCategory() {
  activeTab = [].find.call(menuTabList, (tab) =>
    tab.classList.contains('active')
  );
  activeCategory = activeTab.textContent.toLowerCase().trim();
}
function showActiveCategoryProducts(activeCategory) {
  productCardsWrapper.innerHTML = '';

  let activeCategoryProducts = products.filter(
    (product) => product.category === activeCategory
  );

  activeCategoryProducts.forEach((product) => {
    productCardsWrapper.insertAdjacentHTML(
      'beforeend',
      `
    <div class="menu__card card">
      <div class="card__image menu__card-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="card__content menu__card-content">
      <div class="menu__card-content-top">
        <h4 class="card__title menu__card-title">${product.name}</h4>
        <p class="card__description menu__card-description">
             ${product.description} 
        </p>
      </div>
      <p class="card__price menu__card-price">
        $${product.price}
      </p>
    </div>
  </div>
  `
    );
  });

  const menuCards = document.querySelectorAll('.menu__card');
  console.log(menuCards);

  menuCards.forEach((card, index) =>
    card.addEventListener('click', function () {
      console.log(`card ${index} clicked`);
    })
  );
}
