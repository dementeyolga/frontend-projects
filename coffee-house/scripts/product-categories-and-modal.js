const productCardsWrapper = document.querySelector('.menu__cards');
const menuTabList = document.querySelectorAll('.menu__tab');
const menuModal = document.querySelector('.menu__modal');
const menuModalWrapper = document.querySelector('.menu__modal-wrapper');

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
	activeTab = [].find.call(menuTabList, (tab) => tab.classList.contains('active'));
	activeCategory = activeTab.textContent.toLowerCase().trim();
}
function showActiveCategoryProducts(activeCategory) {
	productCardsWrapper.innerHTML = '';

	let activeCategoryProducts = products.filter((product) => product.category === activeCategory);

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

	menuCards.forEach((card, index) =>
		card.addEventListener('click', function () {
			console.log(`card ${index} clicked`);
			const product = activeCategoryProducts[index];

			menuModal.innerHTML = `
      			<div class="modal__image">
							<img src="${product.image}" alt="${product.name}" />
						</div>
						<div class="modal__content">
							<div class="modal__info">
								<div class="modal__title">${product.name}</div>
								<div class="modal__description">${product.description}</div>
							</div>
							<div class="modal__size">
								<div class="modal__caption">Size</div>
								<div class="modal__buttons">
									<div class="modal__button tab active" data-price="${product.sizes.s['add-price']}">
										<div class="tab__icon">S</div>
										${product.sizes.s.size}
									</div>
									<div class="modal__button tab" data-price="${product.sizes.m['add-price']}">
										<div class="tab__icon">M</div>
										${product.sizes.m.size}
									</div>
									<div class="modal__button tab" data-price="${product.sizes.l['add-price']}">
										<div class="tab__icon">L</div>
										${product.sizes.l.size}
									</div>
								</div>
							</div>
							<div class="modal__additives">
								<div class="modal__caption">Additives</div>
								<div class="modal__buttons">
									<div class="modal__button tab" data-price="${product.additives[0]['add-price']}">
										<div class="tab__icon">1</div>
										${product.additives[0].name}
									</div>
									<div class="modal__button tab" data-price="${product.additives[1]['add-price']}">
										<div class="tab__icon">2</div>
										${product.additives[1].name}
									</div>
									<div class="modal__button tab" data-price="${product.additives[2]['add-price']}">
										<div class="tab__icon">3</div>
										${product.additives[2].name}
									</div>
								</div>
							</div>
							<div class="modal__cart">
								<div class="modal__total">Total:</div>
								<div class="modal__price">$${product.price}</div>
							</div>
							<div class="modal__disclaimer">
								<div class="modal__disclaimer-icon">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
										<g clip-path="url(#clip0_268_12877)">
											<path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
											<path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
											<path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
										</g>
										<defs>
											<clipPath id="clip0_268_12877">
												<rect width="16" height="16" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</div>
								<div class="modal__disclaimer-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
							</div>
							<div class="modal__close tab">Close</div>
						</div>
      `;
			menuModalWrapper.classList.add('active');
			document.body.classList.add('scroll-disabled');

			const total = menuModal.querySelector('.modal__price');
			let totalValue = +total.textContent.slice(1);

			const sizesTabs = menuModal.querySelectorAll('.modal__size .modal__button');
			const additivesTabs = menuModal.querySelectorAll('.modal__additives .modal__button');

			sizesTabs.forEach((tab) => {
				tab.addEventListener('click', function () {
					if (this.classList.contains('active')) return;

					sizesTabs.forEach((elem) => {
						if (elem.classList.contains('active')) {
							totalValue -= +elem.dataset.price;
							elem.classList.remove('active');
						}
					});

					this.classList.add('active');
					totalValue += +this.dataset.price;

					let strTotalValue = totalValue.toFixed(2);
					total.textContent = `$${strTotalValue}`;
				});
			});

			additivesTabs.forEach((tab) => {
				tab.addEventListener('click', function () {
					this.classList.toggle('active');
					if (this.classList.contains('active')) {
						totalValue += +this.dataset.price;
					} else {
						totalValue -= +this.dataset.price;
					}

					let strTotalValue = totalValue.toFixed(2);
					total.textContent = `$${strTotalValue}`;
				});
			});

			const closeBtn = menuModal.querySelector('.modal__close');

			menuModalWrapper.onclick = (ev) => {
				if (ev.target === closeBtn) {
					menuModalWrapper.classList.remove('active');
					document.body.classList.remove('scroll-disabled');
				} else if (ev.target.closest('.menu__modal') === menuModal) {
					return;
				} else {
					menuModalWrapper.classList.remove('active');
					document.body.classList.remove('scroll-disabled');
				}
			};
		})
	);
}
