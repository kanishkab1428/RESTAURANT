const menuItems = [
  {
    name: "Garden goddess bowl",
    category: "Veg",
    price: 12,
    description: "Crisp greens, avocado, quinoa and our zippy lemon dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    alt: "Bright green salad bowl with avocado and fresh vegetables"
  },
  {
    name: "Sunday roast chicken",
    category: "Non-Veg",
    price: 18,
    description: "Herb-roasted chicken, buttery potatoes and pan gravy.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    alt: "Roast chicken with herbs and golden vegetables"
  },
  {
    name: "Creamy tomato pasta",
    category: "Veg",
    price: 15,
    description: "Slow-simmered tomato sauce, basil and a little parmesan.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    alt: "Fresh pasta with tomato, herbs and parmesan"
  },
  {
    name: "Chocolate cloud cake",
    category: "Desserts",
    price: 8,
    description: "Deep cocoa, a soft middle and whipped vanilla cream.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    alt: "Rich chocolate layer cake with chocolate frosting"
  },
  {
    name: "Crispy fish tacos",
    category: "Non-Veg",
    price: 16,
    description: "Golden fish, crunchy slaw and a bright lime crema.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80",
    alt: "Fish tacos topped with cabbage and fresh herbs"
  },
  {
    name: "Berry & cream pavlova",
    category: "Desserts",
    price: 9,
    description: "Cloud-soft meringue piled with berries and fresh cream.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    alt: "Berry dessert with cream and fresh fruit"
  },
  {
    name: "Golden halloumi bites",
    category: "Veg",
    price: 11,
    description: "Grilled halloumi, warm flatbread and a sweet chilli dip.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    alt: "Colorful vegetarian plate with fresh greens"
  },
  {
    name: "Miso-glazed salmon",
    category: "Non-Veg",
    price: 19,
    description: "Sticky-sweet salmon with sesame rice and crunchy greens.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    alt: "Glazed salmon served with vegetables"
  }
];

const menuGrid = document.querySelector("#menu-grid");
const cartCount = document.querySelector("#cart-count");
const cartMessage = document.querySelector("#cart-message");
const menuCount = document.querySelector("#menu-count");
const filterButtons = document.querySelectorAll(".filter-button");
let cartTotal = 0;

function renderMenu(category = "All") {
  const visibleItems = category === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = visibleItems.map((item) => `
    <article class="menu-card">
      <div class="food-image">
        <img src="${item.image}" alt="${item.alt}" loading="lazy">
        <span class="category-tag">${item.category}</span>
      </div>
      <div class="card-body">
        <div class="card-heading">
          <h3>${item.name}</h3>
          <span class="food-price">$${item.price}</span>
        </div>
        <p>${item.description}</p>
        <button class="add-button" type="button" data-item="${item.name}">＋ Add to cart</button>
      </div>
    </article>
  `).join("");

  menuCount.textContent = `${visibleItems.length} lovely ${visibleItems.length === 1 ? "thing" : "things"}`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    renderMenu(button.dataset.filter);
  });
});

menuGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-button");
  if (!addButton) return;

  cartTotal += 1;
  cartCount.textContent = String(cartTotal);
  cartMessage.textContent = `${addButton.dataset.item} added to your cart.`;
});

const orderForm = document.querySelector("#order-form");
const formStatus = document.querySelector("#form-status");
const fields = [
  { input: document.querySelector("#name"), error: document.querySelector("#name-error"), message: "Please enter at least 2 characters." },
  { input: document.querySelector("#email"), error: document.querySelector("#email-error"), message: "Please enter a valid email address." },
  { input: document.querySelector("#message"), error: document.querySelector("#message-error"), message: "Please write a message of at least 5 characters." }
];

function validateField(field) {
  const valid = field.input.validity.valid && field.input.value.trim().length >= (field.input.id === "name" ? 2 : field.input.id === "message" ? 5 : 0);
  field.input.setAttribute("aria-invalid", String(!valid));
  field.error.textContent = valid ? "" : field.message;
  return valid;
}

fields.forEach((field) => {
  field.input.addEventListener("input", () => {
    if (field.input.hasAttribute("aria-invalid")) validateField(field);
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    orderForm.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  formStatus.textContent = "Thanks for your message! We'll be in touch soon.";
  orderForm.reset();
  fields.forEach((field) => field.input.removeAttribute("aria-invalid"));
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("open");
  }
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
renderMenu();
