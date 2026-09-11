const BUSINESS = {
  name: "Pascha Restaurant",
  tagline: "Good Food. Great Moments.",
  phone: "+91 89460 52144",
  whatsapp: "918946052144",
  email: "hello@pascha-demo.com",
  address: "Avadi, Tamil Nadu",
  maps: "#"
};

const images = {
  samosa: "https://images.pexels.com/photos/6646073/pexels-photo-6646073.jpeg?auto=compress&cs=tinysrgb&w=900",
  paneer: "https://images.pexels.com/photos/9609849/pexels-photo-9609849.jpeg?auto=compress&cs=tinysrgb&w=900",
  kebab: "https://images.pexels.com/photos/5718026/pexels-photo-5718026.jpeg?auto=compress&cs=tinysrgb&w=900",
  curry: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=900",
  biryani: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=900",
  naan: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=900",
  dessert: "https://images.pexels.com/photos/1098592/pexels-photo-1098592.jpeg?auto=compress&cs=tinysrgb&w=900",
  gulab: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=900"
};

const MENU = [
  ["crispy-chicken", "Crispy Chicken", "Starters", 349, "Crunchy chicken bites, house spice, curry leaf and lime.", "kebab", ["non-vegetarian", "popular"], true],
  ["paneer-tikka", "Paneer Tikka", "Starters", 299, "Charred paneer, peppers, onion and a bright mint chutney.", "paneer", ["vegetarian", "popular"], true],
  ["chicken-65", "Chicken 65", "Starters", 329, "Fried chicken, ginger, garlic, chilli and fresh coriander.", "kebab", ["non-vegetarian", "popular"], false],
  ["vegetable-spring-rolls", "Vegetable Spring Rolls", "Starters", 229, "Crisp rolls filled with seasonal vegetables and sweet chilli.", "samosa", ["vegetarian"], false],
  ["butter-chicken", "Butter Chicken", "Main Course", 449, "Tender chicken in a silky tomato, butter and fenugreek gravy.", "curry", ["non-vegetarian", "popular"], true],
  ["paneer-butter-masala", "Paneer Butter Masala", "Main Course", 379, "Soft paneer in a rich tomato gravy with gentle warming spice.", "paneer", ["vegetarian", "popular"], false],
  ["chicken-gravy", "Chicken Gravy", "Main Course", 429, "Slow-cooked chicken, roasted onion, tomato and whole spices.", "curry", ["non-vegetarian"], false],
  ["veg-special", "Veg Special", "Main Course", 349, "A colourful seasonal vegetable medley in a fragrant house gravy.", "curry", ["vegetarian"], false],
  ["chicken-biryani", "Chicken Biryani", "Biryani & Rice", 399, "Fragrant basmati, spiced chicken, fried onion and mint raita.", "biryani", ["non-vegetarian", "popular"], true],
  ["mutton-biryani", "Mutton Biryani", "Biryani & Rice", 499, "Slow-cooked mutton, saffron rice, caramelised onion and herbs.", "biryani", ["non-vegetarian"], false],
  ["veg-biryani", "Veg Biryani", "Biryani & Rice", 329, "Seasonal vegetables, basmati, saffron and crisp onions.", "biryani", ["vegetarian"], false],
  ["fried-rice", "Classic Fried Rice", "Biryani & Rice", 299, "Wok-tossed rice, vegetables, spring onion and house seasoning.", "biryani", ["vegetarian"], false],
  ["classic-margherita", "Classic Margherita", "Pizza", 349, "Tomato, mozzarella, basil and olive oil on a crisp base.", "paneer", ["vegetarian"], false],
  ["chicken-tikka-pizza", "Chicken Tikka Pizza", "Pizza", 449, "Tikka chicken, mozzarella, onion, peppers and coriander.", "kebab", ["non-vegetarian", "popular"], true],
  ["spicy-chicken-pizza", "Spicy Chicken Pizza", "Pizza", 469, "Spiced chicken, jalapeño, onion, chilli oil and melted cheese.", "kebab", ["non-vegetarian"], false],
  ["veg-supreme-pizza", "Veg Supreme Pizza", "Pizza", 399, "Peppers, corn, onion, olives and cheese with a smoky finish.", "paneer", ["vegetarian"], false],
  ["classic-chicken-burger", "Classic Chicken Burger", "Burgers", 329, "Crisp chicken, lettuce, tomato and house sauce in a toasted bun.", "kebab", ["non-vegetarian"], false],
  ["crispy-chicken-burger", "Crispy Chicken Burger", "Burgers", 369, "Crunchy chicken, slaw, pickles and chilli mayo.", "kebab", ["non-vegetarian", "popular"], true],
  ["veg-burger", "Veg Burger", "Burgers", 279, "Crisp vegetable patty, lettuce, tomato and mint mayo.", "paneer", ["vegetarian"], false],
  ["cheese-burger", "Cheese Burger", "Burgers", 349, "Juicy patty, melted cheese, onion, pickles and house sauce.", "kebab", ["non-vegetarian"], false],
  ["brownie", "Warm Chocolate Brownie", "Desserts", 199, "Soft-centred chocolate brownie with vanilla ice cream.", "dessert", ["vegetarian", "popular"], true],
  ["chocolate-cake", "Chocolate Cake", "Desserts", 229, "Dark chocolate sponge, ganache and a pinch of sea salt.", "dessert", ["vegetarian"], false],
  ["fresh-lime", "Fresh Lime", "Beverages", 129, "Fresh lime, mint and soda served sweet or salted.", "gulab", ["vegetarian"], false],
  ["cold-coffee", "Cold Coffee", "Beverages", 199, "Chilled coffee, milk and a soft cream finish.", "gulab", ["vegetarian", "popular"], true]
].map(([id, name, category, price, description, image, tags, featured]) => ({
  id, name, category, price, description, image: images[image], tags, featured,
  vegetarian: tags.includes("vegetarian")
}));

