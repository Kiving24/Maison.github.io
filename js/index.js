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

  const storefrontTabs = document.getElementById('storefrontTabs');
  const homeProductGrid = document.getElementById('homeProductGrid');

  if (!storefrontTabs || !homeProductGrid) return;

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
    { id: 'all', name: 'Все', icon: '🛒' },
    { id: 'wine', name: 'Вино', icon: '🍷' },
    { id: 'cheese', name: 'Сыр', icon: '🧀' },
    { id: 'meat', name: 'Мясо', icon: '🥩' },
    { id: 'grocery', name: 'Бакалея', icon: '🫒' }
  ];

  let currentCategory = 'all';
  const MAX_ITEMS = 8;

  const formatPrice = (value) => {
    try {
      return `${value.toLocaleString('ru-RU')}₽`;
    } catch (err) {
      return `${value}₽`;
    }
  };

  const getFilteredProducts = () => {
    const filtered = products.filter((p) => currentCategory === 'all' || p.category === currentCategory);
    filtered.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return a.price - b.price;
    });
    return filtered.slice(0, MAX_ITEMS);
  };

  const renderTabs = () => {
    storefrontTabs.innerHTML = '';

    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'storefront-tab';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-id', cat.id);

      if (cat.id === currentCategory) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.tabIndex = 0;
      } else {
        btn.setAttribute('aria-selected', 'false');
        btn.tabIndex = -1;
      }

      btn.innerHTML = `<span class="emoji">${cat.icon}</span><span>${cat.name}</span>`;

      btn.addEventListener('click', () => {
        currentCategory = cat.id;
        renderTabs();
        renderProducts();
      });

      storefrontTabs.appendChild(btn);
    });
  };

  const renderProducts = () => {
    const items = getFilteredProducts();
    homeProductGrid.innerHTML = '';

    items.forEach((p) => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}" />
          <div class="badge-country">${p.country}</div>
          <div class="badge-rating">
            ${p.rating.toFixed(1)}
            <svg class="star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
              <polygon points="12 2 15 8.9 22 9.3 17 14 18.4 21 12 17.3 5.6 21 7 14 2 9.3 9 8.9 12 2"></polygon>
            </svg>
          </div>
          <div class="product-overlay">
            <button type="button" class="overlay-button">Открыть в каталоге</button>
          </div>
        </div>
        <div class="product-info">
          <h4>${p.name}</h4>
          <p>${p.description}</p>
        </div>
        <div class="product-bottom">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button type="button" class="product-add" aria-label="Добавить в корзину">
            <svg class="icon" viewBox="-5 -3 35 27" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
          </button>
        </div>
      `;

      const overlayBtn = card.querySelector('.overlay-button');
      if (overlayBtn) {
        overlayBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = 'katalog.html';
        });
      }

      const addBtn = card.querySelector('.product-add');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          alert(`Товар "${p.name}" добавлен в корзину.`);
        });
      }

      card.addEventListener('click', () => {
        window.location.href = 'katalog.html';
      });

      homeProductGrid.appendChild(card);
    });
  };

  renderTabs();
  renderProducts();
});
