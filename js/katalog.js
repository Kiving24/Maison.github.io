document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const toggleHeader = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  toggleHeader();
  window.addEventListener('scroll', toggleHeader);

  const path = window.location.pathname;
  const isCatalogPage = /catalog/i.test(path);
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (isCatalogPage && /catalog/i.test(link.getAttribute('href'))) {
      link.classList.add('active');
    } else if (!isCatalogPage) {
      const file = path.split('/').pop() || 'index.html';
      if (link.getAttribute('href') === file) {
        link.classList.add('active');
      }
    }
  });
  const mobileItems = document.querySelectorAll('.mobile-nav .mobile-item');
  mobileItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (isCatalogPage && /catalog/i.test(href)) {
      item.classList.add('active');
    } else if (!isCatalogPage) {
      const file = path.split('/').pop() || 'index.html';
      if (href === file) {
        item.classList.add('active');
      }
    }
  });

  const filterPanel = document.getElementById('filterPanel');
  const filterToggleBtn = document.getElementById('filterToggleBtn');
  const filterCloseBtn = document.getElementById('filterCloseBtn');
  const categoryList = document.getElementById('categoryList');
  const searchInput = document.getElementById('searchInput');
  const productGrid = document.getElementById('productGrid');
  const noProducts = document.getElementById('noProducts');

  const products = [
    {
      id: 1,
      name: 'Chateau Margaux 2015',
      category: 'wine',
      price: 12500,
      rating: 4.9,
      image: 'img/cat-wine.png',
      country: '🇫🇷 Франция',
      description: 'Изысканное красное вино премиум класса'
    },
    {
      id: 2,
      name: 'Barolo DOCG 2018',
      category: 'wine',
      price: 8900,
      rating: 5.0,
      image: 'img/cat-wine.png',
      country: '🇮🇹 Италия',
      description: 'Элегантное вино из региона Пьемонт'
    },
    {
      id: 3,
      name: 'Château Pétrus 2016',
      category: 'wine',
      price: 45000,
      rating: 5.0,
      image: 'img/cat-wine.png',
      country: '🇫🇷 Франция',
      description: 'Легендарное вино из Помероля'
    },
    {
      id: 4,
      name: 'Tignanello 2017',
      category: 'wine',
      price: 15800,
      rating: 4.8,
      image: 'img/cat-wine.png',
      country: '🇮🇹 Италия',
      description: 'Супертосканское вино мирового класса'
    },

    {
      id: 5,
      name: 'Пармезан Реджано 24 мес.',
      category: 'cheese',
      price: 2890,
      rating: 5.0,
      image: 'img/cat-cheese.png',
      country: '🇮🇹 Италия',
      description: 'Выдержанный пармезан премиум качества'
    },
    {
      id: 6,
      name: 'Камамбер де Норманди',
      category: 'cheese',
      price: 1450,
      rating: 4.8,
      image: 'img/cat-cheese.png',
      country: '🇫🇷 Франция',
      description: 'Мягкий сыр с белой плесенью'
    },

    {
      id: 7,
      name: 'Хамон Иберико',
      category: 'meat',
      price: 4200,
      rating: 5.0,
      image: 'img/cat-meat.png',
      country: '🇪🇸 Испания',
      description: 'Элитный испанский хамон'
    },
    {
      id: 8,
      name: 'Прошутто ди Парма',
      category: 'meat',
      price: 3500,
      rating: 4.9,
      image: 'img/cat-meat.png',
      country: '🇮🇹 Италия',
      description: 'Итальянская вяленая ветчина'
    },
  
    {
      id: 9,
      name: 'Оливковое масло Extra Virgin',
      category: 'grocery',
      price: 1890,
      rating: 4.7,
      image: 'img/cat-grocery.png',
      country: '🇬🇷 Греция',
      description: 'Первого холодного отжима'
    },
    {
      id: 10,
      name: 'Трюфельная паста',
      category: 'grocery',
      price: 2400,
      rating: 4.9,
      image: 'img/cat-grocery.png',
      country: '🇮🇹 Италия',
      description: 'Паста с черным трюфелем'
    },
    {
      id: 11,
      name: 'Бальзамический уксус 12 лет',
      category: 'grocery',
      price: 3200,
      rating: 5.0,
      image: 'img/cat-grocery.png',
      country: '🇮🇹 Италия',
      description: 'Выдержанный бальзамик из Модены'
    },
    {
      id: 12,
      name: 'Морская соль с трюфелем',
      category: 'grocery',
      price: 890,
      rating: 4.6,
      image: 'img/cat-grocery.png',
      country: '🇫🇷 Франция',
      description: 'Деликатесная соль с кусочками трюфеля'
    }
  ];


  const categories = [
    { id: 'all', name: 'Все товары', icon: '🛒' },
    { id: 'cheese', name: 'Сыр', icon: '🧀' },
    { id: 'wine', name: 'Вино', icon: '🍷' },
    { id: 'meat', name: 'Мясо', icon: '🥩' },
    { id: 'grocery', name: 'Бакалея', icon: '🫒' }
  ];

  let currentCategory = 'all';
  let searchQuery = '';

  function renderCategories() {
    if (!categoryList) return;
    categoryList.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'category-btn';
      if (cat.id === currentCategory) {
        btn.classList.add('active');
      }
      btn.setAttribute('data-id', cat.id);
      btn.innerHTML = `
        <span class="emoji">${cat.icon}</span>
        <span>${cat.name}</span>
      `;
      btn.addEventListener('click', () => {
        currentCategory = cat.id;
        renderCategories();
        renderProducts();
        if (window.innerWidth < 1024) {
          filterPanel?.classList.remove('open');
        }
      });
      categoryList.appendChild(btn);
    });
  }

  function renderProducts() {
    if (!productGrid) return;
    const filtered = products.filter(p => {
      const matchCategory = currentCategory === 'all' || p.category === currentCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
    productGrid.innerHTML = '';
    if (filtered.length === 0) {
      if (noProducts) noProducts.classList.remove('hidden');
      return;
    } else {
      if (noProducts) noProducts.classList.add('hidden');
    }
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}" />
          <div class="badge-country">${p.country}</div>
          <div class="badge-rating">
            ${p.rating.toFixed(1)}
            <svg class="star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
              <polygon points="12 2 15 8.9 22 9.3 17 14 18.4 21 12 17.3 5.6 21 7 14 2 9.3 9 8.9 12 2" />
            </svg>
          </div>
          <div class="product-overlay">
            <button class="overlay-button">Подробнее</button>
          </div>
        </div>
        <div class="product-info">
          <h4>${p.name}</h4>
          <p>${p.description}</p>
        </div>
        <div class="product-bottom">
          <span class="product-price">${p.price.toLocaleString('ru-RU')}₽</span>
        <button class="product-add" aria-label="Добавить в корзину">
            <!-- Иконка корзины, как в шапке сайта -->
            <svg class="icon" viewBox="-5 -3 35 27" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
          </button>
        </div>
      `;
      const detailsBtn = card.querySelector('.overlay-button');
      if (detailsBtn) {
        detailsBtn.addEventListener('click', (e) => {
          e.preventDefault();
          alert(`Вы выбрали \"${p.name}\".`);
        });
      }
      const addBtn = card.querySelector('.product-add');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.preventDefault();
          alert(`Товар \"${p.name}\" добавлен в корзину.`);
        });
      }
      productGrid.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  if (filterToggleBtn) {
    filterToggleBtn.addEventListener('click', () => {
      filterPanel?.classList.add('open');
    });
  }
  if (filterCloseBtn) {
    filterCloseBtn.addEventListener('click', () => {
      filterPanel?.classList.remove('open');
    });
  }

  renderCategories();
  renderProducts();
});