const categories = ["All", "Starters", "Main Course", "Biryani & Rice", "Pizza", "Burgers", "Desserts", "Beverages"];
const state = { query: "", category: "All", dietary: "all", sort: "featured", cart: loadCart(), selectedDish: null };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = (value) => `₹${value.toLocaleString("en-IN")}`;

function loadCart() {
  try { return JSON.parse(localStorage.getItem("pascha-cart") || "[]"); } catch { return []; }
}

function saveCart() {
  localStorage.setItem("pascha-cart", JSON.stringify(state.cart));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function productCard(item) {
  return `<article class="dish-card">
    <div class="dish-image" data-dish="${item.id}" role="button" tabindex="0" aria-label="View ${item.name}">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      ${item.featured ? '<span class="dish-badge">Pascha pick</span>' : ""}
    </div>
    <div class="dish-body">
      <div class="dish-topline"><h3>${item.name}</h3><strong class="dish-price">${money(item.price)}</strong></div>
      <p class="dish-description">${item.description}</p>
      <div class="dish-footer"><span class="dietary-label">${item.vegetarian ? "Vegetarian" : "Non-vegetarian"}</span><button class="add-button" data-add="${item.id}" type="button">Add +</button></div>
    </div>
  </article>`;
}

function renderCategoryFilters() {
  $("#category-filters").innerHTML = categories.map(category =>
    `<button class="filter-button ${state.category === category ? "active" : ""}" data-category="${category}" type="button">${category}</button>`
  ).join("");
}

function filteredMenu() {
  const query = state.query.toLowerCase().trim();
  return MENU.filter(item => {
    const matchesQuery = !query || `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(query);
    const matchesCategory = state.category === "All" || item.category === state.category;
    const matchesDietary = state.dietary === "all" || (state.dietary === "vegetarian" ? item.vegetarian : !item.vegetarian);
    return matchesQuery && matchesCategory && matchesDietary;
  }).sort((a, b) => state.sort === "low" ? a.price - b.price : state.sort === "high" ? b.price - a.price : Number(b.featured) - Number(a.featured));
}

function renderMenu() {
  renderCategoryFilters();
  const results = filteredMenu();
  $("#menu-grid").innerHTML = results.map(productCard).join("");
  $("#dish-count").textContent = `${results.length} ${results.length === 1 ? "dish" : "dishes"}`;
  $("#empty-state").hidden = results.length > 0;
  $("#clear-filters").hidden = !(state.query || state.category !== "All" || state.dietary !== "all");
}

function renderCart() {
  const count = state.cart.reduce((sum, line) => sum + line.quantity, 0);
  const total = state.cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  $("#cart-count").textContent = count;
  $("#cart-items").innerHTML = state.cart.map(line => `<div class="cart-line">
    <img src="${line.image}" alt="${line.name}">
    <div><h3>${line.name}</h3><small>${money(line.price)} each</small><div class="quantity"><button data-decrease="${line.id}" type="button">−</button><span>${line.quantity}</span><button data-increase="${line.id}" type="button">+</button></div></div>
    <strong class="cart-line-total">${money(line.price * line.quantity)}</strong>
  </div>`).join("");
  $("#cart-empty").style.display = state.cart.length ? "none" : "grid";
  $("#cart-summary").style.display = state.cart.length ? "block" : "none";
  $("#cart-total").textContent = money(total);
}

function addToCart(id) {
  const item = MENU.find(product => product.id === id);
  const existing = state.cart.find(line => line.id === id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ ...item, quantity: 1 });
  saveCart();
  renderCart();
  showToast(`${item.name} added to your table`);
}

function changeQuantity(id, amount) {
  const line = state.cart.find(item => item.id === id);
  if (!line) return;
  line.quantity += amount;
  if (line.quantity <= 0) state.cart = state.cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function openCart() {
  $("#cart-drawer").classList.add("open");
  $("#cart-drawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  $("#cart-drawer").classList.remove("open");
  $("#cart-drawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openDish(id) {
  const item = MENU.find(product => product.id === id);
  if (!item) return;
  state.selectedDish = item;
  $("#dish-modal-image").src = item.image;
  $("#dish-modal-image").alt = item.name;
  $("#dish-modal-category").textContent = item.category;
  $("#dish-modal-title").textContent = item.name;
  $("#dish-modal-description").textContent = item.description;
  $("#dish-modal-price").textContent = money(item.price);
  $("#dish-modal").classList.add("open");
  $("#dish-modal").setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const modal = $(`#${id}`);
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (!$("#cart-drawer").classList.contains("open")) document.body.style.overflow = "";
}

function makeWhatsAppMessage(form) {
  const order = state.cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const lines = state.cart.map(line => `• ${line.name} x${line.quantity} — ${money(line.price * line.quantity)}`).join("\n");
  const data = new FormData(form);
  return `Hello ${BUSINESS.name}! I would like to place an order.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nOrder type: ${data.get("orderType")}\n${data.get("table") ? `Table number: ${data.get("table")}\n` : ""}${data.get("address") ? `Address: ${data.get("address")}\n` : ""}\nOrder:\n${lines}\n\nTotal: ${money(order)}${data.get("notes") ? `\nNotes: ${data.get("notes")}` : ""}`;
}

function updateBusinessLinks() {
  $$("[data-whatsapp]").forEach(link => link.href = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello ${BUSINESS.name}! I would like to know more about the menu.`)}`);
  $$("[data-phone]").forEach(link => { link.textContent = BUSINESS.phone; link.href = `tel:${BUSINESS.phone.replace(/\s/g, "")}`; });
  $$("[data-email]").forEach(link => { link.textContent = BUSINESS.email; link.href = `mailto:${BUSINESS.email}`; });
  $$("[data-maps]").forEach(link => { link.textContent = `${BUSINESS.address} ↗`; link.href = BUSINESS.maps; });
}

function setCategory(category) {
  state.category = categories.includes(category) ? category : "All";
  renderMenu();
  $("#menu").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  if (add) addToCart(add.dataset.add);
  const dish = event.target.closest("[data-dish]");
  if (dish) openDish(dish.dataset.dish);
  const category = event.target.closest("[data-category]");
  if (category) setCategory(category.dataset.category);
  const increase = event.target.closest("[data-increase]");
  if (increase) changeQuantity(increase.dataset.increase, 1);
  const decrease = event.target.closest("[data-decrease]");
  if (decrease) changeQuantity(decrease.dataset.decrease, -1);
  if (event.target.closest("#open-cart")) openCart();
  if (event.target.closest("[data-close-cart]")) closeCart();
  if (event.target.closest("[data-close-modal]")) closeModal("dish-modal");
  if (event.target.closest("[data-close-order]")) closeModal("order-modal");
  if (event.target.closest("#open-order")) {
    if (!state.cart.length) return showToast("Add a dish before continuing");
    closeCart();
    $("#order-modal").classList.add("open");
    $("#order-modal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  const navLink = event.target.closest(".mobile-nav a");
  if (navLink) {
    $("#mobile-nav").classList.remove("open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
  }
});

$("#menu-search").addEventListener("input", event => { state.query = event.target.value; renderMenu(); });
$("#sort-menu").addEventListener("change", event => { state.sort = event.target.value; renderMenu(); });
document.addEventListener("click", event => {
  const dietary = event.target.closest("[data-dietary]");
  if (!dietary) return;
  state.dietary = dietary.dataset.dietary;
  $$(".sort-row [data-dietary]").forEach(button => button.classList.toggle("active", button === dietary));
  renderMenu();
});
$("#clear-filters").addEventListener("click", () => {
  state.query = "";
  state.category = "All";
  state.dietary = "all";
  $("#menu-search").value = "";
  $$(".sort-row [data-dietary]").forEach(button => button.classList.toggle("active", button.dataset.dietary === "all"));
  renderMenu();
});
$("#dish-modal-add").addEventListener("click", () => {
  if (state.selectedDish) addToCart(state.selectedDish.id);
  closeModal("dish-modal");
});
$("#order-form").addEventListener("submit", event => {
  event.preventDefault();
  const url = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(makeWhatsAppMessage(event.target))}`;
  window.open(url, "_blank", "noopener,noreferrer");
  closeModal("order-modal");
});
$("#menu-toggle").addEventListener("click", () => {
  const nav = $("#mobile-nav");
  const open = nav.classList.toggle("open");
  $("#menu-toggle").setAttribute("aria-expanded", String(open));
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  closeCart();
  closeModal("dish-modal");
  closeModal("order-modal");
});

updateBusinessLinks();
renderMenu();
renderCart();