const catalog = [
    {
      position: 1,
      name: "Волейбол",
      specs: "Зал Б · 90 минут",
      description: "Командная игра и работа с мячом"
    },
    {
      position: 2,
      name: "Растяжка",
      specs: "Студия · 45 минут",
      description: "Спокойные упражнения на гибкость"
    },
    {
      position: 3,
      name: "Бадминтон",
      specs: "Зал А · 60 минут",
      description: "Парные упражнения и точность движений"
    }
];

function filterByText(items, query) {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") {
    return items;
  }
  return items.filter(item => item.name.toLowerCase().includes(normalized));
}

const catalogList = document.querySelector("#catalog-list");
const statusText = document.querySelector("#status");

function renderCatalog(items) {
  catalogList.replaceChildren();
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "card";
    const title = document.createElement("h2");
    title.textContent = item.name;
    const specs = document.createElement("p");
    specs.textContent = item.specs;
    const description = document.createElement("e");
    description.textContent = item.description;
    card.append(title, specs, description);
    catalogList.append(card);
  }

    if (items.length === 0) {
        statusText.textContent = "Ничего не найдено";
    } else {
        statusText.textContent = "Показано: " + items.length + " из " + catalog.length;
    }
}

renderCatalog(catalog);

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", function () {
  const found = filterByText(catalog, searchInput.value);
  renderCatalog(found);
});